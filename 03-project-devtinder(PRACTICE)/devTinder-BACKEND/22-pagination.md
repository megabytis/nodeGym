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

**⚠️Important points⚠️**

- so, for route "/feed/:limit", if in url anything like "/feed/3" we'll pass, then "limit=3" is "params"

- But, for route "/feed" only, if we'll pass "/feed?limit=3" or something having '?' like this then here "limit=3" is "query" not "params"

**Key Difference**

- Params are part of the route definition itself → /feed/:id

- Query are extra data sent after ? → /feed?page=2&limit=3

## For pagination, which one do you think is better to use — params or query?

    obviously query , cuz anytime a user can go to any specific page by staying on the specific route, so like netflix or any website where there are multiple pages in the same route, there query would be best to handle instead of params, where entire route has to be changed everytime
