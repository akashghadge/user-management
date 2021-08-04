/**
 * screen for tabs switching
 */
import React, { useState } from "react"
import UserAdd from "./UserAdd"
import UserDisplay from "./UserDisplay"
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    signButton: {
        color: "#0000ff",
        backgroundColor: "white",
        border: "solid 1px #0000ff",
        '&:hover': {
            color: "white",
            backgroundColor: "#220080",
        },
    }

}));
const Screen2 = () => {
    const classes = useStyles();
    let [signButtonState, signButtonSetState] = useState(1);
    function changeButtonSign(e) {
        signButtonSetState(e);
    }
    return (
        <>
            <div className="screen2HeadDiv">
                <h1 className="screen2Head">Admin Dashboard</h1>
            </div>
            <div style={{ textAlign: "center" }}>
                <Button className={classes.signButton} name="signup" value="0" onClick={(e) => changeButtonSign(0)}>Add User</Button>
                <Button className={classes.signButton} name="signin" value="1" onClick={(e) => changeButtonSign(1)}>User List</Button>
                {signButtonState === 0 ? <UserAdd></UserAdd> : <UserDisplay></UserDisplay>}
            </div>
        </>
    )
}
export default Screen2;
