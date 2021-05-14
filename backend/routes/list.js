const express = require("express");
const connection = require("../db/db");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/list", auth, (req, res) => {
    let query = "SELECT * FROM ?? ";
    connection.query(query, ["users"], (err, result) => {
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Success", "Users" : result});
        }
    });

});

module.exports = router;