import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../../Errors/TextError";

const InputField = (props) => {
	const { label, name, id, children, ...rest } = props;
	return (
		<>
			<div className="form-group">
				<label htmlFor={name} className="control-label visible-ie8 visible-ie9">
					{label}
				</label>
				<div className="input-icon">
					{/* <i className="fa fa-user" /> */}
					{children}
					<Field id={id} name={name} {...rest} />
				</div>
				<div className="error">
					<ErrorMessage name={name} component="error" className="error" />
				</div>
			</div>
		</>
	);
};

export default InputField;
