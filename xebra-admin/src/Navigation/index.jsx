import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../Components/Errors/PageNotFound";
import AdminLayout from "../Components/layouts/AdminBoard";
import UserLayout from "../Components/layouts/UserBoard";
import UserManagement from "../Components/layouts/UserManagement";
import AdminBankBridge from "../Screens/Admin/BankBridge";
import AdminMobileUser from "../Screens/Admin/MobileUser";
import AdminSystemAccounts from "../Screens/Admin/SystemAccounts";
import AdminUserActivity from "../Screens/Admin/UserActivity";
import AdminUserCertificates from "../Screens/Admin/UserCertificates";
import AdminAddNewCertificate from "../Screens/Admin/UserCertificates/AddNewCertificate";
import AdminEditCertificate from "../Screens/Admin/UserCertificates/EditCertificate";
import UserBankBridge from "../Screens/User/BankBridge";
import MobileUser from "../Screens/User/MobileUser";
import ChangePassword from "../Screens/UserManagement/ChangePassword";
import ForgotPassword from "../Screens/UserManagement/ForgotPassword";
import Home from "../Screens/UserManagement/Home";
import Login from "../Screens/UserManagement/Login";
import RestPassword from "../Screens/UserManagement/ResetPassword";

const Navigation = () => {
	return (
		<Routes>
			{/* <Route  element={<UserManagement />}> */}
			{/* </Route> */}
			<Route path="*" element={<PageNotFound />} />
			<Route path="/" element={<Home />} />
			<Route path="login" element={<Login />} />
			<Route path="forgotPassword" element={<ForgotPassword />} />
			<Route path="restPassword" element={<RestPassword />} />
			<Route path="changePassword" element={<ChangePassword />} />
			<Route path="admin" element={<AdminLayout />}>
				<Route index element={<AdminMobileUser />} />
				<Route path="accounts" element={<AdminSystemAccounts />} />
				<Route path="bank" element={<AdminBankBridge />} />
				<Route path="activity" element={<AdminUserActivity />} />
				<Route
					path="certs/:name/:asm/:email"
					element={<AdminUserCertificates />}>
					{/* <Route path=":certNo" element={<AdminEditCertificate />} /> */}
				</Route>
				<Route
					path="editCerts/:name/:asm/:email/:certNo"
					element={<AdminEditCertificate />}
				/>
				<Route
					path="addCerts/:name/:asm/:email"
					element={<AdminAddNewCertificate />}
				/>
			</Route>
			<Route path="user" element={<UserLayout />}>
				<Route index element={<MobileUser />} />
				<Route path="bank" element={<UserBankBridge />} />
			</Route>
		</Routes>
	);
};

export default Navigation;
