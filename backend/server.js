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
require("./DB/conn");


// api routers
const User = require("./routes/User.route");
const Admin = require("./routes/Admin.route");
// routes setting
app.use("/api/user", User);
app.use("/api/admin", Admin);

app.listen(port, () => {
    console.log("Server is listening on port ", port);
})