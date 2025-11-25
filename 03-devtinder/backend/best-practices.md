- instead of sending response in plain text like this 👇;

```js
res.send(
  `${loggedInUser.firstname}, your profile updated sucessfully!, here is your profile details ${loggedInUseruser}`
);
```

- send as a JSON object 👇

```js
res.json({
  messege: `${loggedInUser.firstname}, your profile updated sucessfully!`,
  data: loggedInUser,
});
```
