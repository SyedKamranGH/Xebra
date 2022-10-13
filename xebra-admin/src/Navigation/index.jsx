import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Components/layouts/AdminBoard";
import UserLayout from "../Components/layouts/UserBoard";
import UserManagement from "../Components/layouts/UserManagement";
import AdminMobileUser from "../Screens/Admin/MobileUser";
import AdminSystemAccounts from "../Screens/Admin/SystemAccounts";
import MobileUser from "../Screens/User/MobileUser";
import ChangePassword from "../Screens/UserManagement/ChangePassword";
import ForgotPassword from "../Screens/UserManagement/ForgotPassword";
import Home from "../Screens/UserManagement/Home";
import Login from "../Screens/UserManagement/Login";
import RestPassword from "../Screens/UserManagement/ResetPassword";

const Navigation = () => {
	return (
		<Routes>
			<Route path="/" element={<UserManagement />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="forgotPassword" element={<ForgotPassword />} />
				<Route path="restPassword" element={<RestPassword />} />
				<Route path="changePassword" element={<ChangePassword />} />
			</Route>
			<Route path="admin" element={<AdminLayout />}>
				<Route index element={<AdminMobileUser />} />
				<Route path="accounts" element={<AdminSystemAccounts />} />
			</Route>
			<Route path="user" element={<UserLayout />}>
				<Route index element={<MobileUser />} />
			</Route>
		</Routes>
	);
};

export default Navigation;
