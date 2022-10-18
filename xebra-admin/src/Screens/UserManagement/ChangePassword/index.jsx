import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Components/Shared/InputField";
import UserManagement from "../../../Components/layouts/UserManagement";

const ChangePassword = () => {
	const initialValues = {
		newPassword: "",
		confirmPassword: "",
	};
	const validationSchema = Yup.object({
		email: Yup.string().required("Email Required"),
	});

	return (
		<UserManagement>
			<Paper
				elevation={3}
				variant="elevation"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					color: "white",
					backgroundColor: "rgba(99, 95, 95, 0.317)",
				}}
				sx={{
					minWidth: "350px",
					maxWidth: "450px",
					paddingBottom: "25px",
					marginBottom: "25px",
				}}>
				{/* BEGIN LOGIN */}
				<div className="content">
					{/* Begin Formik FORGOT PASSWORD FORM */}
					<Formik
						initialValues={initialValues}
						// validationSchema={validationSchema}
						onSubmit={(values) => console.log(values)}>
						{(formik) => {
							return (
								<Form id="change-password-form" className="login-form">
									<Stack direction="column" sx={{ width: "300px" }}>
										<h3 className="form-title" style={{ textAlign: "start" }}>
											Create new password.
										</h3>
										<div
											id="change-password-form-error"
											className="alert alert-danger display-hide">
											<button className="close" data-close="alert" />
											<span> Invalid input passwords. </span>
										</div>
										<InputField
											name="newPassword"
											type="Password"
											label="New Password"
											autoComplete="off"
											placeholder="New Password"
											id="code-input-forgot-verify"
											className="form-control placeholder-no-fix">
											<i className="fa fa-key" />
										</InputField>
										<InputField
											name="confirmPassword"
											type="password"
											label="Confirm Password"
											autoComplete="off"
											placeholder="Confirm Password"
											id="password-input-forgot-verify"
											className="form-control placeholder-no-fix">
											<i className="fa fa-key" />
										</InputField>

										<div>
											<Button
												id="forgot-btn"
												type="submit"
												variant="contained"
												size="medium"
												className="btn green pull-right"
												sx={{ fontSize: "12px" }}>
												Change Password
											</Button>
										</div>
									</Stack>
								</Form>
							);
						}}
					</Formik>
					{/* End Formik FORGOT PASSWORD FORM */}
				</div>
				{/* END LOGIN */}
			</Paper>
		</UserManagement>
	);
};

export default ChangePassword;
