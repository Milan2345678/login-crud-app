Login CRUD Application
Overview:  This is a simple Practice Login CRUD Application built using Node.js, Express.js, and MongoDB. i did this for learning purposes
and practicing API's and mongosh.
This web application allows users to register, login, view users, update user details, and delete users.
This project demonstrates how to build a RESTful API and connect it with a MongoDB database using Mongoose.

Tech Stack:
Node.js
Express.js
MongoDB
Mongoose
HTML
JavaScript
Postman (for API testing)

Features
User Registration, User Login, View All Users, Update User Information, Delete User, REST API endpoints, MongoDB database integration

Project Structure: 
LOGIN-CRUD
│
├── controllers
│   └── userController.js
│
├── models
│   └── userModel.js
│
├── routes
│   └── userRoutes.js
│
├── config
│   └── db.js
│
├── public
│   └── HTML files
│
├── server.js / app.js
├── package.json
└── README.md
Installation

Clone the repository

git clone https://github.com/Milan2345678/login-crud-app.git

Navigate into the project folder

cd your-repo-name

Install dependencies

npm install

Start the server

node server.js

or if using nodemon

nodemon server.js
API Endpoints
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Login user
GET	/	Get all users
PUT	/	Update user
DELETE	/	Delete user
Example Request (Postman)

POST /register

{
  "name": "Milan",
  "email": "milan@example.com",
  "password": "123456"
}
Future Improvements: 

Password hashing with bcrypt
Authentication using JWT
Better error handling
Frontend UI improvements

Author:
Milan Bhati
B.Tech Computer Science Student
