- Now i have to do Password encryption, so that user entered password won't stored in DB as it is
- so, have to store in hash format
- so, user after hitting the sign-up button ;
  - first do Validation of user entered data
  - then encrypt the password
  - then store entire user data to DB

1. Data Validation :-

   - instead of validating inside app, i've created a separate validate.js file in /src/utils and in a function pass 'req', using that req.body get all data like firstName, lastName, email, password etc..
   - then, validate each data one by one inside that function block
   - then import and call it in app

2. Encrypt Password :-
   - install an npm package 'bcrypt'
   - then do bcrypt.hash(password,10)
   - here 'password' is user given simple password & '10' is salt which is an unknon random string which will round and round around user given password to make it complicated hashed password.
   - this bcrypt.hash() basically returns and Promise, so use 'await' before using it

**Important Tips**

- Never ever disclose wheather user entered emailID is present in DB or not/ wheather the email ID is wrong / password is wrong, cuz it is called Information Leak.
- if anything goes wrong just say 'Invalid Credential' 😅
- So, never disclose anything about DataBase.
