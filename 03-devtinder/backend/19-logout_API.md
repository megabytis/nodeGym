- after logging-in server used to send an cookies having a JWT token, which was being validated during any furthur API call .
- So, if anyhow that JWT token validation Fails, then Boom 💥 Log-out.
- So, let's assume posibilities to do it ;

  1. if we'll expire the cookie from user's browser

  2. if we'll replace the ORIGINAL-COOKIE (which will be validated) with a DUMMY-COOKIE (which will 100% not gonna be validated)

  3. if by any chance we can remove the cookie entirely from user's browser

## Explaning all Possibilities :

- In these above 3 cases, logout will be successfull on every case.
- But, accprding to case-1, we can't touch user's browser so, modifying cookie expiry isn't possible from client side.
- But case-2 can be possible , like this ;

```js
const token = jwt.sign("dummyUserID1234", "dummyPassword");
// 👆 this dummy token is not gonna be validated, so logout will happen.
// But still the cookie will remain inside User's browser but & contain the dummy token, which can be confusing for Debuggers while debugging.
// So, better to remove the Cookie also from user's browser, which can be possible if we'll expire it quickly 👇
res.cookie("token", token, {
  httpOnly: true,
  expires: new Date(Date.now()), // cookie expires quickly & being removed automatically from user's browser !
});
```

- case-3 is 100% same like case-2, but in case-2 it's like DIY(do it urself, i.e. wrote logic manually), but here we can directly use an express bilt-in method to expire jwt token + remove cookie from user's browser! 👇

```js
res.clearCookie("token", {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
});
```
