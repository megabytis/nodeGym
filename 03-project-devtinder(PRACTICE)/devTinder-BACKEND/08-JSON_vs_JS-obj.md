# Difference Between JSON Object and JavaScript Object

## 🧠 Key Differences

### 🔹 **1. Data Type**

- **JSON Object**: A _data structure_ (key-value pairs) used for data interchange.
- **JavaScript Object**: A _runtime entity_ that can hold dynamic values (e.g., `{}` or `{ name: "John" }`).

---

### 🔹 **2. Syntax**

| Feature | JSON Object                   | JavaScript Object           |
| ------- | ----------------------------- | --------------------------- |
| Example | `{"name": "John", "age": 30}` | `{ name: "John", age: 30 }` |

---

### 🔹 **3. Language**

- **JSON**: Text-based, human-readable format (not executable).
- **JavaScript**: A programming language that executes in a browser or server (executable).

---

### 🔹 **4. Usage**

| Purpose        | JSON                                   | JavaScript                            |
| -------------- | -------------------------------------- | ------------------------------------- |
| Data exchange  | ✅ Yes (e.g., API calls, localStorage) | ❌ No (requires parsing)              |
| Code execution | ❌ No                                  | ✅ Yes (can hold logic and variables) |

---

### 🔹 **5. Serialization & Parsing**

- **JSON**: Can be _serialized_ to JSON (e.g., `JSON.stringify(obj)`), but _not directly executed_.
- **JavaScript**: Can be _deserialized_ from JSON using `JSON.parse()` (but not _executed_ as-is).

---

### 🔹 **6. Key Differences**

| Feature           | JSON Object       | JavaScript Object    |
| ----------------- | ----------------- | -------------------- |
| **Execution**     | ❌ Not executable | ✅ Executable        |
| **Serialization** | ✅ Yes (to JSON)  | ✅ Yes (from JSON)   |
| **Language**      | Text-based        | Programming language |
| **Use Case**      | Data interchange  | Code execution       |

---

### 🧪 Example Usage

#### JSON:

```json
{
  "name": "John",
  "age": 30,
  "isStudent": false
}
```
