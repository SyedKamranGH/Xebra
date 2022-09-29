import React from "react";
import { Routes, Route } from "react-router-dom";
import UserManagement from "../Components/layouts/UserManagement";
import Home from "../Screens/UserManagement/Home";
import Login from "../Screens/UserManagement/Login";

const Navigation = () => {
	return (
		<Routes>
			<Route path="/" element={<UserManagement />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
			</Route>
		</Routes>
	);
};

export default Navigation;
