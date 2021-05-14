//Importing packages
const express = require("express");
const cors = require("cors");
require("./db/db");

const app = express();
const port = process.env.PORT || 8080;

//Importing routes
const parties = require("./routes/parties");
const list = require("./routes/list");
const assets = require("./routes/assets");

//Importing middleware
app.use(cors());
app.use(express.json());
app.use(parties);
app.use(list);
app.use(assets);

//Listening...
app.listen(port, () => {
    console.log("Serving on port " + port);
});
