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
- POST/request/send/interested/:userId
- POSt/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

userRouters
- GET/user/connections
- GET/user/requests/received 
- GET/user/feed - Gets you the profiles of other users on platform 

Status: ignore, interested, accepted, rejected