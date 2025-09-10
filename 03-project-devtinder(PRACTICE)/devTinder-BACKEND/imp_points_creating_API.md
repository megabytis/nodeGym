# Points to Remeber while creating APIs :

    - think as much possible cases as you can.
    - suppose u r creating an tinder app, u have created an send request API, okey!
    - cases like;
    - (i) what if there is something else is passing through parameter instead of 'interested' & 'ignored'. handle it !
    - (ii) what if user is sending multiple requests, i.e. after sending one request it shouldn't allow to send another reuests. so, handle it !
    - (iii) what if the reciever is sending us request, after we sent req to reciever, that shouldn't be allowed. handle it !
    - (iv) what if user is sending request to him/herself, Handle it !
    - like this, think many edge cases and handle them one by one !

    - inside APIs, whatever codes we'll write for cases like above, we can directly write inside the API. But, we can also write those before doing model.save(), in the specific Schema using schemaName.pre("save"), it's like a middleware, which will check our API conditions before saving them to DB. example 👇

```js
// example :-
// Inside schema defining page ;
connectionRequestSchema.pre("save", function (next) {
  // If the user is sending connection request to him/herself 😅
  if (this.fromUserID.equals(this.toUserID)) {
    throw new Error("Can't send request to self!");
  }
  next();
});

// here Arrow function won't work
// here at the end we have to pass it to next(), cuz it behaves like an Middleware !
```

    - But the 👆 method is completely OPTIONAL. it doesn't matter where u have written the logic, inside API or inside Schema.
