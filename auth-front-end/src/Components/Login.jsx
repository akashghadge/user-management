import React, { useState } from "react"
import axios from "axios"
import { useHistory, NavLink } from "react-router-dom";
// mui
// snack bar code
import SnackBarCustom from "./SmallComponents/SnackBarCustom"
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ReactLoading from "react-loading"
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
const Login = () => {
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
		username: "",
		password: ""
	});
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


	function SendUser(event) {
		event.preventDefault()
		setLoading(true);
		const url = "http://localhost:5000/api/user/in";
		axios.post(url, {
			username: allCurrentData.username,
			password: allCurrentData.password
		})
			.then((data) => {
				let token = data.data.jwt;
				localStorage.setItem("token", token);
				setAllCurrentData({
					username: "",
					password: ""
				})
				setSnackbarObj({ text: `hello ${allCurrentData.username}`, backgroundColor: "green" })
				setOpen(true);
				setLoading(false);
				history.push("/user-add");
			})
			.catch((err) => {
				// axios error or some bug isssue
				setSnackbarObj({ text: err.response.data, backgroundColor: "red" })
				setOpen(true);
				setLoading(false);
			})

	}

	return (
		<>
			<div className="signINHeadDiv">
				<h1 className="signINUPHead">Sign In</h1>
			</div>
			{
				loading ? <>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<ReactLoading type={"bubbles"} color={"black"} height={"10%"} width={"10%"}></ReactLoading>
					</div>
				</> :
					<>
						<div className="containerSignIN">
							<div className="widthSignIn" style={{ wordSpacing: "10px" }}>
								<div className="allignCenterSignIN">
									<span className="signINUPText">Username</span>
									<input type="text" className="signINUPInputFields" id="username" placeholder="akash@3" onChange={inputChange} value={allCurrentData.username} required style={{ boxShadow: "none" }}></input>
								</div>
								<div className="allignCenterSignIN">
									<span className="signINUPText">Password</span>
									<input type="password" className="signINUPInputFields" id="password" onChange={inputChange} value={allCurrentData.password} required style={{ boxShadow: "none" }}></input>
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

export default Login;
