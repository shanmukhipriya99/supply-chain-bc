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
      connection.query(createAsset, asset, (err, row) => {
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
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      let assets = "SELECT * FROM assets WHERE ??=?";
      connection.query(assets, ["creator", result[0].PID], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (rows != 0) {
          return res.status(200).send({ success: true, Assets: rows });
        }
      });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.post("/transferAsset/:id", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      getPID(req.body.Receiver).then((row) => {
        let txn = {
          TID: uniqid("T-"),
          AID: req.params.id,
          Sender: result[0].PID,
          Receiver: row[0].PID,
          time: timestamp.now(),
        };
        // console.log(txn);
        let addTxn = "INSERT INTO transaction SET ?";
        connection.query(addTxn, txn, (err, rows) => {
          if (err) {
            return res.status(500).send({ error: err });
          }
          let transferAsset = "UPDATE assets SET ??=? WHERE ??=?";
          connection.query(transferAsset, ["owner", row[0].PID, "AID", req.params.id], (err, transfer) => {
            return res.status(200).send({ success: true, message: "Asset Transfered"});
          });
        });
      });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.get("/getTxns", auth, (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    let pid = "SELECT * FROM parties WHERE ??=?";
    connection.query(pid, ["token", token], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result != 0) {
          let txns = "SELECT * FROM transaction WHERE ??=? OR ??=?";
          connection.query(txns, ["Sender", result[0].PID, "Receiver", result[0].PID], (err, rows) => {
              if(err) {
                return res.status(500).send({ error: err});
              }
            return res.status(200).send({ success: true, Txns: rows});
          });
      } else {
        return res.status(401).send({ success: false, message: "Unauthorized"});
      }
    });
});

router.get("/trackAsset/:id", auth, (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    let pid = "SELECT * FROM parties WHERE ??=?";
    connection.query(pid, ["token", token], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result != 0) {
          let assetTxns = "SELECT * FROM transaction WHERE ??=? ";
          connection.query(assetTxns, ["AID", req.params.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err });
              }                
            return res.status(200).send({ success: true, AssetTxns: rows});
          });
      } else {
        return res.status(401).send({ success: false, message: "Unauthorized"});
      }
    });
});

function getPID(email) {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM parties WHERE ??=?";
    connection.query(query, ["email", email], (err, row) => {
      if (err) {
        //   reject(err)
        throw new Error(err);
      }
      resolve(row);
    });
  });
}

module.exports = router;
