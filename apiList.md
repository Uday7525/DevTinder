// DevTinde API's

AuthRouters
- POST/signup
- POST/login
- POST/logout

profileRouters
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

connectionRequestRouters
- POST/request/send/:status/:userId
- POST/request/review/:status/:requestId


userRouters
- GET/user/requests/received
- GET/user/connections 
- GET/user/feed - Gets you the profiles of other users on platform 

Status: ignore, interested, accepted, rejected