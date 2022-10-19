import { Button } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

	const backToLogin = () => {
		navigate("login");
	};
	return (
		<>
			{/* <h1>Page Not Found</h1> */}
			<div className="login">
				{/* BEGIN LOGO */}
				<div className="logo">
					<a href="mobile_users.html">
						<img src="images/SGI_LOGO.png" alt />{" "}
					</a>
				</div>
				{/* END LOGO */}
				{/* BEGIN LOGIN */}
				<div className="content" align="center">
					<h3 className="title">Page not found.</h3>
					{/* <a
						type="button"
						className="btn white btn-outline btn-circle"
						href="mobile_users.html">
						Back to Home
					</a> */}
					<Button
						variant="outlined"
						onClick={backToLogin}
						className="btn white btn-outline btn-circle">
						Back to Home
					</Button>
				</div>
				{/* END LOGIN */}
				{/* BEGIN COPYRIGHT */}
				<div className="copyright">
					{" "}
					© Xebra Portal By{" "}
					<font color="#ff9900">Aztec Internet Solutions</font>
				</div>
				{/* END COPYRIGHT */}
			</div>
		</>
	);
};

export default PageNotFound;
