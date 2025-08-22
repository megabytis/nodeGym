# ⚠️⚠️⚠️V. V. V. IMPORTANT NOTE ⚠️⚠️⚠️

Here i'll write how i'm starting everything from scratch to end of Bakend in nodeJS.
so go ahead .....

1. Created a separate directory for my project & started with 'npm init' in that folder .
   - 'npm init' is just like index page of an book 😉
2. created './src' directory for all source codes, i.e. all js files would stay inside /src
3. added app.js, which is the starter file
4. Then i installed expressJS to create a server
   - after that './node_modules' folder will be added, inside it express folder will be added, where all files of express would present.
   - 'expressJs' will be added as dependencies inside package.json file
   - But, inside './node_modules', there r also many more folders, from where these came ? just like in our main './package.json' file-dependencies express was written so express folder added in './node_modules', that's how there are many dependencies in './node_modules/express/package.json', so these thependency folders will also be added nah in './node_modules' 😆
   - a './package-lock.json' file would be added there also, there in "express": "^5.1.0", (^: is k.a. 'caret', 5:Major, 1:Minor, 0:Patch), i.e. versions will be changed slowly slowly , if any bugs fixed/patch fixed, '0' will be updated '1', if any minor updates will be there '1' will be updated to '2', if any breaking changes will be added, '5' will be changed to '6', like this goes on.....
   - we can write 'caret', i.e. ~ (“Approximately equivalent to version”) or 'tide', i.e. ^ (“Compatible with version”) , here "~5.1.0" means, it will us releases from "5.1.0" to "5.2.0", and "^5.1.0" means it will use releases from "5.1.0" to "^6.0.0". instead of ~ & ^ there are also <,>,<=,>=,
5. Now coding started 😅

```js
const express = require("express");
const app = express();
const port = 20100;

// Request Handler
app.use((req, res) => {
  res.send("Welcome to server");
});

// Listen to the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

-> i've added 'nodemon src/app.js' in './package.json' file inside "scripts", like this ;

```js
"scripts": {
    "app": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
```

-> after that i started server using command 'npm run dev' or 'npm run app'
-> wrote multiple request handlers e.g. /home, /secret, /hidden etc...

6. Now i started to push it in GitHub, so initialized git by 'git init', but we shouldn't push node_modules in git, we only push codes written by us, ok, so added '.gitignore' and added the folders & files to which git will ignore and will not be uploaded to GitHub, then clone our github repo, copied all necessary file to that cloned directory, then run following commands to push to that directory!
   - git add .
   - git commit -m "mssege"
   - git push origin main

-> Now everything done