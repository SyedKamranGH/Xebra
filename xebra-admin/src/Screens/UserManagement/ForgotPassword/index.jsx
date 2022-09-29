import React from "react";
import { Button, Paper, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Components/Shared/InputField";

const ForgotPassword = () => {
	const initialValues = {
		email: "",
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
					backgroundColor: "rgba(99, 95, 95, 0.317)",
				}}
				sx={{ minWidth: "350px", maxWidth: "450px", paddingBottom: "25px" }}>
				{/* BEGIN LOGIN */}
				<div className="content">
					{/* Begin Formik FORGOT PASSWORD FORM */}
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values) => console.log(values)}>
						{(formik) => {
							return (
								<Form id="forget-form" className="forget-form">
									<Stack direction="column" sx={{ width: "300px" }}>
										<h3 className="form-title">Forget Password ?</h3>
										<p
											style={{
												paddingLeft: "5px",
												paddingRight: "5px",
												wordBreak: "break-word",
											}}>
											Enter your e-mail address below to reset your password.
										</p>

										<InputField
											name="email"
											type="email"
											label="Email"
											autoComplete="off"
											placeholder="Email"
											id="email-input-forget"
											className="form-control placeholder-no-fix">
											<i className="fa fa-envelope" />
										</InputField>

										<Stack
											sx={{ display: "flex", justifyContent: "space-between" }}
											direction={{ xs: "column", sm: "row" }}
											className="form-actions">
											<Button
												id="back-btn"
												type="button"
												variant="outline"
												size="large"
												className="btn red btn-outline"
												sx={{ fontSize: "12px" }}>
												Back
											</Button>
											<Button
												id="forgot-btn"
												type="submit"
												variant="contained"
												size="large"
												className="btn green pull-right"
												sx={{ fontSize: "12px" }}>
												Submit
											</Button>
										</Stack>
									</Stack>
								</Form>
							);
						}}
					</Formik>
					{/* End Formik FORGOT PASSWORD FORM */}
				</div>
				{/* END LOGIN */}
			</Paper>
		</>
	);
};

export default ForgotPassword;
