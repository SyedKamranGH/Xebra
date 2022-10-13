import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import Sidebar from "../../Shared/Sidebar";
import Table from "../../Shared/Table/Index";

const AdminLayout = (props) => {
	const menuItems = [
		{
			text: "Mobile User",
			// icon: <AdbIcon />,
			icon: "fa fa-android",
			path: "/",
		},
		{
			text: "System Accounts",
			// icon: <AccountBalanceOutlinedIcon />,
			icon: "fa fa-database",
			path: "/",
		},
		{
			text: "Bank Bridge",
			// icon: <AccountBalanceOutlinedIcon />,
			icon: "fa fa-bank",
			path: "/",
		},
		{
			text: "User Activity",
			// icon: <AdbIcon />,
			icon: "fa fa-users",
			path: "/",
		},
	];
	return (
		<Box sx={{ display: "flex" }}>
			<Header />
			{/* <CssBaseline /> */}

			<div className="page-container">
				<div className="page-sidebar-wrapper">
					<Sidebar menuItems={menuItems} />
					<Outlet />
					<Footer />
				</div>
			</div>
		</Box>
	);
};

export default AdminLayout;
