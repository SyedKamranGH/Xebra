import React from "react";
import { Box } from "@mui/material";
import Header from "../../Shared/Header";
import Sidebar from "../../Shared/Sidebar";
import "./style.css";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer";

const UserLayout = () => {
	const menuItems = [
		{
			text: "Mobile User",
			// icon: <AdbIcon />,
			icon: "fa fa-android",
			path: "/user",
		},
		{
			text: "Bank Bridge",
			// icon: <AccountBalanceOutlinedIcon />,
			icon: "fa fa-bank",
			path: "/user/bank",
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

export default UserLayout;
