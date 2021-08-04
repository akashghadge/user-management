"use strict";
// inital set up of server
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;



// must needed packages
const cros = require("cors");
require("dotenv").config();


// middlewares
app.use(express.json());
app.use(cros());


// getting db connection
require("./db/conn");


// api routers
const User = require("./routes/User.route");
const Admin = require("./routes/Admin.route");
// routes setting
app.use("/api/user", User);
app.use("/api/admin", Admin);

// // for production use
app.use(express.static("client/build"));
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})


app.listen(port, () => {
    console.log("Server is listening on port ", port);
})