# What You Should Cache (and What You Should Avoid)

## Perfect Candidates (Yes)

- Product lists
- Individual product detail
- User dashboard data
- Order history
- Home page data
- Categories
- Trending items
- Slow aggregations

## Bad Candidates (No)

- Highly dynamic data (like stock changing every second)
- Private sensitive data
- Large datasets that exceed memory
- Anything that changes so quickly TTL becomes useless

## Semi-Good Candidates (Cache with invalidation)

- Carts
- Order summaries
