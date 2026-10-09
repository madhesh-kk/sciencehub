# Monitoring & Logging Guide

Comprehensive guide to monitoring production environment and collecting logs.

---

## Table of Contents

1. [Application Monitoring](#application-monitoring)
2. [Infrastructure Monitoring](#infrastructure-monitoring)
3. [Logging Setup](#logging-setup)
4. [Alerting](#alerting)
5. [Dashboard & Analytics](#dashboard--analytics)

---

## Application Monitoring

### Frontend Monitoring with Sentry

#### Setup Sentry

1. **Create Sentry account at sentry.io**

2. **Install Sentry SDK:**
```bash
cd frontend
npm install @sentry/react @sentry/tracing
```

3. **Initialize Sentry in main.jsx:**
```javascript
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://your-dsn@sentry.io/project-id",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Wrap app
const App = Sentry.withProfiler(AppComponent);
```

4. **Test error tracking:**
```javascript
// In your app
<button onClick={() => {
  throw new Error("Test error");
}}>
  Test Error
</button>
```

#### Frontend Metrics to Monitor

- [ ] JavaScript errors
- [ ] API errors
- [ ] Page load performance
- [ ] User interactions
- [ ] Memory usage
- [ ] Network issues

### Backend Monitoring with Spring Boot Actuator

#### Configure Actuator

1. **Add dependency to pom.xml:**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- Micrometer for metrics -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-core</artifactId>
</dependency>

<!-- CloudWatch support -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-cloudwatch</artifactId>
</dependency>
```

2. **Configure in application-prod.properties:**
```properties
# Actuator endpoints
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=when-authorized
management.metrics.enable.jvm=true
management.metrics.enable.process=true
management.metrics.enable.system=true

# CloudWatch metrics
management.metrics.export.cloudwatch.enabled=true
management.metrics.export.cloudwatch.namespace=MiniLab
```

3. **Access metrics:**
- Health: `http://localhost:8085/api/actuator/health`
- Metrics: `http://localhost:8085/api/actuator/metrics`
- Prometheus: `http://localhost:8085/api/actuator/prometheus`

#### Backend Metrics to Monitor

- [ ] HTTP request count
- [ ] Response time (p50, p95, p99)
- [ ] Error rate
- [ ] Database connection pool
- [ ] JVM memory usage
- [ ] CPU usage
- [ ] Garbage collection time
- [ ] Active database connections

---

## Infrastructure Monitoring

### AWS CloudWatch

#### Setup CloudWatch Monitoring

1. **Enable CloudWatch metrics:**
```bash
# For RDS
aws rds modify-db-instance \
    --db-instance-identifier mini-lab-mysql \
    --enable-cloudwatch-logs-exports error general slowquery

# For EC2
# Install CloudWatch agent on EC2 instance
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm
```

2. **Configure custom metrics:**
```bash
# CPU usage
aws cloudwatch get-metric-statistics \
    --namespace AWS/EC2 \
    --metric-name CPUUtilization \
    --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \
    --statistics Average \
    --start-time 2026-10-08T00:00:00Z \
    --end-time 2026-10-09T00:00:00Z \
    --period 3600
```

#### CloudWatch Dashboards

**Create custom dashboard:**
```json
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/EC2", "CPUUtilization", {"stat": "Average"}],
          ["AWS/RDS", "DatabaseConnections"],
          ["AWS/RDS", "DiskQueueDepth"],
          ["AWS/ApplicationELB", "TargetResponseTime"]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "Mini Lab Infrastructure"
      }
    }
  ]
}
```

### Heroku Metrics

```bash
# View metrics
heroku metrics --app mini-lab-api

# Check dyno stats
heroku ps --app mini-lab-api

# View recent logs
heroku logs --tail --app mini-lab-api
```

---

## Logging Setup

### Centralized Logging with ELK Stack

#### Option 1: AWS CloudWatch Logs

1. **Configure application logging:**

**Spring Boot configuration:**
```properties
logging.file.name=/var/log/mini-lab/spring-backend.log
logging.file.max-size=10MB
logging.file.max-history=30
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
logging.level.root=WARN
logging.level.com.example.springbackend=INFO
```

2. **Stream logs to CloudWatch:**
```bash
aws logs create-log-group --log-group-name /mini-lab/backend
aws logs create-log-stream \
    --log-group-name /mini-lab/backend \
    --log-stream-name production

# Install CloudWatch agent
curl https://s3.amazonaws.com/aws-cloudwatch/downloads/latest/awscloudwatch-agent/AmazonCloudWatchAgent.zip
```

3. **Query logs:**
```bash
aws logs filter-log-events \
    --log-group-name /mini-lab/backend \
    --start-time $(date -d '1 hour ago' +%s)000 \
    --filter-pattern "ERROR"
```

#### Option 2: Self-Hosted ELK

**docker-compose.yml (ELK stack):**
```yaml
version: '3.9'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data

  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200

  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    ports:
      - "5000:5000"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

volumes:
  elasticsearch-data:
```

**logstash.conf:**
```
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [type] == "java-app" {
    multiline {
      pattern => "^%{TIMESTAMP_ISO8601}"
      negate => true
      what => "previous"
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
```

### Log Aggregation

**Logging configuration with JSON format:**
```xml
<!-- pom.xml -->
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.2</version>
</dependency>
```

**logback-spring.xml:**
```xml
<configuration>
  <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <destination>localhost:5000</destination>
    <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
  </appender>

  <root level="INFO">
    <appender-ref ref="LOGSTASH" />
  </root>
</configuration>
```

### Log Levels

```
TRACE   - Very detailed information
DEBUG   - Diagnostic information
INFO    - General informational messages
WARN    - Warning messages
ERROR   - Error messages
FATAL   - Fatal errors
```

**Production log levels:**
```properties
# Root level
logging.level.root=WARN

# Application level
logging.level.com.example.springbackend=INFO

# Library levels
logging.level.org.springframework.web=WARN
logging.level.org.hibernate=WARN
logging.level.org.springframework.security=DEBUG
```

---

## Alerting

### Email Alerts

**CloudWatch alarm for high error rate:**
```bash
aws cloudwatch put-metric-alarm \
    --alarm-name mini-lab-high-error-rate \
    --alarm-description "Alert if error rate > 1%" \
    --metric-name 4XXError \
    --namespace AWS/ApplicationELB \
    --statistic Sum \
    --period 300 \
    --threshold 10 \
    --comparison-operator GreaterThanThreshold \
    --alarm-actions arn:aws:sns:us-east-1:123456789:notify-email
```

### Slack Notifications

1. **Create Slack webhook:**
   - Go to your Slack workspace
   - Create incoming webhook
   - Copy webhook URL

2. **Configure CloudWatch to send to Slack:**
```bash
# Lambda function for Slack notification
cat > slack-notify.js << 'EOF'
const https = require('https');

exports.handler = async (event) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  
  const payload = {
    text: `Alert: ${message.AlarmName}`,
    attachments: [{
      color: message.StateValue === 'ALARM' ? 'danger' : 'good',
      text: message.AlarmDescription
    }]
  };

  return new Promise((resolve, reject) => {
    const req = https.request(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });
    req.write(JSON.stringify(payload));
    req.end();
  });
};
EOF
```

### PagerDuty Integration

```bash
# Create PagerDuty notification channel
aws sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:123456789:mini-lab-alerts \
    --protocol https \
    --notification-endpoint https://events.pagerduty.com/v2/enqueue
```

---

## Dashboard & Analytics

### Grafana Dashboard

**docker-compose addition:**
```yaml
grafana:
  image: grafana/grafana:latest
  ports:
    - "3000:3000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=admin
  volumes:
    - grafana-storage:/var/lib/grafana
    - ./grafana-provisioning:/etc/grafana/provisioning
```

**Sample metrics queries:**

```sql
-- Response time percentiles
SELECT histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

-- Error rate
SELECT rate(http_requests_total{status=~"5.."}[5m])

-- Database connection pool
SELECT pool_size - available_connections

-- Request throughput
SELECT rate(http_requests_total[1m])
```

### Key Performance Indicators (KPIs)

| KPI | Target | Alert Threshold |
|-----|--------|-----------------|
| API Response Time | < 200ms | > 500ms |
| Error Rate | < 0.1% | > 1% |
| Uptime | 99.9% | < 99% |
| Database Connections | < 80% | > 90% |
| Memory Usage | < 70% | > 85% |
| Disk Usage | < 70% | > 85% |

---

## Monitoring Checklist

- [ ] Application monitoring configured (Sentry/Actuator)
- [ ] Infrastructure monitoring enabled (CloudWatch)
- [ ] Centralized logging set up (ELK/CloudWatch)
- [ ] Alerts configured for critical metrics
- [ ] Dashboards created
- [ ] On-call rotation established
- [ ] Incident response procedure documented
- [ ] Regular reviews of logs and metrics scheduled

---

## Incident Response

### When an Alert Fires

1. **Acknowledge the alert** (within 5 minutes)
2. **Check dashboard** for context
3. **Review recent logs** for errors
4. **Identify root cause**
5. **Apply fix or rollback**
6. **Verify resolution**
7. **Document incident** in post-mortem

### Post-Incident Review

- [ ] What happened?
- [ ] How long was it down?
- [ ] What was the impact?
- [ ] What caused it?
- [ ] How do we prevent it?
- [ ] Action items assigned

---

**Monitoring Owner**: ________________
**Last Review**: ________________
**Next Review**: ________________
