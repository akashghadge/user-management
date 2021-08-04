const { Router } = require("express");
const router = Router();

//models and middlewares  
const User = require("../models/User.model");
const { handleErrors } = require("../helper/handleErrors")
// user addding route
router.post("/add", (req, res) => {
    // geting data from request
    const email = req.body.email;
    const username = req.body.username;
    const mobile = req.body.mobile;
    const address = req.body.address;

    // finding for exiting user if not add it
    try {
        User.find({ email: email })
            .then(async (data) => {
                // if user is exists in user database then return 404 error message
                if (data.length != 0) {
                    res.status(404).json("user already exists!!");
                }
                else {
                    let newUser = new User({
                        email: email,
                        username: username,
                        mobile: mobile,
                        address: address
                    });
                    newUser.save()
                        .then((saveUser) => {
                            res.status(202).json("user created succefully");
                            console.log(saveUser);
                        })
                        .catch((err) => {
                            res.status(404).json(err);
                            // console.log(err);
                        })
                }
            }).catch((err) => {
                console.log("err", err);
            })
    }
    catch (err) {
        let error = handleErrors(err);;
        console.log(error);
        res.status(404).json(error);
    }

})
router.post("/delete", async (req, res) => {

    const id = req.body.id;
    try {
        let data = await User.findByIdAndDelete(id);
        res.status(200).json("deleted succefully");
    }
    catch (err) {
        res.status(505).json(
            {
                m: "error occured fetching users"
            }
        )
    }
})
router.get("/all", async (req, res) => {
    try {
        let users = await User.find({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(505).json(
            {
                m: "error occured fetching users"
            }
        )
    }
})
module.exports = router;
