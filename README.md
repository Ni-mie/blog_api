# Blog API
***
This project is a RESTful API for a simple blog application. It handles CRUD operations for posts, comments, and users. It also includes user authentication and authorization, ensuring users can only update or delete their own posts and comments.

## Features
* User Registration and Login
* Create, Read, Update, and Delete Posts
* Create, Read, Update, and Delete Comments
* User Authentication and Authorization using JWT
* Pagination for Posts and Comments

### Technologies Used
* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT (JSON Web Tokens)
* Docker

### Setup and Installation
#### Prerequisites
* Node.js
* Docker

#### Installation
1. Clone the repository:
```
git clone https://github.com/Ni-mie/blog-api.git
cd blog-api
```
2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add the following:

```
PORT=10000
JWT_SECRET=your_jwt_secret
DB_HOST=db
DB_USER=root
DB_PASSWORD=password
DB_NAME=blog_db
```
4. Run the application with Docker:
```
docker-compose up
```
5. Access the application:
The application will be running at http://localhost:3000.

### API Documentation
The Postman collection for API documentation can be found [here] ().

