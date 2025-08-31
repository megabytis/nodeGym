- here i just created an /login API to let enter a user who have already did sign-up i.e. that user's data already been present inside DataBase

```js
app.post("/login", async (req, res, next) => {
  try {
    // STEP-1
    const { email, password } = req.body;

    // first checking wheather the email id is present in the DataBase or not
    const foundUserData = await UserModel.findOne({ email: email });
    if (!foundUserData) {
      throw new Error("Email Not Found!");
    }

    const isPasswordSame = await bcrypt.compare(
      password,
      foundUserData.password
    );

    if (!isPasswordSame) {
      res.send("Login Successful!");
    } else {
      throw new Error("Password is not Valid!");
    }
  } catch (err) {
    next(err);
  }
});
```

# What i Did Here ?

    - first of simple logic is during login user will give his/her email & password
    - so we have to extract the email & pass from req.body, which is STEP-1
    - then, i have to check wheather the email is present in our DataBase or not, HOW ?
            - using UserModel.find() or findOne() whatever , ur wish :)
    - if the same would be there in DataBase then it will return that user's full data to the variable as a promise
    - then we have to verify wheather the user entered pasword is matching with password +nt inside DB
    - Remember, user would have entered his/her "SIMPLE PASSWORD" but inside DB user's pass is in encryptd format.

## Checking password

        - bcrypt.compare(pass, DBpass)
        - here 'pass' is user entered pass got by req.body & 'DBpass' is password inside DB as encrypted format
        - we don't have to decrypt it, bcrypt.compare() will automatically decrypt DBpass and will compare with 'pass' nd RETURN AN BOOLEAN (i.e. True/False)

- Then if came True then user login seccessful, otherwise throw invalid password error

--------------------DONE---------------------------
