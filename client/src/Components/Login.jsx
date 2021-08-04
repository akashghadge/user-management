import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom";
// snack bar code
import SnackBarCustom from "./SmallComponents/SnackBarCustom"
// mui
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// react loading
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
		email: "",
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
		const url = "http://localhost:5000/api/admin/in";
		axios.post(url, {
			password: allCurrentData.password,
			email: allCurrentData.email
		})
			.then((data) => {
				let token = data.data.jwt;
				localStorage.setItem("token", token);
				setAllCurrentData({
					password: "",
					email: ""
				})
				setSnackbarObj({ text: `hello ${allCurrentData.email}`, backgroundColor: "green" })
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
									<span className="signINUPText" style={{ marginRight: "2rem" }}>Email</span>
									<input type="text" className="signINUPInputFields" id="email" placeholder="admin@gmail.com" onChange={inputChange} value={allCurrentData.email} required style={{ boxShadow: "none" }}></input>
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
