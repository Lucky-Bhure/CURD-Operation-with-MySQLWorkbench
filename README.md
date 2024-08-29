# CURD Operation with MySQLWorkbench

# User Management System

A simple user management system built with Node.js, Express, MySQL, and EJS templates. This application allows users to be added, edited, deleted, and displayed from a MySQL database.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Security Considerations](#security-considerations)
- [License](#license)

## Features
- **Create User:** Add a new user with a unique ID, username, email, and password.
- **View Users:** Display all users stored in the database.
- **Edit User:** Update the username of a user, ensuring password validation.
- **Delete User:** Remove a user from the database, requiring password confirmation.
- **Database Integration:** Uses MySQL to store and manage user data.
- **Fake Data Generation:** Leveraging `faker.js` to generate fake users for testing purposes.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Lucky-Bhure/CURD-Operation-with-MySQLWorkbench.git
    cd CURD-Operation-with-MySQLWorkbench
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up MySQL Database:**

    - Create a database named `mysqlconnection`.
    - Create a `user` table with the following schema:

      ```sql
      CREATE TABLE user (
          id VARCHAR(255) PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
      );
      ```

4. **Configure Database Connection:**

    - Update the MySQL connection settings in `index.js`:

      ```javascript
      const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'mysqlconnection',
          password: 'yourpassword'
      });
      ```

5. **Start the application:**

    ```bash
    node index.js
    ```

6. **Open your browser and navigate to:**

    ```
    http://localhost:8080
    ```

## Usage

- **Home Page:** Displays the total number of users in the database.
- **View Users:** Navigate to `/users` to see a list of all users.
- **Add New User:** Go to `/newuser` to create a new user.
- **Edit User:** Click on a user's edit link to update their username.
- **Delete User:** Click on a user's delete link to remove them from the database.

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js
- [MySQL2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js
- [EJS](https://ejs.co/) - Embedded JavaScript templating
- [Faker.js](https://fakerjs.dev/) - Library for generating fake data
- [Method-Override](https://www.npmjs.com/package/method-override) - Middleware to support HTTP verbs like PUT and DELETE

**Note:** This is a simple project intended for educational purposes. Ensure you follow best practices and improve security for production environments.
