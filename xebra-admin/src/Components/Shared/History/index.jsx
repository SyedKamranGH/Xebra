import React from "react";
import Table from "../Table/Index";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";

const History = () => {
	let { name, asm, email } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const columns = [
		{
			dataField: "certsNo",
			text: "Certificate",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "holder",
			text: "Holder",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "holderEmail",
			text: "Holder Email",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	// width: "6%",
			// 	// backgroundColor: "peach",
			// },
		},
		{
			dataField: "dateSent",
			text: "Date Sent",
			align: "start",
			sort: true,
			// headerStyle: {
			// 	width: "250px",
			// },
		},
	];

	const products = [
		{
			certsNo: "1239781237",
			holder: "Cinnamon",
			holderEmail: "Cinnamon@ds.com",
			dateSent: "12-09-2022",
		},
		{
			certsNo: "123987734",
			holder: "Greens",
			holderEmail: "Greens@ds.com",
			dateSent: "12-09-2022",
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
						CERTIFICATES TABLE
						{/* <i class="fa fa-server">&nbsp; USERS ACTIVITY</i> */}
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

					<Paper elevation={1} style={{ marginLeft: 15, width: "75vw" }}>
						<Table columns={columns} products={products}>
							<>
								<Box className="caption font-dark">
									<Typography
										display="flex"
										style={{ color: "#666", fontSize: "16px" }}
										className="caption-subject bold uppercase">
										SENT HISTORY TABLE
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

export default History;
