import React from "react";

const Login = () => {
	return (
		<div className="login">
			{/* BEGIN LOGO */}
			<div className="logo">
				<a href="index.html">
					<img src="images/SGI_LOGO.png" alt />
				</a>
			</div>
			{/* END LOGO */}
			{/* BEGIN LOGIN */}
			<div className="content">
				{/* BEGIN LOGIN FORM */}
				<form id="login-form" className="login-form">
					<h3 className="form-title">Login to your account</h3>
					<div
						id="login-form-error"
						className="alert alert-danger display-hide">
						<button className="close" data-close="alert" />
						<span> Invalid Email or Password. Please try again. </span>
					</div>
					<div
						id="login-form--disabled-error"
						className="alert alert-danger display-hide">
						<button className="close" data-close="alert" />
						<span>
							{" "}
							User account disabled. Please contact customer support.{" "}
						</span>
					</div>
					<div className="form-group">
						{/*ie8, ie9 does not support html5 placeholder, so we just show field title for that*/}
						<label className="control-label visible-ie8 visible-ie9">
							Email
						</label>
						<div className="input-icon">
							<i className="fa fa-user" />
							<input
								id="email-input-login"
								className="form-control placeholder-no-fix"
								type="email"
								autoComplete="off"
								placeholder="Email"
								name="email"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label visible-ie8 visible-ie9">
							Password
						</label>
						<div className="input-icon">
							<i className="fa fa-lock" />
							<input
								id="password-input-login"
								className="form-control placeholder-no-fix"
								type="password"
								autoComplete="off"
								placeholder="Password"
								name="password"
							/>
						</div>
					</div>
					<div className="form-actions">
						<label className="rememberme mt-checkbox mt-checkbox-outline">
							<input type="checkbox" name="remember" defaultValue={1} />{" "}
							Remember me
							<span />
						</label>
						<input
							id="submit-btn"
							type="submit"
							className="btn green pull-right"
							defaultValue="Login"
						/>
					</div>
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
				</form>
				{/* END LOGIN FORM */}
				{/* BEGIN FORGOT PASSWORD FORM */}
				<form id="forget-form" className="forget-form">
					<h3>Forget Password ?</h3>
					<p> Enter your e-mail address below to reset your password. </p>
					<div className="form-group">
						<div className="input-icon">
							<i className="fa fa-envelope" />
							<input
								id="email-input-forget"
								className="form-control placeholder-no-fix"
								type="email"
								autoComplete="off"
								placeholder="Email"
								name="email"
							/>
						</div>
					</div>
					<div className="form-actions">
						<button type="button" id="back-btn" className="btn red btn-outline">
							Back{" "}
						</button>
						<button
							id="forgot-btn"
							type="submit"
							className="btn green pull-right">
							{" "}
							Submit{" "}
						</button>
					</div>
				</form>
				{/* END FORGOT PASSWORD FORM */}
				{/* BEGIN FORGOT VERIFY PASSWORD FORM */}
				<form
					id="forget-verify-form"
					className="forget-form"
					action="index.html"
					method="post">
					<h3>Confirmation Code and New Password.</h3>
					<p> Enter your confirmation code and enter your new password.</p>
					<div className="form-group">
						<div className="input-icon">
							<i className="fa fa-envelope" />
							<input
								id="code-input-forgot-verify"
								className="form-control placeholder-no-fix"
								type="text"
								autoComplete="off"
								placeholder="Verification Code"
								name="verificationCode"
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-icon">
							<i className="fa fa-lock" />
							<input
								id="password-input-forgot-verify"
								className="form-control placeholder-no-fix"
								type="password"
								autoComplete="off"
								placeholder="New Password"
								name="newChangePassword"
							/>
						</div>
					</div>
					<div className="form-actions">
						<button
							type="button"
							id="back-verify-btn"
							className="btn red btn-outline">
							Back{" "}
						</button>
						<button
							id="forgot-verify-btn"
							type="submit"
							className="btn green pull-right">
							{" "}
							Submit{" "}
						</button>
					</div>
				</form>
				{/* END FORGOT VERIFY PASSWORD FORM */}
				{/* BEGIN CHANGE PASSWORD FORM */}
				<form id="change-password-form" className="login-form">
					<h3 className="form-title">Create new password.</h3>
					<div
						id="change-password-form-error"
						className="alert alert-danger display-hide">
						<button className="close" data-close="alert" />
						<span> Invalid input passwords. </span>
					</div>
					<div className="form-group">
						{/*ie8, ie9 does not support html5 placeholder, so we just show field title for that*/}
						<label className="control-label visible-ie8 visible-ie9">
							New Password
						</label>
						<div className="input-icon">
							<i className="fa fa-key" />
							<input
								id="change-password1"
								className="form-control "
								type="password"
								placeholder="New Password"
								name="change-password1"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label visible-ie8 visible-ie9">
							Confirm Password
						</label>
						<div className="input-icon">
							<i className="fa fa-key" />
							<input
								id="change-password2"
								className="form-control "
								type="password"
								placeholder="Confirm Password"
								name="change-password2"
							/>
						</div>
					</div>
					<div className="form-actions">
						<input
							id="change-password-form-submit-btn"
							type="submit"
							className="btn green pull-right"
							defaultValue="Change Password"
						/>
					</div>
				</form>
				{/* END CHANGE PASSWORD FORM */}
			</div>
			{/* END LOGIN */}
		</div>
	);
};

export default Login;
