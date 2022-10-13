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
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Table from "../Table/Index";

const MobileUser = () => {
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

					<Paper elevation={1} style={{ marginLeft: 15, width: "1340px" }}>
						<Table />
					</Paper>
				</Stack>
			</Box>
		</>
	);
};

export default MobileUser;
