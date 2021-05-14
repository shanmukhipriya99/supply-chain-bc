require("dotenv").config({ path: "./config/.env"});
const connection = require('../db/db');
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const router = new express.Router();

router.post("/signup", async (req, res) => {
    var user = {
        "PID": 
        "name": req.body.name,
        "email": req.body.email,
        "password": await bcrypt.hash(req.body.password, 10)
    }
    checkEmailExists(user.email).then((rows) => {
    if (rows.length === 0) {
      createAccount(user);
    }else {
      res.send({'success': false, 'message': 'Email already registered!'});
    }
    })
    .catch((err) => {
      throw new Error(err);
    });


function createAccount(info){
    let query = "INSERT INTO users SET ?";
      connection.query(query, info, (err, rows) => {
        if(err) {
         return res.status(500).json({ error: err });
        }
        return res.status(201).send({'success': true, 'message': 'Account registration success!'});
      });
    };
});

router.post("/login", (req, res) => {
    var user = {
        "email": req.body.email,
        "password": req.body.password
    }
    checkEmailExists(user.email).then( async (result) => {
        if(result.length === 1) {
            await bcrypt.compare(user.password, result[0].password, (err, results) => {
                if(err) {
                    throw new Error({ error: err});
                }
                if(results) {
                const token = jwt.sign({ email: result[0].email}, process.env.JWT, { expiresIn: "5h" });
                connection.query("UPDATE users SET ??=? WHERE ??=?", ["tokens", token, "email", user.email], (err, row) => {
                    if(err) { throw err } else {
                        res.send({	message: 'Login Successful, Token generated',	token: token,});
                    }
                });
             } else{res.send("Password incorrect!!!!");}
            }); 
        }else {res.send("Login failed!!!!"); }
    })
    .catch((err) => {
        throw new Error(err);
      });
});

function checkEmailExists(mail){
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM users WHERE email = ?";
      connection.query(query, [mail], (err, row) => {
        if(err){
        //   reject(err) 
        throw new Error(err);}
        resolve(row)
      });
    });
  };

module.exports = router;
