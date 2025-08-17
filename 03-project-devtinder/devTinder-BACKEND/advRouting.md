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
  // here 'b' is Optional
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
  // here 'cd' is Optional
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

### using " : "

```js
app.get("/secret/gf/:gfName/:age/:college", (req, res) => {
  res.send(req.params);
});
```

=> NOTE : The name of route parameters must be made up of “word characters” ([A-Za-z0-9_]).

:gfName, :age & all, i.e. a route having ':' , Think like these are a placeholder key inside the route definition.
When we hit that route with a real value in URL, Express does the mapping for us like key:value pair inside an {}

-> here ;
Route path: /secret/gf/:gfName/:age/:college
Request URL: http://localhost:3292/secret/gf/Prachi/22/ITER,SOA
req.params: { "gfName": "Prachi", "age": "22", "college": "ITER,SOA"}

### using " . " & " - "

```js
app.get("/flight/:from-:to", (req, res) => {
  res.send(req.params);
});
```

-> here;
Route path: /flights/:from-:to
Request URL: http://localhost:3292/flight/INDIA-USA
req.params: { "Genus": "INDIA", "Species": "USA"}

### using " () "

```js
app.get("/user/:userID(\\d+)", (req, res) => {
  res.send(req.params);
});
```

-> here ;
Route path: /user/:userID(\\d+)
Request URL: http://localhost:3292/user/90
req.params: {"userID": "90"}

- here, "\d+" is an "regex"[https://www.rexegg.com/regex-quickstart.php]
- so, \d means 'digits from 0-9' and + means more than one digit
- ⚠️IMP⚠️, but here \\d+ written, cuz in js single \d means an 'escape-sequence' like \n, \t, so to pass actual \d+ we have to do double \\

**_ Must-know regex (for routes + general dev): _**

```text
\d → any digit (0-9)
\d+ → one or more digits (42, 1234)
[a-z] → lowercase letters (a–z)
[A-Z] → uppercase letters
[a-zA-Z] → both cases
[0-9] → digits (same as \d)
- → one or more
* → zero or more
{n} → exactly n times
{n,m} → between n and m times
? → optional (0 or 1 time)
. → any character (but not newline)
```