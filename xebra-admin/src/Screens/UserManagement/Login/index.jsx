import React from "react";
import { Button, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import image1 from "../../../assets/1.jpg";
import image2 from "../../../assets/2.jpg";
import image3 from "../../../assets/3.jpg";
import image4 from "../../../assets/4.jpg";
import image5 from "../../../assets/5.jpg";
import InputField from "../../../Components/Shared/InputField";
import ImageSlider from "../../../Components/Shared/ImageSlider";

import "./style.css";
import { CheckBox } from "@mui/icons-material";
// import Button from "../../../Components/Shared/Button";

const Login = () => {
	const initialValues = {
		email: "",
		password: "",
	};
	const validationSchema = Yup.object({
		email: Yup.string().required("Email Required"),
	});

	return (
		<>
			<Paper
				elevation={3}
				variant="elevation"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					color: "white",
					// backgroundColor: "rgba(0, 0, 0, 0.128)",
					backgroundColor: "rgba(99, 95, 95, 0.317)",
				}}
				sx={{ minWidth: "300px", maxWidth: "450px" }}>
				{/* BEGIN LOGIN */}
				<div className="content">
					{/* BEGIN LOGIN FORM */}
					{/* <form id="login-form" className="login-form"> */}
					{/* <InputField /> */}
					{/*ie8, ie9 does not support html5 placeholder, so we just show field title for that*/}
					{/* </form> */}
					{/* END LOGIN FORM */}

					{/* Begin Formik Login Form */}
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values) => console.log(values)}>
						{(formik) => {
							return (
								<Form
								// id="login-form" className="login-form"
								>
									<h3 className="form-title">Login to your account</h3>
									<div
										id="login-form-error"
										className="alert alert-danger display-hide">
										<button className="close" data-close="alert" />
										<span>Invalid Email or Password. Please try again. </span>
									</div>
									<div
										id="login-form--disabled-error"
										className="alert alert-danger display-hide">
										<button className="close" data-close="alert" />
										<span>
											User account disabled. Please contact customer support.{" "}
										</span>
									</div>
									<InputField
										name="email"
										type="email"
										label="Email"
										autoComplete="off"
										placeholder="Email"
										id="email-input-login"
										className="form-control placeholder-no-fix">
										<i className="fa fa-user" />
									</InputField>
									<InputField
										name="password"
										type="password"
										label="Password"
										autoComplete="off"
										placeholder="Password"
										id="password-input-login"
										className="form-control placeholder-no-fix">
										<i className="fa fa-lock" />
									</InputField>
									<div className="form-actions">
										<label className="rememberme mt-checkbox mt-checkbox-outline">
											<input type="checkbox" name="remember" defaultValue={1} />
											Remember me
											<span />
										</label>
										<Button
											// id="submit-btn"
											type="submit"
											variant="contained"
											size="large"
											className="btn green pull-right"
											sx={{ fontSize: "12px" }}>
											Submit
										</Button>
									</div>
								</Form>
							);
						}}
					</Formik>
					{/* End Formik Login Form */}
					<div className="forget-password">
						<h4>Forgot your password ?</h4>
						<p>
							Click
							<a href="javascript:;" id="forget-password">
								{" "}
								here{" "}
							</a>{" "}
							to reset your password.
						</p>
					</div>
				</div>
				{/* END LOGIN */}
			</Paper>
		</>
	);
};

export default Login;
