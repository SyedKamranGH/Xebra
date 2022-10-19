import React from "react";
import Table from "../Table/Index";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";

const ReferralHistory = () => {
	let { name, asm, email } = useParams();

	const columns = [
		{
			dataField: "dateReferred",
			text: "Date Referred",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "name",
			text: "Name",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "email",
			text: "Email",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "phone",
			text: "Phone",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "serviceNeeded",
			text: "Service Needed",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "status",
			text: "Status",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "lastUpdatedDate",
			text: "Last Updated Date",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	width: "250px",
			// },
		},
		{
			dataField: "action",
			text: "Action",
			align: "start",
			// sort: true,
			headerStyle: {
				width: "65px",
			},
		},
	];

	const products = [
		{
			dateReferred: "23-09-2022",
			name: "Cinnamon",
			email: "Cinnamon@ds.com",
			dateSent: "12-09-2022",
			phone: "1239781237",
			serviceNeeded: "Cinnamon",
			status: "Cinnamon@ds.com",
			lastUpdatedDate: "12-09-2022",
		},
		{
			dateReferred: "13-09-2022",
			name: "Greens",
			email: "Greens@ds.com",
			dateSent: "12-09-2022",
			phone: "123987734",
			serviceNeeded: "Greens",
			status: "Greens@ds.com",
			lastUpdatedDate: "12-09-2022",
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
						<i class="fa fa-file-text-o"> </i> &nbsp; REFERRAL HISTORY
					</Typography>
					{/* <Box>{console.log(userCerts)}</Box> */}
					<Stack spacing={4} direction="row" paddingLeft="20px">
						<Typography
							variant="h6"
							id="mobile-user-details"
							sx={{
								fontSize: "14px",
								display: "flex",
								color: "#696969",
							}}>
							MOBILE USER :<strong> {name} </strong>
						</Typography>
						<Divider
							flexItem
							orientation="vertical"
							sx={{ border: "0.6px solid grey" }}
						/>
						<Typography
							variant="h6"
							id="mobile-user-details"
							sx={{
								fontSize: "14px",
								display: "flex",
								color: "#696969",
							}}>
							AMS360 Account: <strong> {asm} </strong>
						</Typography>
						<Divider
							flexItem
							orientation="vertical"
							sx={{ border: "0.6px solid grey" }}
						/>
						<Typography
							variant="h6"
							id="mobile-user-details"
							sx={{
								fontSize: "14px",
								display: "flex",
								color: "#696969",
							}}>
							Username : <strong> {email} </strong>
						</Typography>
					</Stack>
					<Stack spacing={2} direction="row" paddingLeft="20px">
						<Button
							type="button"
							variant="outlined"
							className="btn btn-outline btn-circle blue btn-sm"
							data-toggle="modal">
							Add new +
						</Button>
					</Stack>
					<Paper elevation={1} style={{ marginLeft: 15, width: "85vw" }}>
						<Table columns={columns} products={products}>
							<>
								<Box className="caption font-dark">
									<Typography
										display="flex"
										style={{ color: "#666", fontSize: "16px" }}
										className="caption-subject bold uppercase">
										REFERRAL HISTORY TABLE
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

export default ReferralHistory;
