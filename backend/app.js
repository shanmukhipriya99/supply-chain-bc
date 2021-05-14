//Importing packages
const express = require("express");
const cors = require("cors");
require("./db/db");

const app = express();
const port = process.env.PORT || 8080;

//Importing routes
const users = require("./routes/users");
const list = require("./routes/list");

//Importing middleware
app.use(cors());
app.use(express.json());
app.use(users);
app.use(list);

//Listening...
app.listen(port, () => {
    console.log("Serving on port " + port);
});
