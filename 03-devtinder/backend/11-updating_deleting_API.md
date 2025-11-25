# UPDATE

## 🔥 Core Difference Between PUT and PATCH

**PUT**

    - Replaces the entire resource with the new one you send.
    - If some fields are missing, they’ll get overwritten or removed (depending on your implementation).
    - Think of it as: “replace the whole document with this one.”

Example:---

PUT /user/123
Content-Type: application/json

{
"name": "Miku",
"email": "miku@example.com"
}

- 👉 If the original user also had age: 21, it’ll be gone after this request because you didn’t include it.

**PATCH**

    - Partially updates the resource.
    - Only the fields you specify are modified.
    - Think of it as: “apply these changes to the existing document.”

Example :--

PATCH /user/123
Content-Type: application/json

{
"name": "Miku"
}

- 👉 Only name gets updated. Other fields (email, age, etc.) stay untouched.

### ⚡ Quick Analogy

    PUT = replace the whole pizza with a new one 🍕

    PATCH = just add extra cheese on top of the existing pizza 🧀
