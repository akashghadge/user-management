import axios from 'axios';
import React, { useState, useEffect } from 'react';
// snack bar code
import SnackBarCustom from "./SmallComponents/SnackBarCustom"
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ReactLoading from "react-loading"
// style for button
const useStyles = makeStyles((theme) => ({
    profileButtonFollow: {
        color: "#ff0000",
        backgroundColor: "white",
        border: "solid 1px #ff0000",
        marginTop: "1rem",
        '&:hover': {
            color: "white",
            backgroundColor: "#ff0000",
        },
    }
}));
const UserDisplay = () => {
    // states
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
    let [allCurrentData, setAllCurrentData] = useState([]);
    // fetching user data
    useEffect(() => {
        const url = "/api/user/all";
        setLoading(true);
        axios.get(url)
            .then((data) => {
                setAllCurrentData(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setSnackbarObj({ text: "Users not fetched !!!", backgroundColor: "red" })
                setOpen(true);
                setLoading(false);
            })
    }, []);
    // delete paritucalr user using users ID
    function clickDelete(e, id) {
        console.log(id);
        let url = "/api/user/delete";
        axios.post(url,
            {
                id: id
            })
            .then((data) => {
                setSnackbarObj({ text: "User deleted succefully !!!", backgroundColor: "green" })
                setOpen(true);
                window.location.reload(true);
            })
            .catch((err) => {
                setSnackbarObj({ text: "User not deleted !!!", backgroundColor: "red" })
                setOpen(true);
            })
    }
    console.log(allCurrentData);
    return (
        <>
            {

                loading ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ReactLoading type={"bubbles"} color={"black"} height={"10%"} width={"10%"}></ReactLoading>
                    </div> :
                    allCurrentData.length == 0 ?
                        <div className="noUserHead">
                            <h1 >No Users...</h1>
                        </div>
                        :
                        <div className="parent">
                            <div className="centerDiv">
                                {

                                    allCurrentData.map((ele, i) => {
                                        return (
                                            <>
                                                <div className="userDiv">
                                                    <div className="userBase">
                                                        <p> <span>Username: </span>{ele.username}</p>
                                                        <p> <span>Email: </span> :{ele.email}</p>
                                                        <p> <span>Mobile No: </span> :{ele.mobile}</p>
                                                        <p> <span>Address: </span> :{ele.address}</p>
                                                        <div style={{ textAlign: "center" }}>
                                                            <Button className={classes.profileButtonFollow} onClick={(e) => { clickDelete(e, ele._id) }}>
                                                                <p className="deleteButton">
                                                                    Delete
                                                                </p>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
            }
            {/* snackbar */}
            <SnackBarCustom vertical="top" horizontal="right" backgroundColor={snackbarObj.backgroundColor} color="white" open={open}
                text={snackbarObj.text} handleClickCloseSnackBar={handleClickCloseSnackBar} />
        </>
    );
}

export default UserDisplay;
