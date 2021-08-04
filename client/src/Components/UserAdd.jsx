import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory, NavLink } from "react-router-dom";
// mui
// snack bar code
import SnackBarCustom from "./SmallComponents/SnackBarCustom"
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ReactLoading from "react-loading"
// style for material ui button
const useStyles = makeStyles((theme) => ({
    profileButtonFollow: {
        color: "#0000ff",
        backgroundColor: "white",
        border: "solid 1px #0000ff",
        margin: "2rem",
        '&:hover': {
            color: "white",
            backgroundColor: "#2222ff",
        },
    }
}));
const UserAdd = () => {
    //states
    const classes = useStyles();
    let [snackbarObj, setSnackbarObj] = useState({
        text: "hello world",
        backgroundColor: "black"
    });
    let [loading, setLoading] = useState(false);
    let [open, setOpen] = useState(false);
    function handleClickCloseSnackBar() {
        setOpen(false);
    }
    let history = useHistory();
    let [allCurrentData, setAllCurrentData] = useState({
        email: "",
        mobile: "",
        username: "",
        address: ""
    });
    // input change function
    function inputChange(event) {
        const { id, value } = event.target
        // console.log(id, value);
        setAllCurrentData((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }
    // email valdation
    function validateEmail() {
        var re = /\S+@\S+\.\S+/;
        return re.test(allCurrentData.email);
    }
    // main validation
    function validateMain() {
        if (!validateEmail()) {
            setSnackbarObj({ text: "Invalid Email", backgroundColor: "red" })
            setOpen(true);
            return false;
        }
        else if (allCurrentData.mobile.length != 10) {
            setSnackbarObj({ text: "Invalid Mobile Number", backgroundColor: "red" })
            setOpen(true);
            return false;
        }
        else if (allCurrentData.username.length < 3) {
            setSnackbarObj({ text: "Username must contain more than 3 letters", backgroundColor: "red" })
            setOpen(true);
            return false;
        }
        else if (allCurrentData.address.length < 3) {
            setSnackbarObj({ text: "Address must contain more than 3 letters", backgroundColor: "red" })
            setOpen(true);
            return false;
        }
        return true;
    }
    // useeffect for verifing the admin
    useEffect(() => {
        let token = localStorage.getItem("token");
        const urlProfileDetails = "/api/admin/verify";
        axios.post(urlProfileDetails, { token: token })
            .then((data) => {
                console.log("verified");
            })
            .catch((err) => {
                history.push("/");
            })
    }, []);
    // user adding function
    function SendUser(event) {
        event.preventDefault()
        // validation
        if (validateMain()) {
            console.log("valid");
        }
        else {
            return console.log("not valid");
        }
        // add user api
        setLoading(true);
        const url = "/api/user/add";
        axios.post(url, {
            mobile: parseInt(allCurrentData.mobile),
            email: allCurrentData.email,
            username: allCurrentData.username,
            address: allCurrentData.address
        })
            .then((data) => {
                setSnackbarObj({ text: `${allCurrentData.username} is added succefully !!!!`, backgroundColor: "green" })
                setAllCurrentData({
                    email: "",
                    mobile: "",
                    username: "",
                    address: ""
                })
                setOpen(true);
                setLoading(false);
            })
            .catch((err) => {
                // axios error or some bug isssue
                setSnackbarObj({ text: "User already exists !!!!", backgroundColor: "red" })
                console.log(err);
                setOpen(true);
                setLoading(false);
            })
    }

    return (
        <>
            {
                loading ? <>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ReactLoading type={"bubbles"} color={"black"} height={"10%"} width={"10%"}></ReactLoading>
                    </div>
                </> :
                    <>
                        <div className="containerSignIN" style={{ marginTop: "5rem" }}>
                            <div className="widthSignIn" style={{ wordSpacing: "10px" }}>
                                <div className="allignCenterSignIN">
                                    <span className="UserAddINUPText" style={{ marginRight: "1.5rem" }}>Email:</span>
                                    <input type="text" className="UserAddedINUPInputFields" id="email" placeholder="admin@gmail.com" onChange={inputChange} value={allCurrentData.email} required style={{ boxShadow: "none" }}></input>
                                </div>
                                <div className="allignCenterSignIN">
                                    <span className="UserAddINUPText" style={{ marginRight: "1rem" }}>Mobile:</span>
                                    <input type="number" className="UserAddedINUPInputFields" id="mobile" placeholder="10 digit" onChange={inputChange} value={allCurrentData.mobile} required style={{ boxShadow: "none" }}></input>
                                </div>
                                <div className="allignCenterSignIN">
                                    <span className="UserAddINUPText">Username:</span>
                                    <input type="text" className="UserAddedINUPInputFields" id="username" placeholder="e.g akash" onChange={inputChange} value={allCurrentData.username} required style={{ boxShadow: "none" }}></input>
                                </div>
                                <div className="allignCenterSignIN">
                                    <span className="UserAddINUPText" style={{ marginRight: "1rem" }}>Address:</span>
                                    <input type="text" placeholder="e.g at post.." className="UserAddedINUPInputFields" id="address" onChange={inputChange} value={allCurrentData.address} required style={{ boxShadow: "none" }}></input>
                                </div>
                            </div>
                            <div className="allignCenterSignIN">
                                <Button id="addContactUs" className={classes.profileButtonFollow} onClick={SendUser}>Save</Button>
                            </div>
                        </div>

                        {/* snackbar */}
                        <SnackBarCustom vertical="top" horizontal="right" backgroundColor={snackbarObj.backgroundColor} color="white" open={open}
                            text={snackbarObj.text} handleClickCloseSnackBar={handleClickCloseSnackBar} />
                    </>
            }
        </>
    );
}

export default UserAdd;
