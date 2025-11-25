**NEVER TRUST req.body (i.e. user's request)** : so do these things 👇

# Data Sanitization & Schema Validation

## 1. Data Sanitization

**Goal**: Clean input data to make it safe & consistent.

### Methods:

- **Trim** → remove extra whitespace.
- **Escape** → convert `<`, `>` etc. into safe entities.
- **Strip HTML/JS** → remove script tags (prevent XSS).
- **Type Cast** → ensure correct types (string → int, etc.).
- **Normalize** → standardize formats (emails, phone numbers).
- **Whitelist/Blacklist** → only allow expected fields.

### Node.js Tools:

- `validator` → email, escape, normalize.
- `express-mongo-sanitize` → prevent MongoDB operator injection.
- `xss-clean` → remove malicious HTML/JS.
- `helmet` → set secure HTTP headers.

---

## 2. Schema Validation

**Goal**: Ensure data matches expected structure & rules.

### Approaches:

1. **Manual Validation** → basic `if` checks.
2. **Libraries**:
   - **Joi** → schema-based, powerful chaining.
   - **Yup** → good for frontend + forms.
   - **Zod** → TypeScript-first.
   - **express-validator** → Express middleware.
   - **Ajv** → JSON Schema validator.
3. **DB-level Validation**:
   - **Mongoose (MongoDB ODM)**: (Reference)[https://mongoosejs.com/docs/schematypes.html]
     - `type` → defines field type. e.g String, [String], Number, etc....
     - `required: true` → must be provided.
     - `unique: true` → creates a unique index.
     - `default` → set default values.
     - `enum` → restrict values to a set.
     - `match` → regex pattern check.
     - `minlength` / `maxlength` → for strings.
     - `min` / `max` → for numbers/dates.
     - `validate(){}` → custom function.
       - This validator function won't work if we call update API, it only works while entering any fresh new document.
       - But, still if we need to run this validator, while updating document, we have to explicitely mention 'runValidators:True' inside update API's findByIdAndUpdate() function as a param.
     - `trim: true` → auto trim strings.
     - `lowercase: true` → convert to lowercase.
     - `uppercase: true` → convert to uppercase.
     - `immutable: true` → cannot be changed once set.

**Tip**

- Improve the DB schema, put all appropriate validations, along with custom validators on each field in schema if possible.
- Add timestamps to the user Schema

# API-Level Validation

## Why?

- Protects against invalid/malicious requests.
- Prevents injection (SQL/NoSQL).
- Stops overposting attacks (extra fields).
- Provides friendly error messages.

---

## What to Validate?

1. **Request Body (`req.body`)**

   - Required fields
   - Data types (string, number, boolean)
   - Length limits
   - Formats (email, phone)
   - Enum restrictions
   - Custom rules (age >= 18)

2. **Query Parameters (`req.query`)**

   - Pagination (must be numbers)
   - Filters (allowed fields only)
   - Sorting (whitelisted keys)

3. **Route Params (`req.params`)**

   - Validate IDs (ObjectId / UUID / int)

4. **Headers / Tokens**
   - Auth header required
   - Validate JWT/API key format

---

## 3. Best Practices

- Validate **both frontend + backend**.
- Sanitize **before validation**.
- Use libraries instead of manual checks.
- Drop unexpected fields (prevent overposting).
- Log validation errors securely (don’t expose sensitive details).

# **What I did step-by-step**

1. **In API validation(route-params)**:

   - insted of passing userID in postman's req body, i passed it directly in req URL.
     e.g. req_URL :- http://localhost:8888/user/68af2d94dfe297d8e85a1cb9
     and recieved the req in update user API like this 👇

   ```js
   app.patch("/user/:userID", async (req, res) => {
   const userID = req.params?.userID;
   ......
   ```

   - Then created a list containing all keys which can be modified/updated multiple times by user, but those keys are not in the list can't be allowed to modify after registration.
     e.g. 👇

   ```js
   const ALLOWED_UPDATES_LIST = [
     "firstName",
     "lastName",
     "age",
     "photoURL",
     "skills",
   ];
   ```

   **Tip** : You can add Validations or literally everything, think from a user's perception that what a user can insert in every field(like; in skills, age, email) & then then think about logics to handle all illegal/mis-inputs .

   - e.g. an attacker enteres thousands of data inside 'skills' array to our DB, so we can handle it manually like we'll give a condition that if the arra length exceeds 10 values then throw error like this . :)

# **Validation using External Libraries**

      - using "validator" [https://www.npmjs.com/package/validator]
