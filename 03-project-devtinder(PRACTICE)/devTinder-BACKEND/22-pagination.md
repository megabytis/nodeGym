1. Pagination

   - Splits results into chunks (pages).

   - Helps avoid overloading clients with huge datasets.

   - Uses page and limit query parameters.

```js
// this is the example URL
/feed?page=1&limit=10

```

    - page: which page of results you want.

    - limit: how many items per page.

2. Skip & Limit

   - Formula:

   ```text
   skip = (page - 1) * limit
   ```

   - Example: page = 2, limit = 10 → skip 10 docs, return next 10.

3. Query vs Params

   - ✅ Use req.query.page and req.query.limit

   - ❌ Don’t use req.params.page — that’s for route parameters (/feed/1).
