import React from "react";
import { Routes, Route } from "react-router-dom";
import UserManagement from "../Components/layouts/UserManagement";
import ForgotPassword from "../Screens/UserManagement/ForgotPassword";
import Home from "../Screens/UserManagement/Home";
import Login from "../Screens/UserManagement/Login";

const Navigation = () => {
	return (
		<Routes>
			<Route path="/" element={<UserManagement />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="forgotPassword" element={<ForgotPassword />} />
			</Route>
		</Routes>
	);
};

export default Navigation;
