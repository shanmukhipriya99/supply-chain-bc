require("dotenv").config({ path: "./config/.env" });
const connection = require("../db/db");
const express = require("express");
const uniqid = require("uniqid");
const timestamp = require("unix-timestamp");
const auth = require("../middleware/auth");
const { response } = require("express");
const router = new express.Router();

router.get("/getAID", auth, (req, res) => {
  return  res
  .status(201)
  .send({ success: true, id:  uniqid("A-")});
})

router.post("/createAsset", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      let asset = {
        AID: req.body.AID,
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
      let assets = "SELECT * FROM assets WHERE ??=? OR ??=?";
      let creators = [];
      let owners = [];
      connection.query(assets, ["creator", result[0].PID, "owner", result[0].PID], async (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (rows != 0) {
          for(let i=0; i<rows.length; i++){
            await getDetails(rows[i].creator, rows[i].owner).then(result => {
              creators.push(result.sender);
              owners.push(result.receiver);
            })
          }
          return res.status(200).send({ success: true, Assets: rows, creators: creators, owners: owners });
        }
      });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.get("/assetName/:id", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      let assetName = "SELECT AName FROM assets WHERE ??=?";
      connection.query(assetName, ["AID", req.params.id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        return res.status(200).send({ success: true, AssetName: row });
      });
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
          connection.query(
            transferAsset,
            ["owner", row[0].PID, "AID", req.params.id],
            (err, transfer) => {
              return res
                .status(200)
                .send({ success: true, message: "Asset Transfered" });
            }
          );
        });
      });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.get("/getTxns", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let sender = [];
  let receiver = [];
  let assetName = [];
  let time = [];
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      //sender, receiver
      getTxns(result[0].PID, result[0].PID)
        .then(async (transactions) => {
          let txn = 0;
          if (transactions.length != 0) {
            for (let i = 0; i < transactions.length; i++) {
              time.push(transactions[i].time);
              await getDetails(
                transactions[i].Sender,
                transactions[i].Receiver
              ).then(async (party) => {
                sender.push(party.sender);
                receiver.push(party.receiver);
                // console.log("S"+ sender + "R" + receiver);
                await getAName(transactions[i].AID).then((aname) => {
                  assetName.push(aname);
                  // console.log(assetName);
                });
                // console.log("S"+sender+" R"+receiver+" A"+assetName );
              });
              txn++;
            }
          }
          // console.log("S"+sender+" R"+receiver+" A"+assetName+" T"+time );
          return res.status(200).send({
            success: true,
            Senders: sender,
            Receivers: receiver,
            ANames: assetName,
            Time: time,
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.get("/trackAsset/:id", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  let sender = [];
  let receiver = [];
  let assetName = [];
  let time = [];
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      getAssetTxns(req.params.id).then(async (result) => {
        // console.log(result);
        if (result.length != 0) {
          for (let i = 0; i < result.length; i++) {
            time.push(result[i].time);
            await getDetails(
              result[i].Sender,
              result[i].Receiver
            ).then(async (party) => {
              sender.push(party.sender);
              receiver.push(party.receiver);
              // console.log("S"+ sender + "R" + receiver);
              await getAName(req.params.id).then((aname) => {
                assetName.push(aname);
                // console.log(assetName);
              });
            });
          }
        }
        // console.log("S"+sender+" R"+receiver+" A"+assetName );
      return res.status(200).send({
        success: true,
        Senders: sender,
        Receivers: receiver,
        ANames: assetName,
        Time: time,
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });

      // return res.status(200).send({ success: true, AssetTxns: rows });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  });
});

router.get("/allAssets", auth, (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let pid = "SELECT * FROM parties WHERE ??=?";
  connection.query(pid, ["token", token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result != 0) {
      let assets = "SELECT * FROM assets";
      let creators = [];
      let owners = [];
      connection.query(assets, async (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (rows != 0) {
          for(let i=0; i<rows.length; i++){
            await getDetails(rows[i].creator, rows[i].owner).then(result => {
              creators.push(result.sender);
              owners.push(result.receiver);
            })
          }
          return res.status(200).send({ success: true, Assets: rows, creators: creators, owners: owners });
        }
      });
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
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

function getTxns(sender, receiver) {
  return new Promise((resolve, reject) => {
    let txns = "SELECT * FROM transaction WHERE ??=? OR ??=?";
    connection.query(
      txns,
      ["Sender", sender, "Receiver", receiver],
      (err, row) => {
        if (err) {
          //   reject(err)
          throw new Error(err);
        }
        resolve(row);
      }
    );
  });
}

function getDetails(sender, receiver) {
  let party = {
    sender: null,
    receiver: null
  };
  return new Promise((resolve, reject) => {
    let query = "SELECT email FROM parties WHERE ??=?";
    connection.query(query, ["PID", sender], (err, row) => {
      if (err) {
        //   reject(err)
        throw new Error(err);
      }
      party.sender = row[0].email;
      // console.log(party);
      // resolve(party);
    });
    connection.query(query, ["PID", receiver], (err, rows) => {
      if (err) {
        throw new Error(err);
      }
      // console.log("Row" + rows);
      party.receiver = rows[0].email;
      resolve(party);
    });
  });
}

function getAName(aid) {
  return new Promise(function (resolve, reject) {
    let aname = "SELECT AName FROM assets WHERE ??=?";
    connection.query(aname, ["AID", aid], (err, rows) => {
      if (err) {
        throw new Error(err);
      }
      // console.log("Row" + rows[0]);
      // party.AName = rows[0].AID;
      resolve(rows[0].AName);
    });
  });
}

function getAssetTxns(aid) {
  return new Promise((resolve, reject) => {
    let txns = "SELECT * FROM transaction WHERE ??=?";
    connection.query(txns, ["AID", aid], (err, row) => {
      if (err) {
        //   reject(err)
        throw new Error(err);
      }
      resolve(row);
    });
  });
}

module.exports = router;
