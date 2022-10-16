import * as yup from "yup";

export const loginSchema = yup.object().shape({
	email: yup.string().email("Please provide valid Email Address").required(),
	password: yup.string().required(),
});

export const changePasswordSchema = yup.object().shape({
	currentPassword: yup.string().min(6, "Short Password ").required(),
	newPassword: yup.string().required(),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
export const restPasswordSchema = yup.object().shape({
	vitrificationCode: yup.string().min(4, "Invalid Code ").required(),
	newPassword: yup.string().required(),
});

export const forgotPasswordSchema = yup.object().shape({
	email: yup.string().email("Please provide valid Email Address").required(),
});
