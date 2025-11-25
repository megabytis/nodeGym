# index :

- there is a concept called "indexing", like there is an index page in every book, like that.
- if someone is trynna find a user by it's username, but the DataBase has Millions of usernames, so DB will loop over every username nd find the target, whose time complexity : O(n)
- So, it will take a lot of time just to search, nd system will Hang.
- But, if we'll index the username, then mongo will directly jump to requested target username, where time complexity is just O(logn)

```js
// example :-
// inside defining Schema
email: {
  unique: true;
}
// index:true makes index but unique:true also makes that field as index by default!
```

- But, instead of indexing a single field (like email), we index multiple fields together. like ;

```js
connectionRequestSchema.index({ fromUserID: 1, toUserID: 1 });
// here 1 means ascending order
// we can also use -1 for descending, but order usually doesn’t matter unless we do sorting
```
