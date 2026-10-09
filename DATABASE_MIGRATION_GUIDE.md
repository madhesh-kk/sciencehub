# Database Migration & Backup Guide

Complete procedures for database migrations, backups, and disaster recovery.

---

## Table of Contents

1. [Schema Migrations](#schema-migrations)
2. [Data Migrations](#data-migrations)
3. [Backup Procedures](#backup-procedures)
4. [Restore Procedures](#restore-procedures)
5. [Disaster Recovery](#disaster-recovery)

---

## Schema Migrations

### Using Flyway (Recommended)

#### Setup Flyway in Backend

1. **Add Flyway dependency to pom.xml:**
```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
    <version>9.16.3</version>
</dependency>
```

2. **Configure in application.properties:**
```properties
spring.flyway.locations=classpath:db/migration
spring.flyway.baselineOnMigrate=true
spring.flyway.outOfOrder=false
```

3. **Create migration files:**
```
backend/src/main/resources/db/migration/
├── V1__initial_schema.sql
├── V2__add_order_table.sql
├── V3__add_user_roles.sql
└── V4__create_indexes.sql
```

#### Migration File Format

**V1__initial_schema.sql:**
```sql
-- Create users table
CREATE TABLE `user` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create products table
CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    discount_percent INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create orders table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address VARCHAR(500),
    payment_id VARCHAR(255),
    amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create order items table
CREATE TABLE order_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**V2__add_user_roles.sql:**
```sql
ALTER TABLE `user` ADD COLUMN role VARCHAR(50) DEFAULT 'USER';
ALTER TABLE `user` ADD INDEX idx_role (role);
```

#### Run Migrations

**Development:**
```bash
cd backend
mvn clean install
# Spring Boot automatically runs Flyway on startup
```

**Production:**
```bash
# Via command line
mvn flyway:migrate

# Check migration history
mvn flyway:info

# Validate migrations
mvn flyway:validate

# Rollback (use with caution!)
mvn flyway:undo
```

### Manual Schema Changes (If Not Using Flyway)

1. **Create backup before changes:**
```bash
mysqldump -h your-host -u admin -p minilabdb > backup-before-schema-change.sql
```

2. **Apply changes in staging first**

3. **Test thoroughly**

4. **Apply to production during maintenance window**

5. **Keep rollback script ready:**
```sql
-- Rollback script for reference
ALTER TABLE `user` DROP COLUMN role;
```

---

## Data Migrations

### Migrating Existing Data

**Example: Add new column with default values**
```sql
-- Add column
ALTER TABLE product ADD COLUMN category VARCHAR(100);

-- Populate with data
UPDATE product SET category = 'General' WHERE category IS NULL;

-- Make not null
ALTER TABLE product MODIFY COLUMN category VARCHAR(100) NOT NULL;
```

### Handling Large Tables

For tables with millions of rows:

```sql
-- Use batched updates to avoid locking
UPDATE product SET category = 'General' LIMIT 10000;
-- Repeat until all rows updated

-- Verify all rows updated
SELECT COUNT(*) FROM product WHERE category IS NULL;
```

### Data Transformation Script

**transform-data.sql:**
```sql
-- Transform order statuses
UPDATE orders 
SET status = 'COMPLETED' 
WHERE status = 'DONE' AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Archive old orders
INSERT INTO orders_archive 
SELECT * FROM orders 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

DELETE FROM orders 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- Optimize table after deletion
OPTIMIZE TABLE orders;
```

---

## Backup Procedures

### Strategy

| Backup Type | Frequency | Retention | Purpose |
|------------|-----------|-----------|---------|
| Full Backup | Daily | 30 days | Disaster recovery |
| Incremental | Hourly | 7 days | Recent recovery |
| Transaction Log | Continuous | 24 hours | Point-in-time recovery |

### Full Backup using mysqldump

**Manual backup:**
```bash
# Full database backup
mysqldump -h db.mini-lab.com \
          -u admin \
          -p \
          --single-transaction \
          --lock-tables=false \
          --flush-privileges \
          --all-databases > backup-$(date +%Y%m%d-%H%M%S).sql

# Backup specific database
mysqldump -h db.mini-lab.com -u admin -p minilabdb > minilabdb-backup.sql

# Compressed backup
mysqldump -h db.mini-lab.com -u admin -p minilabdb | gzip > minilabdb-backup.sql.gz
```

**Automated backup script (backup.sh):**
```bash
#!/bin/bash

BACKUP_DIR="/backups/mysql"
DB_HOST="db.mini-lab.com"
DB_USER="admin"
DB_NAME="minilabdb"
DATE=$(date +%Y%m%d-%H%M%S)

# Create backup
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD \
          --single-transaction \
          $DB_NAME | gzip > $BACKUP_DIR/backup-$DATE.sql.gz

# Upload to S3
aws s3 cp $BACKUP_DIR/backup-$DATE.sql.gz s3://mini-lab-backups/

# Keep only last 30 days locally
find $BACKUP_DIR -name "backup-*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup-$DATE.sql.gz"
```

**Setup cron job:**
```bash
# Daily backup at 2 AM
0 2 * * * /scripts/backup.sh

# Every 6 hours
0 */6 * * * /scripts/backup.sh
```

### AWS RDS Automated Backups

```bash
# Enable automated backups
aws rds modify-db-instance \
    --db-instance-identifier mini-lab-mysql \
    --backup-retention-period 30 \
    --preferred-backup-window "02:00-03:00" \
    --apply-immediately

# List available backups
aws rds describe-db-snapshots \
    --db-instance-identifier mini-lab-mysql

# Create manual snapshot
aws rds create-db-snapshot \
    --db-instance-identifier mini-lab-mysql \
    --db-snapshot-identifier mini-lab-snapshot-$(date +%Y%m%d)
```

### Backup Verification

```bash
# Verify backup integrity
gzip -t minilabdb-backup.sql.gz

# Test restore (to staging)
gunzip < minilabdb-backup.sql.gz | mysql -h staging-db -u admin -p minilabdb

# Compare row counts
mysql -h production-db -u admin -p -e "SELECT COUNT(*) FROM minilabdb.user;"
mysql -h staging-db -u admin -p -e "SELECT COUNT(*) FROM minilabdb.user;"
```

---

## Restore Procedures

### Full Restore from Backup

**Option 1: From SQL file**
```bash
# Restore backup
mysql -h db.mini-lab.com -u admin -p minilabdb < minilabdb-backup.sql

# For compressed backup
gunzip < minilabdb-backup.sql.gz | mysql -h db.mini-lab.com -u admin -p minilabdb
```

**Option 2: From AWS RDS snapshot**
```bash
# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier mini-lab-mysql-restored \
    --db-snapshot-identifier mini-lab-snapshot-20261008

# Wait for completion
aws rds wait db-instance-available \
    --db-instance-identifier mini-lab-mysql-restored

# Verify
aws rds describe-db-instances \
    --db-instance-identifier mini-lab-mysql-restored
```

### Point-in-Time Recovery

```bash
# List available backup windows
aws rds describe-db-instances \
    --db-instance-identifier mini-lab-mysql \
    --query 'DBInstances[0].[EarliestRestorableTime,LatestRestorableTime]'

# Restore to specific time
aws rds restore-db-instance-to-point-in-time \
    --source-db-instance-identifier mini-lab-mysql \
    --target-db-instance-identifier mini-lab-mysql-pitr \
    --restore-time 2026-10-08T12:00:00Z
```

### Partial Restore (Specific Table)

```bash
# Export table from backup
mysqldump --single-transaction minilabdb-backup.sql orders > orders-backup.sql

# Restore specific table
mysql -h db.mini-lab.com -u admin -p minilabdb < orders-backup.sql
```

---

## Disaster Recovery

### Scenario 1: Accidental Data Deletion

1. **Immediately stop application:**
```bash
# Heroku
heroku maintenance:on

# EC2
sudo systemctl stop mini-lab-backend
```

2. **Check backup availability:**
```bash
aws s3 ls s3://mini-lab-backups/
```

3. **Restore from backup:**
```bash
# Find backup closest to incident time
aws s3 cp s3://mini-lab-backups/backup-20261008-020000.sql.gz .
gunzip backup-20261008-020000.sql.gz
mysql -h db.mini-lab.com -u admin -p minilabdb < backup-20261008-020000.sql
```

4. **Verify data integrity:**
```bash
mysql -h db.mini-lab.com -u admin -p -e "
  SELECT COUNT(*) as user_count FROM minilabdb.user;
  SELECT COUNT(*) as order_count FROM minilabdb.orders;
"
```

5. **Resume application:**
```bash
# Heroku
heroku maintenance:off

# EC2
sudo systemctl start mini-lab-backend
```

### Scenario 2: Database Corruption

1. **Create repair backup:**
```bash
mysqldump -h db.mini-lab.com -u admin -p minilabdb > corruption-backup.sql
```

2. **Run consistency check:**
```bash
mysql -h db.mini-lab.com -u admin -p minilabdb -e "CHECK TABLE user, product, orders, order_item;"
```

3. **Repair tables if needed:**
```bash
mysql -h db.mini-lab.com -u admin -p minilabdb -e "REPAIR TABLE user, product, orders, order_item;"
```

4. **Restore from backup if needed:**
```bash
mysql -h db.mini-lab.com -u admin -p minilabdb < minilabdb-backup.sql
```

### Scenario 3: Complete Database Loss

1. **Provision new database:**
```bash
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier mini-lab-mysql-recovery \
    --db-snapshot-identifier latest-snapshot
```

2. **Update backend connection string:**
```properties
spring.datasource.url=jdbc:mysql://new-db-endpoint:3306/minilabdb
```

3. **Restart backend application**

4. **Verify application functionality**

### Scenario 4: Region Failure

1. **Provision infrastructure in new region:**
```bash
# AWS Region failover
aws rds promote-read-replica \
    --db-instance-identifier mini-lab-mysql-replica-us-west-2
```

2. **Update DNS to new region:**
```bash
# Point domain to new load balancer
aws route53 change-resource-record-sets \
    --hosted-zone-id Z1234567890ABC \
    --change-batch file://dns-update.json
```

3. **Deploy application to new region:**
```bash
git push heroku-us-west-2 main
```

---

## Backup Monitoring

### Check Backup Health

```bash
#!/bin/bash

# Check backup existence
LATEST_BACKUP=$(aws s3 ls s3://mini-lab-backups/ --recursive | sort | tail -n 1 | awk '{print $4}')
BACKUP_TIME=$(stat -f%m s3://mini-lab-backups/$LATEST_BACKUP)
CURRENT_TIME=$(date +%s)
DIFF=$((CURRENT_TIME - BACKUP_TIME))

if [ $DIFF -gt 86400 ]; then
    echo "WARNING: Backup is older than 24 hours!"
    # Send alert
fi

# Check backup size
aws s3 ls s3://mini-lab-backups/$LATEST_BACKUP | awk '{print "Backup size: " $5 " bytes"}'
```

### Automated Alerts

**CloudWatch alarm for backup failure:**
```bash
aws cloudwatch put-metric-alarm \
    --alarm-name rds-backup-failed \
    --alarm-description "Alert if RDS backup fails" \
    --metric-name FailedBackupCount \
    --namespace AWS/RDS \
    --statistic Sum \
    --period 3600 \
    --threshold 1 \
    --comparison-operator GreaterThanThreshold
```

---

## Testing Backups

### Monthly Restore Test

Every month, test restore procedure:

```bash
# 1. Restore to staging
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier mini-lab-test-restore \
    --db-snapshot-identifier latest-snapshot

# 2. Verify data integrity
mysql -h staging-db -u admin -p -e "
  SELECT COUNT(*) as user_count FROM minilabdb.user;
  SELECT COUNT(*) as order_count FROM minilabdb.orders;
"

# 3. Test application connection
java -jar target/spring-backend-0.0.1-SNAPSHOT.jar \
    --spring.datasource.url=jdbc:mysql://staging-db:3306/minilabdb

# 4. Run API tests
curl http://localhost:8085/api/products

# 5. Document results
# 6. Delete test instance
aws rds delete-db-instance \
    --db-instance-identifier mini-lab-test-restore \
    --skip-final-snapshot
```

---

## Backup Retention Policy

| Backup Type | Retention | Storage | Cost |
|------------|-----------|---------|------|
| Daily | 30 days | S3 Standard | $0.023/GB |
| Weekly | 12 weeks | S3 Glacier | $0.004/GB |
| Monthly | 1 year | S3 Glacier | $0.004/GB |

**Lifecycle policy for S3:**
```json
{
  "Rules": [
    {
      "Id": "backup-lifecycle",
      "Status": "Enabled",
      "Prefix": "backups/",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 365
      }
    }
  ]
}
```

---

## Documentation

- [ ] Backup schedule documented
- [ ] Restore procedure tested
- [ ] Team trained on recovery
- [ ] Backup location and credentials secured
- [ ] Monthly tests scheduled
- [ ] Disaster recovery plan approved

---

**Last Backup Test**: ________________
**Next Backup Test**: ________________
**Backup Owner**: ________________
