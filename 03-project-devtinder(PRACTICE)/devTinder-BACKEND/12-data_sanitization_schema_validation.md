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
   - **Mongoose (MongoDB ODM)**:
     - `type` → defines field type. e.g String, [String], Number, etc....
     - `required: true` → must be provided.
     - `unique: true` → creates a unique index.
     - `default` → set default values.
     - `enum` → restrict values to a set.
     - `match` → regex pattern check.
     - `minlength` / `maxlength` → for strings.
     - `min` / `max` → for numbers/dates.
     - `validate` → custom function.
     - `trim: true` → auto trim strings.
     - `lowercase: true` → convert to lowercase.
     - `uppercase: true` → convert to uppercase.
     - `immutable: true` → cannot be changed once set.
   - **SQL Constraints**:
     - `NOT NULL` → field must have value.
     - `UNIQUE` → no duplicates allowed.
     - `PRIMARY KEY` → unique + not null.
     - `FOREIGN KEY` → enforce relationships.
     - `DEFAULT` → fallback value.
     - `CHECK` → custom conditions (`age >= 18`).
     - `AUTO_INCREMENT / SERIAL` → auto IDs.
     - `ENUM` → restrict field to fixed values.

---

## 3. Best Practices

- Validate **both frontend + backend**.
- Sanitize **before validation**.
- Use libraries instead of manual checks.
- Drop unexpected fields (prevent overposting).
- Log validation errors securely (don’t expose sensitive details).
