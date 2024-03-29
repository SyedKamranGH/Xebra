import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Paper,
	Stack,
	Typography,
	Box,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../Table/Index";
import NewMobileUserDialog from "../../Models/NewMobileUser";

const MobileUser = () => {
	let { userCerts } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const actionItems = () => {
		return (
			<>
				<Stack spacing={1} direction="column" justifyContent="center">
					<button
						name="edit-user-btn"
						id="0"
						type="button"
						className="btn btn-circle btn-icon-only btn-default"
						title="Edit">
						<i className="fa fa-gears"></i>
					</button>
					<button
						name="pause-user-btn"
						data-uid="0"
						type="button"
						className="btn btn-circle btn-icon-only btn-default"
						title="Resend">
						<i className="fa fa-toggle-on"></i>
					</button>
					<button
						name="resend-confirmation"
						// id="0"
						type="button"
						className="btn btn-circle btn-icon-only btn-default"
						title="Resend Confirmation">
						<i className="fa fa-envelope"></i>
					</button>
				</Stack>
			</>
		);
	};
	const certsItem = () => {
		return (
			<button
				title="Certs"
				type="button"
				name="certs-user-btn"
				// onClick={() => console.log("Button Click for certificates ")}
				className="btn btn-circle btn-icon-only btn-default">
				<i className="fa fa-search"></i>
			</button>
		);
	};
	const historyItem = (cell, row) => {
		return (
			<button
				type="button"
				title="History"
				name="history-user-btn"
				className="btn btn-circle btn-icon-only btn-default"
				onClick={() => {
					// console.log(row);
					navigate(`history/${row.name}/${row.id}/${row.email}`);
				}}>
				<i className="fa fa-history"></i>
			</button>
		);
	};
	const referralItem = (cell, row) => {
		return (
			<button
				type="button"
				title="Referral"
				name="referral-user-btn"
				className="btn btn-circle btn-icon-only btn-default"
				onClick={() => {
					// console.log(row);
					navigate(`referral/${row.name}/${row.id}/${row.email}`);
				}}>
				<i className="fa fa-user-plus"></i>
			</button>
		);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			dataField: "id",
			text: "AMS360 #",
			sort: true,
			headerStyle: {
				width: "85px",
			},
		},
		{
			dataField: "name",
			text: "Name",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "certs",
			text: "Certs",
			formatter: certsItem,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					navigate(`certs/${row.name}/${row.id}/${row.email}`);
				},
			},
			headerStyle: {
				width: "65px",
			},
		},
		{
			dataField: "history",
			text: "History",
			formatter: historyItem,
			headerStyle: {
				width: "65px",
			},
		},
		{
			dataField: "referral",
			text: "Referral",
			formatter: referralItem,
			headerStyle: {
				width: "65px",
			},
		},
		{
			dataField: "dateAdded",
			text: "Date Added",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "lastModified",
			text: "Last Modified",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "status",
			text: "Status",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "enabled",
			text: "Enabled",
			sort: true,
			// headerStyle: {
			// 	width: "3%",
			// },
		},
		{
			dataField: "actions",
			text: "Actions",
			formatter: actionItems,
			align: "center",
			headerStyle: {
				width: "65px",
			},
		},
	];

	const products = [
		{
			id: 1,
			name: "luffy",
			email: "luffy@wono.com",
			certs: "Cinnamon",
			history: "Latin",
			referral: "DJ",
			dateAdded: "09-01-2022 10:39 am",
			lastModified: "09-23-2022 11:00 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 2,
			name: "Zoro",
			email: "zoro@wono.com",
			certs: "Greens",
			history: "Japan",
			referral: "Straw hats",
			dateAdded: "09-01-2022 10:36 am",
			lastModified: "09-01-2022 10:36 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 3,
			name: "Nami",
			email: "nami@wono.com",
			certs: "Orange",
			history: "USA",
			referral: "Straw hats",
			dateAdded: "09-01-2022 10:21 am",
			lastModified: "09-01-2022 10:21 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 4,
			name: "luffy",
			email: "luffy@wono.com",
			certs: "Cinnamon",
			history: "Latin",
			referral: "DJ",
			dateAdded: "09-01-2022 10:39 am",
			lastModified: "09-23-2022 11:00 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 5,
			name: "Zoro",
			email: "zoro@wono.com",
			certs: "Greens",
			history: "Japan",
			referral: "Straw hats",
			dateAdded: "09-01-2022 10:36 am",
			lastModified: "09-01-2022 10:36 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 6,
			name: "Nami",
			email: "nami@wono.com",
			certs: "Orange",
			history: "USA",
			referral: "Straw hats",
			dateAdded: "09-01-2022 10:21 am",
			lastModified: "09-01-2022 10:21 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
	];

	return (
		<>
			<Box
				sx={{
					backgroundColor: "white",
					// border: "4px solid",
					marginLeft: "220px",
					marginTop: "-20px",
					padding: "20px",
					display: "flex",
					flexDirection: "column",
					alignContent: "flex-start",
					alignItems: "flex-start",
					justifyContent: "flex-start",
				}}>
				<Stack spacing={2} direction="column" sx={{ paddingTop: "38px" }}>
					<Typography
						variant="h3"
						className="page-title sbold"
						sx={{
							fontSize: "24px",
							display: "flex",
							paddingLeft: "20px",
							marginTop: "60px",
						}}>
						<i /> &nbsp; MOBILE USERS
					</Typography>
					<Stack spacing={2} direction="row" paddingLeft="20px">
						<Button
							type="button"
							variant="outlined"
							className="btn btn-outline btn-circle blue btn-sm"
							onClick={handleClickOpen}
							data-toggle="modal">
							Add new +
						</Button>
						<Divider
							flexItem
							orientation="vertical"
							sx={{ border: "0.6px solid grey" }}
						/>
						<Button
							variant="outlined"
							// href="mobile_users.html"
							className="btn btn-outline btn-circle blue btn-sm"
							// role="button"
						>
							Show all users
						</Button>
					</Stack>

					<Paper elevation={1} style={{ marginLeft: 15, width: "1140px" }}>
						<Table columns={columns} products={products}>
							<>
								<Box className="caption font-dark">
									<i className="fa fa-user" />
									<Typography
										display="flex"
										className="caption-subject bold uppercase">
										Users
									</Typography>
								</Box>
							</>
						</Table>
					</Paper>
				</Stack>
				<NewMobileUserDialog
					// handleDelete={handleDelete}
					handleClose={handleClose}
					open={open}
				/>
			</Box>
		</>
	);
};

export default MobileUser;
