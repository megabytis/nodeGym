# ⚡ most common used MongoDB query operators :

## Logical operators

    1. $or: Matches if any condition is true

    2. $and: Matches if all conditions are true

    3. $not: Inverts the query

    4. $nor: Matches if none are true

## Comparison operators

    9. $eq: Equal ({ age: { $eq: 21 } })

    10. $ne: Not equal

    11. $gt: Greater than

    12. $gte: Greater than or equal

    13. $lt: Less than

    14. $lte: Less than or equal

    15. $in: Matches any in a given array ({ status: { $in: ["active","pending"] } })

    16. $nin: Not in

## Element operators

    17. $exists: Field exists or not

    18. $type: Match by data type

## Array operators

    19. $all: Match all values in array

    20. $size: Match array length

    21. $elemMatch: Match elements inside array with condition

[Reference](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/)
