import React, { useState } from "react";
import Table from "../Table/Index";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";

const drawerWidth = 240;

const Sidebar = (props) => {
	const { isAdmin, menuItems } = props;
	const [open, setOpen] = useState(false);
	const location = useLocation();

	return (
		<>
			<Drawer
				variant="permanent"
				open={open}
				anchor="left"
				classes={{
					paper: "drawerPaper",
					paperAnchorLeft: "page-sidebar-menu page-header-fixed",
				}}
				sx={{
					width: drawerWidth,
					backgroundColor: "#364150",
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				style={{ zIndex: "-1" }}>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<Typography variant="h5" className="sidebar-header">
						SGI Certificate Portal
					</Typography>
				</Box>

				<Box sx={{ overflow: "auto" }}>
					<List>
						{menuItems.map((item) => (
							<>
								<ListItem
									button
									key={item.text}
									className={location.pathname == item.path ? "active" : null}
									onClick={() =>
										console.log(`List button Click: history.push(${item.path})`)
									}
									sx={{ color: "#b4bcc8", fontSize: "20px" }}>
									<ListItemIcon
										className={item.icon}
										sx={{ color: "#606C7D", minWidth: "40px" }}
									/>
									<ListItemText
										sx={{
											fontSize: "32px",
											fontWeight: "300",
											marginLeft: "unset",
										}}
										classes={{ root: "title" }}>
										<span style={{ fontSize: "14px" }}>{item.text} </span>
									</ListItemText>
								</ListItem>
								<Divider light sx={{ border: "0.5px solid #3d4957" }} />
							</>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default Sidebar;
