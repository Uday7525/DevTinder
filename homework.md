- create a repository
- initialize the repository
- node_modules, package.json, package-lock.json
- install express
- create a server
- listen to port 
- write request handlers for /test, /hello
- install nodemon and update scripts inside package.json
- what are dependencies
- what is the use of "-g" while npm install -g nodemon
- diff b/w caret and tilde(^ vs ¬)

- initialize git 
- .gitignore 
- create a remote repo on github 
- push all code to remote origin

- play with routes and routes extensions ex:/greet ,/greet/2

- order of the routes matter a lot 





- create a free cluster on MongoDB official website(Mongo Atlas)
- install mongoose library(npm i mongoose)
- connect your application to the database
- call the connectdb function and connect to database before starting application on 7777 

- create a userSchema & user Model 
-create /signup API to add data to database 
- push some documents using api calls from postman 
- error handling using try and catch

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recieve data from the end user
- user.findOne() with duplicate email ids 
- API - get user by email
- API - Feed API - GET/feed -get all the users fromthe database 
- API -get user by id 
- diff b/w patch and put 
- api -update a user
- explore mongoose documentation for model methods

-explore schematype options for gender
- improve  the DB schema - put all appropriate validations on each field in schema
- add timestamps to the userSchema
- add API level validations on patch request & signup post API 
- DATA sanitizing - API validation for each field 
- install validator
- explore validator library functions and use for password,email,imageUrl
- NEVER TRUST req.body

- Validate data in signup API
- install becrypt 
- create a password hash using bcrypt.hash and save the user with encrypted password

- create login API 
- compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET/profile API and check if you get the cookie back
- install jsonwebtoken
- in login API, after email and password validation, create a JWT token and send it to user in cookie
- read the cookies inside your profile API and find the logged user

- create userAuth middle ware
- add the middileware in profile API and a new sendConnectionRequest API 
- Set the expiry of JWT token and cookies to 7 days

- create userScema methods to getJWT()
- create userSchema methods to comparePassword(passwordInputByUser)

- explore Tinder API's
- Create a list all API you can think of in DevTinder
- Group multiple routes under respective routers
- read documentation of express.router
- Create routes folder for managing auth,profile,request routers
- Create authRouter,profileRouter,requestRouter
- import these routers in app.js

- Create POST /logout API 
- Create PATCH /profile/edit 
- Create PATCH/profile/password API =>forgot password api
- Make you validate all data in every POST, PATCH Apis

- explore about mongo db compound indexes
- what is $or in mongoose?
- explore all the queries
- why do we need index in db?
- schema.pre() function?