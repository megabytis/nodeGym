- here i just created an GET /feed API to get all user & their data OR specific users by giving some conditions

# creating /feed API :-

```js
// example :--
app.get("/feed", async (req, res, next) => {
  try {
    const foundUser = await UserModel.find({ firstName: req.body.firstName });
    res.send(foundUser);
  } catch (err) {
    console.log(err);
  }
});
```

## find() behavior :-

    - UserModel.find() always returns an array.
    - If no matching document is found → it returns blank array [] (not an error), so we have to catch it manually .
    - If MongoDB query syntax is wrong or connection fails → it throws an error (caught by catch).

# Handling Error :-

## possible user input error & their solution :--

1. Case 1: req.body is completely empty (i.e. if user hasn't written anything) ;

   - it will return 'undefined', so
   - MongoDB sees { email: undefined } as → {} (find everything).
   - So obviously it will skip 404 error & will return all users (an array)

2. Case 2: req.body.email exists but is invalid (not matching anything in DB) ;

   - in this case query will run fine, but Nothing matches in DB so returns blank [].
   - Then, if (foundUser.length === 0) correctly triggers 404 ✅.

3. Case 3: req.body.email exists and matches a record ;
   - Query returns [ { …userDoc } ].
   - Length > 0 → return the user(s). ✅

```js
// Modified & Error Handled :--
app.get("/feed", async (req, res, next) => {
  try {
    const foundUser = await UserModel.find({ email: req.body.email });
    if (foundUser.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(foundUser);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
```

# Extra :--

- beside find() method, there is a findOne() method, both have same work, but if there are multiple users for same criteria, then find() will return all requirement fulfilled users, but findOne() only return 1stly found one user's data
