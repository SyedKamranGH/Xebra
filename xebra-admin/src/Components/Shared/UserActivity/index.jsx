import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
// import DateRangeComp from "../DateRangeComp";
import Table from "../Table/Index";

const UserActivity = () => {
	const columns = [
		{
			dataField: "name",
			text: "Name",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "userType",
			text: "User Type",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "username",
			text: "Username",
			sort: true,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "action",
			text: "Action",
			sort: true,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "recordType",
			text: "Record Type",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "record",
			text: "Record",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "recordIdSub",
			text: "Record id/sub",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "date",
			text: "Date",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "clientIP",
			text: "Client IP",
			sort: true,
			// headerStyle: {
			// 	width: "3%",
			// },
		},
	];

	const products = [
		{
			name: "luffy",
			userType: 1,
			username: "luffy@wono.com",
			action: "Cinnamon",
			recordType: "Latin",
			record: "DJ",
			recordIdSub: "09-01-2022 10:39 am",
			date: "09-23-2022 11:00 am",
			clientIP: "Active",
		},
		{
			name: "Zoro",
			userType: 2,
			username: "zoro@wono.com",
			action: "Greens",
			recordType: "Japan",
			record: "Straw hats",
			recordIdSub: "09-01-2022 10:36 am",
			date: "09-01-2022 10:36 am",
			clientIP: "Active",
		},
		{
			name: "Nami",
			userType: 3,
			username: "nami@wono.com",
			action: "Orange",
			recordType: "USA",
			record: "Straw hats",
			recordIdSub: "09-01-2022 10:21 am",
			date: "09-01-2022 10:21 am",
			clientIP: "Active",
		},
		{
			name: "luffy",
			userType: 4,
			username: "luffy@wono.com",
			action: "Cinnamon",
			recordType: "Latin",
			record: "DJ",
			recordIdSub: "09-01-2022 10:39 am",
			date: "09-23-2022 11:00 am",
			clientIP: "Active",
		},
		{
			name: "Zoro",
			userType: 5,
			username: "zoro@wono.com",
			action: "Greens",
			recordType: "Japan",
			record: "Straw hats",
			recordIdSub: "09-01-2022 10:36 am",
			date: "09-01-2022 10:36 am",
			clientIP: "Active",
		},
		{
			name: "Nami",
			userType: 6,
			username: "nami@wono.com",
			action: "Orange",
			recordType: "USA",
			record: "Straw hats",
			recordIdSub: "09-01-2022 10:21 am",
			date: "09-01-2022 10:21 am",
			clientIP: "Active",
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
				<Stack
					spacing={2}
					direction="column"
					sx={{ paddingTop: "38px", width: "1200px" }}>
					<Typography
						variant="h3"
						className="page-title sbold"
						sx={{
							fontSize: "24px",
							display: "flex",
							paddingLeft: "20px",
							marginTop: "60px",
						}}>
						<i class="fa fa-server">&nbsp; USERS ACTIVITY</i>
					</Typography>
					<Box>{/* <DateRangeComp /> */}</Box>

					<Paper elevation={1} style={{ marginLeft: 15 }}>
						<Table columns={columns} products={products}>
							<>
								<Box className="caption font-dark">
									<i className="fa fa-user" />
									<Typography
										display="flex"
										className="caption-subject bold uppercase">
										Activity
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

export default UserActivity;
