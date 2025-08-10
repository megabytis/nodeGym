## RDBMS vs NoSQL

| Feature              | RDBMS (e.g., MySQL)                      | NoSQL (e.g., MongoDB)                      |
| -------------------- | ---------------------------------------- | ------------------------------------------ |
| **Data Structure**   | Tables → Rows & Columns                  | Collections → Documents & Fields           |
| **Data Type**        | Structured Data                          | Unstructured / Semi-structured Data        |
| **Schema**           | Fixed Schema                             | Flexible Schema                            |
| **Query Language**   | SQL                                      | Mongo Query Language (MQL), Cypher (Neo4j) |
| **Scaling**          | Tough horizontal scaling                 | Easy horizontal & vertical scaling         |
| **Relationships**    | Foreign keys & joins                     | Nested documents / Embedded relationships  |
| **Best For**         | Read-heavy apps, transactional workloads | Real-time, big data, distributed computing |
| **Example Use Case** | Banking apps                             | Real-time analytics, social media          |

---

### **Example Data Representation**

**RDBMS:**

```
User Table
ID | first_name | last_name | cell        | city
1  | Leslie     | Yepp      | 8125552344  | Pawnee
2  | Akshay     | Saini     | 981000      | Dehradun

Hobbies Table
ID | user_id | hobby
10 | 1       | scrapbooking
11 | 1       | eating waffles
12 | 1       | working
13 | 2       | JavaScript
14 | 2       | Cycling
```

**NoSQL (Document in MongoDB):**

```json
{
  "_id": 1,
  "first_name": "Leslie",
  "last_name": "Yepp",
  "cell": "8125552344",
  "city": "Pawnee",
  "hobbies": ["scrapbooking", "eating waffles", "working"]
}
```

✅ No need for joins  
✅ No need for data normalization

---

### **Pros & Cons**

**RDBMS (MySQL)**

- ✅ Strong consistency & reliability (ACID properties)
- ✅ Great for complex queries & relationships
- ✅ Mature ecosystem & community support
- ❌ Hard to scale horizontally
- ❌ Rigid schema — harder to handle evolving data structures

**NoSQL (MongoDB)**

- ✅ Flexible schema — easier to store evolving data
- ✅ High scalability for large datasets
- ✅ Faster for unstructured / semi-structured data
- ❌ Weaker consistency (eventual consistency in many cases)
- ❌ Less suited for complex relational queries
