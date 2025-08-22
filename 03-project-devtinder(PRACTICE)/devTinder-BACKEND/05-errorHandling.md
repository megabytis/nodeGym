- In general best to use try....catch

- But still if we wanna write code for handling errors explicitely, then we can write a separate app.use() for it

```js
app.use(err, req, res, next) {
    // code....
};
```

#### ⚠️V. V. V. Imp. Point⚠️

- in app.use() if we'll pass 2 param, then they'll be (req,res)
- in app.use() if we'll pass 3 param, then they'll be (req,res,next)
- in app.use() if we'll pass 4 param, then they'll be (err,req,res,next)

-> if we'll pass 3 param like (err,req,res) here , err will behave like req, req will behave like res & res will behave like next 🤣
