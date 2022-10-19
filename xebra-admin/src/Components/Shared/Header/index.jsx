import { AppBar, Toolbar } from "@mui/material";
import React from "react";
// import SGI_LOGO_wht from "../../../assets/SGI_LOGO_wht.jpg";
const Header = () => {
	return (
		<>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
				className="page-header navbar navbar-fixed-top">
				{/* BEGIN HEADER INNER */}
				<Toolbar classes="page-header-inner">
					{/* <div className="page-header-inner"> */}
					{/* <Stack
						spacing={2}
						direction="row"
						justifyContent="space-between"
						alignItems="center"> */}
					{/* BEGIN LOGO */}
					<div className="page-logo">
						<img
							src="images/SGI_LOGO_wht.png"
							// src={SGI_LOGO_wht}
							alt="logo"
							className="company-logo-default"
						/>
						<div className="menu-toggler sidebar-toggler">
							<span />
						</div>
					</div>
					{/* END LOGO */}
					{/* BEGIN RESPONSIVE MENU TOGGLER */}
					{/* <a
							href="javascript:;"
							className="menu-toggler responsive-toggler"
							data-toggle="collapse"
							data-target=".navbar-collapse">
							<span />
						</a> */}
					{/* END RESPONSIVE MENU TOGGLER */}
					{/* BEGIN TOP NAVIGATION MENU */}
					<div className="right-header-section">
						<div className="top-menu">
							<ul className="nav navbar-nav pull-right">
								{/* BEGIN USER LOGIN DROPDOWN */}
								{/* DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte */}
								<li className="dropdown dropdown-user">
									<a
										href="javascript:;"
										className="dropdown-toggle"
										data-toggle="dropdown"
										data-hover="dropdown"
										data-close-others="true">
										<img
											alt
											className="img-circle"
											src="images/avatar8_small.jpg"
										/>
										<span
											id="user-info"
											className="username username-hide-on-mobile sbold"
										/>
										<i className="fa fa-angle-down" />
									</a>
									<ul className="dropdown-menu dropdown-menu-default">
										<li className="divider"> </li>
										<li>
											<a id="logout" href="#">
												<i className="icon-logout" /> Log Out
											</a>
										</li>
									</ul>
								</li>
								{/* END USER LOGIN DROPDOWN */}
							</ul>
						</div>
					</div>
					{/* END TOP NAVIGATION MENU */}
					{/* </Stack> */}
					{/* </div> */}
				</Toolbar>
				{/* END HEADER INNER */}
			</AppBar>
		</>
	);
};

export default Header;
