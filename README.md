**Description**

This is a backend application built with Node.js, Express, and MySQL.
It provides authentication, user management, and task management with role-based access (Admin/User).

**Features**

User authentication with JWT
Password hashing with bcrypt
Admin: manage users and tasks
User: manage personal tasks

**Tech Stack**

Node.js (Express), 
MySQL, 
JWT, 
bcryptjs, 
morgan, 
dotenv.

**Installation**

#Clone the repo

git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend

#Install dependencies

npm install

#Create .env file with:

PORT=5000
DB_HOST=localhost, 

DB_USER=root, 

DB_PASS=yourpassword, 

DB_NAME=taskdb, 

JWT_SECRET=yourSecretKey, 

**Create MySQL tables (users, tasks).**

Start server

npm start




**API Endpoints**

#Auth

POST /auth/register → Register new user

POST /auth/login → Login user

#Admin

PUT /admin/updateUser/:id

DELETE /admin/deleteUser/:id

GET /admin/allUsers

PATCH /admin/users/:id/toggle?action=block|unblock

GET /admin/dashboard

POST /admin/task/create

GET /admin/task/getall

DELETE /admin/task/delete/:id

#User

GET /user/tasks → Get user’s tasks

PATCH /user/task/:id/status → Update task status

PATCH /user/task/:id/notes → Add notes to a task
