require("dotenv").config({ path: "./config/.env" });
const connection = require("../db/db");
const express = require("express");
const uniqid = require("uniqid");
const timestamp = require("unix-timestamp");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/createAsset", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      let asset = {
        AID: uniqid("A-"),
        AName: req.body.AName,
        creator: result[0].PID,
        owner: result[0].PID,
        time: timestamp.now(),
      };
      let createAsset = "INSERT INTO assets SET ?";
      connection.query(createAsset, asset, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        return res
          .status(201)
          .send({ success: true, message: "Asset creation success!" });
      });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.get("/getAssets", auth, (req, res) => {
    
});

module.exports = router;
