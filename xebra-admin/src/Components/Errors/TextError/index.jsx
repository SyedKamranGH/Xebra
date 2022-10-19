import React from "react";

const TextError = (props) => {
	const { children } = props;
	return (
		<>
			<div id="login-form-error" className="alert alert-danger display-hide">
				{/* <button className="close" data-close="alert" /> */}
				<span>
					{/* Invalid Email or Password. Please try again. */}
					{/* {props.children} */}
					{children}
				</span>
			</div>
		</>
	);
};

export default TextError;
