const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verify = require("../middleware/verify");
//models and middlewares  
const Admin = require("../models/Admin.model");

router.post("/in", async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    // getting user data
    const user = await Admin.findOne({ email: email });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            /**
             *issuesing the token
             */
            let payload = {
                email: email,
                id: user._id
            }

            //create the access token with the shorter lifespan
            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
            console.log(email, "has sign in");
            res.status(200).json({
                "jwt": accessToken
            })
        }
        else {
            console.log("invalid password");
            res.status(400).json("invalid password");
        }
    } else {
        console.log("invalid email");
        res.status(401).json("invalid email");
    }
})
router.post("/verify", verify, (req, res) => {
    res.status(200).json({
        username: res.locals.username,
        id: res.locals.id
    });
})
// user addding route
router.post("/add", (req, res) => {
    // geting data from request
    const email = req.body.email;
    const password = req.body.password;

    // finding for exiting user if not add it
    try {
        Admin.find({ email: email })
            .then(async (data) => {
                // if user is exists in user database then return 404 error message
                if (data.length != 0) {
                    return res.status(404).json("admin already exists!!");
                }
                let newAdmin = Admin({
                    email: email,
                    password: password
                });
                newAdmin.save()
                    .then((newUser) => {
                        res.status(202).json(newUser);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(404).json(error);
                    })
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json(error);

            })
    } catch (err) {
        let error = handleErrors(err);;
        console.log(error);
        res.status(404).json(error);
    }

})


module.exports = router;
