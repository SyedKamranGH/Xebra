import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Table from "../Table/Index";

const SystemAccounts = () => {
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
	const columns = [
		{
			dataField: "group",
			text: "Group",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
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
			dataField: "email",
			text: "Email",
			sort: true,
			// formatter: certsItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "added",
			text: "Added",
			// formatter: historyItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "lastModified",
			text: "Last Modified",
			sort: true,
			// formatter: referralItem,
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
			dataField: "actions",
			text: "Actions",
			formatter: actionItems,
			headerStyle: {
				width: "70px",
			},
		},
	];

	const products = [
		{
			id: 1,
			group: "Admin",
			name: "luffy",
			email: "luffy@wono.com",
			history: "Latin",
			referral: "DJ",
			added: "09-01-2022 10:39 am",
			lastModified: "09-23-2022 11:00 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 2,
			group: "Greens",
			name: "Zoro",
			email: "zoro@wono.com",
			history: "Japan",
			referral: "Straw hats",
			added: "09-01-2022 10:36 am",
			lastModified: "09-01-2022 10:36 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 3,
			name: "Nami",
			email: "nami@wono.com",
			group: "Orange",
			history: "USA",
			referral: "Straw hats",
			added: "09-01-2022 10:21 am",
			lastModified: "09-01-2022 10:21 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 4,
			name: "luffy",
			email: "luffy@wono.com",
			group: "Cinnamon",
			history: "Latin",
			referral: "DJ",
			added: "09-01-2022 10:39 am",
			lastModified: "09-23-2022 11:00 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 5,
			name: "Zoro",
			email: "zoro@wono.com",
			group: "Greens",
			history: "Japan",
			referral: "Straw hats",
			added: "09-01-2022 10:36 am",
			lastModified: "09-01-2022 10:36 am",
			status: "Active",
			enabled: "Enabled",
			actions: "",
		},
		{
			id: 6,
			name: "Nami",
			email: "nami@wono.com",
			group: "Orange",
			history: "USA",
			referral: "Straw hats",
			added: "09-01-2022 10:21 am",
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
						<i className="fa fa-server">&nbsp; SYSTEM USERS</i>
					</Typography>
					<Stack spacing={2} direction="row" paddingLeft="20px">
						<Button
							type="button"
							variant="outlined"
							className="btn btn-outline btn-circle blue btn-sm"
							data-toggle="modal">
							Add new +
						</Button>
					</Stack>

					<Paper elevation={1} style={{ marginLeft: 15 }}>
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
			</Box>
		</>
	);
};

export default SystemAccounts;
