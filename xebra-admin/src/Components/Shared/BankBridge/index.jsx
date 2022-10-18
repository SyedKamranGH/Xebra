import {
	Box,
	Button,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import Table from "../Table/Index";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
// import "./style.css";

const BankBridge = () => {
	const subColumns = [
		{
			dataField: "id",
			text: "",
			// sort: true,
			headerStyle: {
				width: "36px",
			},
		},
		{
			dataField: "ams",
			text: "AMS 360 No.",
			// sort: true,
			// formatter: certsItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "clientName",
			text: "Client Name",
			// sort: true,
			// formatter: historyItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "cancelDate",
			text: "Cancel Date",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "policies",
			text: "Policies",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "status",
			text: "24/7 Status ",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "mobileStatus",
			text: "Mobile Status",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
	];

	const subProducts = [
		{
			id: "1",
			ams: "luffy@wono.com",
			clientName: "Cinnamon",
			cancelDate: "09-01-2022 10:39 am",
			policies: "Q-1",
			status: "No Account",
			mobileStatus: "Disabled Successfully",
		},
	];
	const expandRow = {
		showExpandColumn: true,
		renderer: (row) => (
			<div>
				<Table
					columns={subColumns}
					products={subProducts}
					headerClasses="subHeader"
					isSubTable={true}
					pagination={null}>
					<Box className="caption font-dark">
						<Typography
							display="flex"
							className="caption-subject bold uppercase">
							Transaction Table :
						</Typography>
						{/* {`This Expand row is belong to rowKey ${row.fileName}`} */}
						{/* <p>{`This Expand row is belong to rowKey ${row.fileName}`}</p> */}
					</Box>
				</Table>
			</div>
		),
	};

	const columns = [
		{
			dataField: "processedBy",
			text: "Processed By",
			sort: true,
			headerStyle: {
				// width: "6%",
				// backgroundColor: "peach",
			},
		},
		{
			dataField: "fileName",
			text: "File Name",
			sort: true,
			// formatter: certsItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "bankName",
			text: "Bank Name",
			sort: true,
			// formatter: historyItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "transactionDate",
			text: "Transaction Date",
			sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
	];

	const products = [
		{
			processedBy: "luffy@wono.com",
			fileName: "Cinnamon",
			bankName: "DJ",
			transactionDate: "09-01-2022 10:39 am",
		},
		{
			processedBy: "zoro@wono.com",
			fileName: "Greens",

			bankName: "Straw hats",
			transactionDate: "09-01-2022 10:36 am",
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
						<i class="fa fa-exchange"></i> &nbsp; BANK BRIDGE
					</Typography>
					<Paper elevation={1} style={{ marginLeft: 15 }}>
						<Table columns={columns} products={products} expandRow={expandRow}>
							<>
								<Box className="caption font-dark">
									{/* <i className="fa fa-user" /> */}
									<Typography
										display="flex"
										className="caption-subject bold uppercase">
										XEBRA CONNECT TRANSACTIONS
									</Typography>
									<div div class="legend">
										Legend: <i class="fa fa-check green"></i> = Success |{" "}
										<i class="fa fa-times red"></i> = Failure |{" "}
										<i class="fa fa-exclamation-triangle orange"></i> =
										Unchanged
									</div>
								</Box>
							</>
						</Table>
					</Paper>
				</Stack>
			</Box>
		</>
	);
};

export default BankBridge;
