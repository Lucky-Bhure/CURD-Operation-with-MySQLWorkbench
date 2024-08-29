const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
var methodOverride = require('method-override');

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

// Connecting with Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysqlconnection',
    password: 'Lucky19@'
});

// Generate Fake Users Data
const generateRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ];
};
// let users = [];
// for (let i = 0; i < 100; i++) {
//     users.push(generateRandomUser());
// }

// Get Count of Users route
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]["COUNT(*)"];
            res.render("home.ejs",{ count });
        });
    } catch (err) {
        console.log(err);
        res.send("Error");
    }
})

// Get Userdata route
app.get("/users", (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            if(err) throw err;
            res.render("users.ejs",{users});
        });
    } catch (err){
        res.send("Error at user data")
    }
});

// Add New User
app.get("/newuser", (req,res) => {
    res.render("newuser.ejs");
});

// Add New User to DB
app.patch("/newuser", (req,res) => {
    let user = req.body;
    user.id = faker.string.uuid();
    console.log(user);
    
    try {
        let q = `INSERT INTO user (id, username, email, password) VALUES ("${user.id}", "${user.username}", "${user.email}", "${user.password}")`;
        connection.query(q, (err, result) => {
            console.log(result);
            if (err) throw err;
            res.redirect('/users');
        });
    } catch (err) {
        res.send("New User Not Found");
    }
})

// Edit Username route
app.get("/users/:id/edit", (req, res) => {
    let id = req.params.id;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs",{user});
        });
    } catch (err){
        res.send("Error at user data")
    }
})

// Update route
app.patch("/users/:id",(req,res) => {
    let user = req.body;
    let id = req.params.id;

    let q = `Select * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err,result) =>{
            let userinfo = result[0];
            try {
                if(userinfo.id === id & user.password === userinfo.password) {
                    let u = `UPDATE user SET username = '${user.username}' WHERE id='${id}' AND password='${user.password}'`; 
                    connection.query(u, (err, result) =>{
                        res.redirect("/users");
                    });
                } else {
                    res.send("id or password is incorrect");
                }
            } catch (err) {
                res.send("ERRor");
            }
        });
    } catch (err) {
        res.send("error at DB");
    }
});  

// Delete User route
app.get("/users/:id/delete", (req, res) => {
    let id = req.params.id;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render("delete.ejs",{user});
        });
    } catch (err){
        res.send("Error at user data")
    }
})

// Delete route
app.delete("/users/:id", (req,res) => {
    let user = req.body;
    let id = req.params.id;

    let q = `Select * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err,result) =>{
            let userinfo = result[0];
            try {
                if(userinfo.id === id & user.password === userinfo.password) {
                    let u = `DELETE FROM user WHERE username='${userinfo.username}'`; 
                    connection.query(u, (err, result) =>{
                        res.redirect("/users");
                    });
                } else {
                    res.send("id or password is incorrect");
                }
            } catch (err) {
                res.send("ERROR");
            }
        });
    } catch (err) {
        res.send("error at DB");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

// End Connection with Database
// connection.end();