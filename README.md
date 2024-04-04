# Authentication Implementation

# overview

### 1. Created Server using express on PORT 5000.

### 2. Connected with mongoDb using mongoose

### 3. Implemented Logics
    * Login
    * SignUp
    * Update Password
    * Get all users
    * Get user by Id
    * Send token with httpOnly cookies

### 4. Proper Error handling 
    * Created my own Error Class (AppError) for molding errors
    * Created Higher Order function to handle errors in async functions.
    * programming error vs operational errors
    * developement vs production error handling
    * handled Uncaught promises

### 5. Used Best practices for Scalability

### 6. Used Environment variables.



# Available Scripts

In the project directory, you can run:

### `npm install` 

To install all dependencies

### `npm start` 

Runs the app in the development mode.

### `npm run start:prod`

Runs the app in the production mode.


## API's  ( USED POSTMAN TO TEST ALL API'S)

### POST signp
http://localhost:5000/api/signup

### POST login
http://localhost:5000/api/login

### POST logout
http://localhost:5000/api/logout

### POST refreshToken
http://localhost:5000/api/refresh


### GET get-all-users
http://localhost:5000/api/users

### PATCH update Password
http://localhost:5000/api/updatePassword


### GET get-user-by-id
http://localhost:5000/api/users/{id}