const products = [
  {
    id: "p1",
    name: "Student Microscope (40x - 400x)",
    title: "Student Microscope (40x - 400x)",
    category: "Microscopes",
    description: "Professional student microscope with 40x to 400x magnification range. Perfect for biology and general science studies.",
    stock: "In Stock",
    price: 4500,
    discountPercent: 10,
    image: "https://m.media-amazon.com/images/I/61MstERkLZL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: "p2",
    name: "Test Tube Set (12 pcs)",
    title: "Test Tube Set (12 pcs)",
    category: "Glassware",
    description: "High-quality borosilicate glass test tubes, perfect for chemistry experiments. Set includes 12 tubes with rack.",
    stock: "In Stock",
    price: 800,
    discountPercent: 15,
    image: "https://m.media-amazon.com/images/I/51Vhn3Or3ML._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p3",
    name: "Glass Beaker 500ml",
    title: "Glass Beaker 500ml",
    category: "Glassware",
    description: "Durable 500ml glass beaker with graduated measurements. Heat-resistant borosilicate glass.",
    stock: "In Stock",
    price: 250,
    discountPercent: 5,
    image: "https://m.media-amazon.com/images/I/61y6Pxgu+EL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p4",
    name: "Physics Starter Kit",
    title: "Physics Starter Kit",
    category: "Lab Kits",
    description: "Complete physics starter kit with essential tools for mechanics, optics, and electricity experiments.",
    stock: "In Stock",
    price: 3200,
    discountPercent: 20,
    image: "https://m.media-amazon.com/images/I/81eVBym6wAL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p5",
    name: "Chemistry Starter Kit",
    title: "Chemistry Starter Kit",
    category: "Lab Kits",
    description: "Everything you need to start chemistry experiments safely. Includes basic chemicals, glassware, and safety equipment.",
    stock: "In Stock",
    price: 2100,
    discountPercent: 12,
    image: "https://m.media-amazon.com/images/I/71ON7-0H3tL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p6",
    name: "Digital Thermometer",
    title: "Digital Thermometer",
    category: "Instruments",
    description: "Accurate digital thermometer with LCD display. Temperature range: -50°C to 300°C.",
    stock: "In Stock",
    price: 450,
    discountPercent: 8,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8ODw8PEBAQEBAPDw8QFRAWFg8QEhIQFxEWFhUWFxUYHSggHRolGxUVITIhJSkrLy4uFx8zODMtNygtLisBCgoKDg0OFRAQGDchICUtLS0rKzctLSs3LS0tKy0wMisrLS0rLSsuLS0tKzcrLi0rNS0vLS0tLTcrLS0tLSstLf/AABEIAOAA4AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQMCBAUGB//EADwQAAICAQIFAQQIBAUEAwAAAAABAgMRBCEFEjFBUWETIjJxBhRCUpGxwdEjYoGhQ3LC4fAzkuLxBxVT/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECBAYDBf/EACQRAQEAAgICAQQDAQAAAAAAAAABAhEDBBIxIQVBUfBhcYEi/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAABAObx7jVOhqdtr9IwXxTl4iv+YCZZTGW1nxri1Oiqd10sRWyivinLtGK7s+YcR+mHEdS3yWLTVtvEYJc2O2ZPfPywaPFOJXa6729z2+xWs8lcfC9fL7lJtcfD8brl+99Xzyy8eG6n5Zw1mrT5vreo5vPtJ/ud/hH0z1dDSuf1ivvnEbF8pLr/AFPPGUYnrePHXp87j73Zxy3M6+xcK4nVqq1ZVLmj0a6Si/El2Zuo+SfR7ictHqI2J/w5NRsj2cG8Z+a6n1uLyk133NTkw8a6vodydnj3fiz2kAHm3wAAAAAAAAAAAAAAAAAAAAAIDNfXayFEHZN4S7d2+yS8gY8R10NPBzn8lFdZS7JHgOP8Jv1svrTbc0sKrtGH8vr58naTnqbPbW7JbQh2jH9/LN/ODPH4u3nz8GPPx3DL7vmDjj9jDB7Xj3Albm2pYs6uPRT/APL8zyE4PLWMNdU9nk3MM5lHFdzo8nWz8cvX2v5YwiWoriWJFryx1plXDLx5yfVPovbKei00pdfZRTfnG36Hy+rbfx28vsvxPrHB9N7HT01vrCuKfzxv/c1+f1H3fouN887/AA3AAa7oQAAAAAAAAAAAAAAAAAAACrUXxrjKc3yxistgRrNTCmErJvEYr/iXqeVnOers9rYuWEfgr7RXl+o1F09ZNTknGqL9yH+p+v5G9BKKRZBEYbYQZocX4s6eWuqHt9TYn7OnKisd52T+xWvPV9Em9jU4bqNffZH29cNJGltz5JxvWpk/hUG1mNaXXKUm9lst6rtpnJ41wZXfxK0lZ3Xafz9fU6FOphY7FCSk6p+znjO08JtZ8rK6F8Sy6u4w5uHDmwuGc2+d20tNprDTw0+uTCEH0Pb8Y4RG9c0cK1d+0vR/ucvgP0enqbH7ROFNcsS7Ocl9henlmxOSa25fm+mcmHLMJN79Vn9EuCO+yN81imqSlHP+LYuj/wAqPoKMKq1CKjFKMYpJJbJJdixGtll5Xboer1seDDxn+gAMWyAAAAAAAAAAAAAAAAAGM5qKbbSSWW3skgIttjCLlJqMYrLb6JHlNXqZa2ae8aYPMY/ef3pfouxlrtXLWz5Y5VEXt25395+nhGzXWksIsgxjFLZGGrucIycVzSWEl0Tb2WX4Lmim1LLUt1IyGvoNC4c05vntm8zm+78LxFdkWcRcYU2znY6Yxrnm1YUobYzH+bfb1wZ/WFWm7JYglnnfZeppVVvVTjdbFxprfNTRJYbl2usT+192L+HOXv8ADBV9Fa7YaLRxugqrfYpTrSxh7vdZfvPZvfq2dqKKK3zzyukds+ZG9pqHN4XTu/H+4VlpqHY8fZXV/ojqwgksJYSFdaikksJGZEQSAQAAAAAAAAAAAAAAAAACGwEnhZeyXc8vxHWvWS9nDaiL3f8A+jX+n8yeK8Qeqk6an/CTxKa+2/C/l/Mu01CgkkWQTTSopJHP47xuvRxSco88mkk3ssvCz6t7JLdv8VscU4gqUowSldNe7Hsl3lL+Vf36I8ZrLr5SsdcISVLVk7bk4q61b8sG/hSjn3+i2S6MWj0vA+Ox1OIWKMLXFSSi+aMlJZSz0UsbuOX82daytPZnjOGWU3xlZU9p8kpQTX8OzlUs+70lhp5T3wmjv8B4m7ndVL3paeca3Z97MIz3/mXMk8enTOBKNp0TXwz28PcLTzl8c9vCWP7m3gtpqcnyrr3fZLyURpdPn3Y7JdX2iv3OxVUoJRXREUUqEcL8e7ZaSiCQCAAAAAAAAAAAAAAAAAAAB5rjHEnfJ6el+6tp2Lv5jF/myzj/ABRuX1al+89pzX2V91epr6PTKuKSLILdLQoRSSMOJa9URSS5rJ5UYfm34iu7M9Te6q5zUXJwjKSiusmk2kvV4weH4pqp20LURnKUbnB3W1rM4Ud1WuqUc47tbvDYtGer1V8751VSgrVWrbLrF8Wc8kYQ+5thvstt3kx0+t0+toascEkoTsr5/dxzbPm25q24vfozj6mitxucYWS0kW4Rufvexck1a4x+KdOcZT8vGyNqNeo1GprrUKoWVVcnNDE4V1zSzZJ+HjEKvKy9kYqtqpvv1lqqSpkoqmU44brqzlSljaVsvsQ+zHLfXD91wrhlemrjXBYST2y28t5bbe7k3ltvqyOC8Kr0tahFdMtt7ylJvMpSfeTe7Z0Um2klmT6L9TKREQg5NRXxP+y8s6umoVccLr3fdsjS6dVry31fn/YvFoAAgAAAAAAAAAAAAAAAAAAAcvjvE/YQxHe2zaC8eZP5G/qb41QlObxGKy2eUpUr7JX2dX8Mfux7IsGXD9LyLmlvKW7b6tvqzZusx82WGvqrIVxlZNtRisvClJ/0S3ZloWx6b9zzfFeEz085ajSx5lNuVumWysfedfaNvp0n3w9y67j9EbIWzslGn31D3Ld5JRTysZysvqdyianFPrGSTWU1s/R7i43XyPnut18NfOqjSz9pNPmnBxmq6cdJahNJ+684q6yljOybXuOAcHhpa0lmUm+aU5bzsm+s5vvJ/glhLZG1Toq4yc0t28v5m03jHdvZLu2YyaEvskst9EdLSabkWXvJ9X+i9DHRaXk96W83/ZeEbYtAAEAAAAAAAAAAAAAAAAAAAADU4nrPY1uX2n7sV5k+n7/0A4/HL/b2qiPwVtOfrPsv6CKwsIq0dPKsveUt2+7b6l6MhTqdTGpJyfxNRUVvKUn0SXdnmtRxXUytVVldlMbHbBX0tTjCtbtyfSM1hb+JbGlxLWWapun3Y2wvs5pN5+rTrean7NY/hzi8N5y+b8O/wnRzsj7S3KU8SUMcjbSSTlFbLGMJeEj1y1xzXu392YYef/VusZ+6dPTRWMxbw+7bbaxs9y6MSYwLYQcnhLL8ePVnmf0xXyy30Xk6Oj0fL78t5v8ACK8Is0ulUN+sn1f7GwY2gACAAAAAAAAAAAAAAAAAAAAAAHnNZd7e3m/w68xj6vu/+eDf41qmoqqL9+xbv7sO7/Q0K4KKSXYsGTIBKRkNazh9c587jvjdbJSfZy7vBuxiR03eyNnTaVz3eYw8d5fsiLbbJGFNTm8R6d5dl/udOilQWF/V92ZwgopJLCXYyJtAAEAAAAAAAAAAAAAAAAAAAAAAKNZqY1Qc5du3dvskXSeOvRHndTqHqLOb/DhtFeX94DCvmk5WT+Ke79F2S9C0GUY/gZDFIsgm3yxXNLx4+Znp6JW/D7sO8vPyOrp6I1rEVj17v5sWjW02gSfNN80vH2V/Q3SQYgAAAAAAAAAAAAAAAAAAAAAAAAQScrjPEHWvZQ/6k1/2R8/PwBRxfWOyXsIPZfHL/T+5VXDCSRXpqORevd+WbCTyklmT6IyGL2WX/wCzb02hc/esWI9oef8AN+xfpNFy+9PEp/2j8v3NwloJY26AkggkAAAABBIAAAAAAAAAAAAAAAAAAAo1epjVBzk8Jfi32S9QKeKa9UQz1nLaMfL/AGOJpKZNuyb5pzeWyIKd83bZ1fwx7Rj2R0dPQ57R2iusv0RRjXW5Plit+77ROnptNGtbbt9Zd2Z01RgkorC/MsGwABAAIAkEEgAAAAAAAAAAAAAAAAAAAAIbAxssUU5SeEk234R5u+2Wqs5nlVwfux8/zMt1+peplyR/6UX1++1+hs6PS8+y2gur8+iKJ0mm59ltBdX59EdaEFFJJYS7CEUkktkjIgAAAAABBIAAAAAAIBIAAAAAAAAAAAAAAB85/wDkP6QW6i3/AOn0LbvtX8eyOf4Vb6rmXR43b7L5ntPpDO2OludMnCzlwrFB2utPZzUF8TSy8eh89+jX0YdnPp6pWqqbUtbr5KcLdTJ7/V6XLdLf3prp0W+XEseh+iGo+sxnVDnsp0/LU9biMYaixLE1V3aT2cujefDPYwgopJLCXYr0elrprhVVCNddcVCMIpRjGKWEki4IAACCSCQAAAEEkASAAAAAAAAAAAAAAAAAAAAA/9k="
  },
  {
    id: "p7",
    name: "Bunsen Burner",
    title: "Bunsen Burner",
    category: "Instruments",
    description: "Standard laboratory Bunsen burner with adjustable flame control. Gas connection required.",
    stock: "In Stock",
    price: 499,
    discountPercent: 44,
    image: "https://m.media-amazon.com/images/I/61VU13k4JlL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p8",
    name: "Vernier Caliper",
    title: "Vernier Caliper",
    category: "Instruments",
    description: "Precision Vernier caliper for accurate measurements. Stainless steel construction with 0.02mm accuracy.",
    stock: "In Stock",
    price: 999,
    discountPercent: 40,
    image: "https://m.media-amazon.com/images/I/61CHTTsoY+L._AC_SR360,240_CB1169409_QL70_.jpg"
  },
  {
    id: "p9",
    name: "0-25mm Outside Micrometer Screw Gauge",
    title: "0-25mm Outside Micrometer Screw Gauge",
    category: "Instruments",
    description: "High-precision micrometer screw gauge with 0-25mm range. Ideal for precision measurements.",
    stock: "In Stock",
    price: 1450,
    discountPercent: 41,
    image: "https://m.media-amazon.com/images/I/41pXoFyJUxL._AC_UL480_FMwebp_QL65_.jpg"
  },
  // Additional products
  {
    id: "p10",
    name: "Lab Safety Goggles",
    title: "Lab Safety Goggles",
    category: "Safety Equipment",
    description: "Professional lab safety goggles with anti-fog coating and adjustable strap for comfortable fit.",
    stock: "In Stock",
    price: 299,
    discountPercent: 18,
    image: "https://m.media-amazon.com/images/I/512MPRIKcTL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p11",
    name: "Petri Dish Set (6 pcs)",
    title: "Petri Dish Set (6 pcs)",
    category: "Glassware",
    description: "Sterile disposable petri dishes, 90mm diameter. Perfect for microbiology and cell culture experiments.",
    stock: "In Stock",
    price: 350,
    discountPercent: 10,
    image: "https://m.media-amazon.com/images/I/51UetUr-yGL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p12",
    name: "LabMart Analytical Balance",
    title: "LabMart Analytical Balance",
    category: "Instruments",
    description: "High-precision analytical balance with 0.001g accuracy. Digital display with tare function.",
    stock: "In Stock",
    price: 399,
    discountPercent: 20,
    image: "https://m.media-amazon.com/images/I/31teuhMbBFL._SX466_.jpg"
  },
  {
    id: "p13",
    name: "Precision Weighing Scale",
    title: "Precision Weighing Scale",
    category: "Instruments",
    description: "Digital precision weighing scale with LCD display. Capacity: 5kg, accuracy: 0.1g.",
    stock: "In Stock",
    price: 1200,
    discountPercent: 25,
    image: "https://m.media-amazon.com/images/I/51WMzZq09cL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: "p14",
    name: "Lab Notebook",
    title: "Lab Notebook",
    category: "Accessories",
    description: "Professional lab notebook with numbered pages and table of contents. Hardcover, 200 pages.",
    stock: "In Stock",
    price: 150,
    discountPercent: 5,
    image: "https://m.media-amazon.com/images/I/71yo8ZKsuaL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p15",
    name: "Graduated Cylinder 100ml",
    title: "Graduated Cylinder 100ml",
    category: "Glassware",
    description: "Borosilicate glass graduated cylinder with precise ml markings. Class A accuracy.",
    stock: "In Stock",
    price: 220,
    discountPercent: 12,
    image: "https://m.media-amazon.com/images/I/41PnwHqzQNL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p16",
    name: "Lab Timer",
    title: "Lab Timer",
    category: "Accessories",
    description: "Digital lab timer with countdown and count-up modes. Loud alarm and magnetic back.",
    stock: "In Stock",
    price: 180,
    discountPercent: 10,
    image: "https://m.media-amazon.com/images/I/61ve10QCzgL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p17",
    name: "Lab Pipette Set(3)",
    title: "Lab Pipette Set(3)",
    category: "Instruments",
    description: "Variable volume micropipette set with tips. Includes 10-100µl, 100-1000µl pipettes.",
    stock: "In Stock",
    price: 960,
    discountPercent: 20,
    image: "data:image/jpeg;base64,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"
  },
  {
    id: "p18",
    name: "Lab Sample Bottles (6 pcs)",
    title: "Lab Sample Bottles (6 pcs)",
    category: "Glassware",
    description: "Amber glass sample bottles with screw caps. 100ml capacity, protects light-sensitive samples.",
    stock: "In Stock",
    price: 280,
    discountPercent: 10,
    image: "https://m.media-amazon.com/images/I/51tHuBnpEtL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p19",
    name: "Lab Forceps",
    title: "Lab Forceps",
    category: "Instruments",
    description: "Stainless steel laboratory forceps with fine tips. Ideal for handling small specimens.",
    stock: "In Stock",
    price: 120,
    discountPercent: 8,
    image: "https://m.media-amazon.com/images/I/41vcf7KOyEL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p20",
    name: "AI-Spatula Spoon 5",
    title: "AI-Spatula Spoon 5",
    category: "Instruments",
    description: "Stainless steel spatula spoon for precise chemical and powder handling. Double-ended design.",
    stock: "In Stock",
    price: 599,
    discountPercent: 25,
    image: "https://m.media-amazon.com/images/I/4142Y52-sHL._SY500_.jpg"
  },
  {
    id: "p21",
    name: "Swent Spinal Needle",
    title: "Swent Spinal Needle",
    category: "Medical Equipment",
    description: "Medical-grade spinal needle for advanced laboratory and medical training purposes.",
    stock: "Limited Stock",
    price: 999,
    discountPercent: 50,
    image: "https://m.media-amazon.com/images/I/515QwGUpDYL._SY500_.jpg"
  },
  {
    id: "p22",
    name: "Digital Weighing Scale (0.01g precision)",
    title: "Digital Weighing Scale (0.01g precision)",
    category: "Instruments",
    description: "High-precision digital weighing scale with 0.01g accuracy. Perfect for chemistry experiments requiring exact measurements.",
    stock: "In Stock",
    price: 2499,
    discountPercent: 20,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJf-abn0iNRpPKD7C6lfP3COJ7hkP_FtF3-LX2sepz1g&s=10"
  },
  {
    id: "p23",
    name: "Laboratory Bunsen Burner",
    title: "Laboratory Bunsen Burner",
    category: "Instruments",
    description: "Classic laboratory Bunsen burner with adjustable flame control and stable base. Ideal for heating experiments.",
    stock: "In Stock",
    price: 799,
    discountPercent: 15,
    image: "https://m.media-amazon.com/images/I/61VU13k4JlL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "p24",
    name: "Sterile Petri Dish Set (6 pcs)",
    title: "Sterile Petri Dish Set (6 pcs)",
    category: "Glassware",
    description: "Pack of 10 sterile disposable petri dishes, 90mm diameter. Perfect for microbiology and bacterial culture studies.",
    stock: "In Stock",
    price: 450,
    discountPercent: 10,
    image: "https://m.media-amazon.com/images/I/51UetUr-yGL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
  id: "p25",
  name: "Autoclave Sterilizer (Portable)",
  title: "Autoclave Sterilizer (Portable)",
  category: "Instruments",
  description: "Portable electric autoclave for sterilizing laboratory equipment and materials. Fast sterilization cycle with safety controls and digital display.",
  stock: "In Stock",
  price: 5499,
  discountPercent: 12,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVVmFuyRBq2ZMtmktSj9DSWE_0fq0x7QU2-H8DLjCdEw&s=10"
  },
  {
    id: "p26",
    name: "Student Lab Coat (White)",
    title: "Student Lab Coat (White)",
    category: "Safety Equipment",
    description: "100% cotton student lab coat with multiple pockets. Available in kids and teen sizes for safe laboratory work.",
    stock: "In Stock",
    price: 899,
    discountPercent: 18,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUgunaBiQiVPzyR48A-4O25ap_xwAg5g5GkXkCp2gDGw&s=10"
  },
  {
    id: "p27",
    name: "pH Test Strips Kit (100 strips)",
    title: "pH Test Strips Kit (100 strips)",
    category: "Lab Kits",
    description: "Universal pH test strips with color chart. Range 0-14 pH. Pack of 100 strips for accurate pH testing.",
    stock: "In Stock",
    price: 299,
    discountPercent: 12,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=400&fit=crop"
  },
  {
    id: "p28",
    name: "Magnifying Glass Set (3 pieces)",
    title: "Magnifying Glass Set (3 pieces)",
    category: "Instruments",
    description: "Set of 3 magnifying glasses with different magnifications (2x, 4x, 6x). Ideal for specimen observation.",
    stock: "In Stock",
    price: 599,
    discountPercent: 20,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhIPEBAPDw8QEBAQDw8PDw8ODxAPFREXFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNyktLisBCgoKDQ0NDw0NDysZFRk3Kzc3LSsrKystLSsrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIANUA7QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAgMEAQUHBv/EADkQAAIBAgMFBgQEBgIDAAAAAAABAgMRBCExEjJBUYEFImFxobFykcHRE0JS8BQzYoKS4SOTFeLx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8A+4AAAAdA4AAAAAAAAAAAAA6cAAAAAAAAAAAAAAAAAAAHQOAAAAAAOOSWrRH8WPP0YEwRjNPRokAAAAAAAAAAuAAAAAAAAAABy65oDoObS5o6AAAAAAADjdswEpWPOxvaShle7/TH6sh2hipX2IZzfL8q+4wmDUFdq8nm217AYKmNrNXUGk8k0kvf3Kv4jEfpf/Z/6ntvM5slHiw7TqR34teaU181Z+h6uC7RUlrbrdX5X4PwZOVCL1SfQx1cAk9qHdl6PwaA9uE0yR5eErvR5SWXl/o9KnK6uQSAMePxSgvRLmwLMRi4wV20l4/Q8yv2u3fYTds7u+S8kKOF/E79Vt8o8EbFSglZJJckgPJfadT9EukY/Vkodstbyt5xcfVXR6KoLkjk8NF6oolhu0lK3jpdpp+TWTN8Jp6HiVOzks4d1vVaxfmi7CYhp7Lya9PuiD1wRpzuvckAK6tZR14a8kcr1VFPO1tXyR5WzKu7u8aS0S1l4gdxPayWUbyf70SzZ59TtWrdpRll/Sl7s9iOGhHRJe5W8PG97alg8tdq1VrGX+MX9UbML2wnk8nyV0/8Xm+hq/h48kU1+z4S1QHpYfEqavdeDWhefn6alSebvF/mftL7nr4atfL9p8iDSAABnxdXZTfJX/0aDz8f3u7+qcY9Lgd7OofnlvSz+ehdVlfLhxJynZZFcEUcUDuyWACvZIuJbY40BknTvnxXquKNOGl65dSDR2OWfJ/UDVUlZHm0Kf4lTaecY5R5eLNeLla/hFsq7P7senrqQaarSy4+xnUCepNIorUTuyWHLAVtFFWlfPitH9DW0VSQDC1PszY2YoqxoqS7vnYDDjXtyUODzlblyN0IKMeSRgoZ1JPk7fI2Td/IghLN3GyTUQUQ2Q4liDQGapDnoV0Fsu2duHlw+3yNU4lTiBtpyuiRTh3qupeQcPPxGq8Ki9z0DHiYX2lzV15//UB1MsRmo1L56Pj58TTEo6AAACRKwFbiV1d1+aXqXMpmryjHx2n5IBjFvfB9yGH3V8y/ELNPg8v36mahl3eMcunD0INMUSIxJFAAACEkWqJFoCprUk9yHT2K8Q8rcZNJdf2zRVh3bcrehBgw+U5+ZrTMs1ad/wBS9UaYFE0AjoHDoOpARkV2LWiDWfqwO4fel5L6mgzYLNOXN5eSNJAKq8LrLVZ/6LQB51rPaWj1XjzNMGK9F70eq5lNOotFk+TKNARDbG2gL1kClTIVsUo668FxYE61RRTfL1OYOm85vWWi5RKqVGU3tTyit2P1ZuII1YXTXy8zC1nfispLwPQKK9G+a19wIwkTM0Zq9t2XFPQuU+eRRMlFFakiW0BZcrm7HJ1Us27GVSlVdldQ4vn4ICzDrbltfljlHxfM2nIRSVlojpBirU/y9Ys5Slz1Rrq09pW48HyMcnZ2lk+D5lGhHSqMiW0BYiSZXtHVICbMteTb2Y70vRHK2K/LHvSfBF+Fw+zm85vV8vAgthDZSS0SsSAAAAAVVsPGWqz5rJloAwzw1SO7O6/qO7MrZyzz/KrGyej8mUS+4GSnRqzz24qOmSd30/2a6GDjHPOT5slg93qy4AAAAAArq0Iy1XXijLPC1FuzTXKRuAGCkp2bls35Ir/5pNxjsWXHSxrfHz+rI4Ten/b9QIU8BnepJzfLRGxRtkskdAAAACM4KSs1dEgBinhJLcl0loQgql7SjHzuegVVNV0AyV5TVtmMZNu1tBHDVZb8lFco5sslrHz+psApoYeMNF5t6suAAAAAAAAAA5PR+TKJfcvno/Jmd/cCWD3erLyjB7vVl4AAAAAAAAGe+vn9Wcwu9P8At+ofHzfuMNvT/t+oGkAAAAAAAAqq6otKquq8vuBRPWPxfU2GOesfiXubAAAAAHQOAAAAAKq708yBPEcCAEcNJ7TXCzfyaNRjw2//AGy90bAAAAAAARqOyv8AvUkQraPp7gUkNpqStxav6k+BVU3o/FH3KNwAIAAAAAAUN3ZeZlx6gQqO2fjkaaUrxT5pMzVtOpow25H4UBYAAAAAAAAAAKcRw6kSWI4dSAFdB/8AJ0l7o2mKh/M6S90bQAAAAAAQraPp7omQrafL3Ap4FVTej8Ufct4FVXej8Ufco3AAgAAAAABmXHqaUZogQq6dS/C7kfIoq6dS/CbkfIC0AAADoHAAAAAFNfh1+hCROvw6/Qgyiqj/ADF5S+huMVH+Z0kbSAAAAAAFdfTqvcsK6+nVAVcCmtvR+KPui0qrb0fij7lG8AEAAAAAARliakZYARqaF2D3F192U1NC7B7i6+7AuAAAAAAAAAAFFdu+knlqlcqdT+ip/hI2ADDS2ttNQlrndWyfE3AAAAAAAAqxDyWTefBN+xaAMX4nhP8A66n2K6sm7NRm7NPcmtH4o9EAEAAAAAAADjds+RjVWK1lH5o2gDBOvC2/H/JF+BleHk2vW+XzNAAAAAAAAKoYiEpSgpJyhZTSz2W0nZ+NmnbxXMyLtenZS2Z97NK0E/w9na/Fld92Gyr96z8L5AegDD/5OHespycZ/hqMdlylPacbJXus4vN2Vk3pmWRx8G9mN5ydNVdmNn3G1bjbO4GoGKPacG6eUrVVJwd6fecU3spbV5O0W8k8jv8A5FWTcJq81Tkm6V4TbilGVpavaWSuBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmlgoObnLvXt3ZKLimtGsr382yip2RTlGpFudqslKpuJytFRS3csks9clnkgALv4NbTk51G3bZu1anbatsq1vzPW5XQ7LpQtsKUWqf4e0pd5rYjBSbesrQir+C5I6AJfwEe4oynCNOKjCEGlFJRsuF8ssr2yRyh2dCChFOTVOpKpDaafecZJ3dry3pO7u7u9wANgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z"
  },
  {
    id: "p29",
    name: "Complete Dissection Kit",
    title: "Complete Dissection Kit",
    category: "Lab Kits",
    description: "Professional 12-piece dissection kit with stainless steel instruments in storage case. For biology students.",
    stock: "In Stock",
    price: 1299,
    discountPercent: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQihRW_S8tIuSP5hf9Cy08PBI356EpfFGu23TQC6mVAk3CrWpWEG127_IU&s=10"
  },
  {
    id: "p30",
    name: "Volumetric Flask 250ml",
    title: "Volumetric Flask 250ml",
    category: "Glassware",
    description: "Class A borosilicate glass volumetric flask with glass stopper. 250ml capacity with calibration mark.",
    stock: "In Stock",
    price: 379,
    discountPercent: 8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrTQiJtaiKeDh4_YN0ek_bHRj5l9BTqdK3-q6_rroZRe7-K9FsiDQ8NFU&s=10"
  },
  {
    id: "p31",
    name: "Litmus Paper Test Pack",
    title: "Litmus Paper Test Pack",
    category: "Lab Kits",
    description: "Red and blue litmus paper strips for acid-base testing. Pack of 200 strips with storage case.",
    stock: "In Stock",
    price: 199,
    discountPercent: 15,
    image: "data:image/jpeg;base64,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"
  },
  {
    id: "p32",
    name: "Tripod Stand with Wire Gauze",
    title: "Tripod Stand with Wire Gauze",
    category: "Instruments",
    description: "Heavy-duty metal tripod stand with ceramic center wire gauze. Adjustable height for heating experiments.",
    stock: "In Stock",
    price: 549,
    discountPercent: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEtZiWjqSyuLsFDwzMti5aRhaYutrYJ5INibb96E0JDg&s=10"
  }
];

// Placeholder SVG for broken images
export const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f5f0eb' width='400' height='400'/%3E%3Cg fill='%238c9a5f' opacity='0.3'%3E%3Cpath d='M200 150 L250 200 L200 250 L150 200 Z'/%3E%3Ccircle cx='200' cy='200' r='60' fill='none' stroke='%238c9a5f' stroke-width='4'/%3E%3Cpath d='M180 180 L220 180 M200 160 L200 240' stroke='%238c9a5f' stroke-width='4' stroke-linecap='round'/%3E%3C/g%3E%3Ctext x='200' y='320' font-family='Arial' font-size='16' fill='%235a633b' text-anchor='middle'%3ELab Equipment%3C/text%3E%3C/svg%3E";

export default products;

