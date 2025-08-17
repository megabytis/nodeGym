## Basic :--

1. This route path will match requests to the root route, /

```js
app.get("/", (req, res) => {
  res.send("root");
});
```

2. This route path will match requests to /about

```js
app.get("/about", (req, res) => {
  res.send("about");
});
```

## Route paths based on string patterns :--

1. This route path will match acd and abcd

```js
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});
```

2. This route path will match abcd, abbcd, abbbcd, and so on .

```js
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});
```

3. This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.

```js
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});
```

4. This route path will match /abe and /abcde.

```js
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});
```

## Route paths based on regular expressions :--

1. This route path will match anything with an “a” in it.

```js
app.get(/a/, (req, res) => {
  res.send("/a/");
});
```

2. This route path will match anything ends with 'man'
   i.e.
   policeman, armyman, cameraman ✅
   sportsmanship ❌

```js
app.get(/.*man$/, (req, res) => {
  res.send(".*man$");
});
```

## Route parameters :--
