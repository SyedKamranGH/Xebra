import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DeleteCertificateDialogBox from "../../Models/DeleteCertificate";
import DeleteHolderDialogBox from "../../Models/DeleteHolder";
import NewHolder from "../../Models/NewHolder";
import Table from "../Table/Index";

const UserCertificates = () => {
	let { name, asm, email } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const [deleteCertsNo, setDeleteCertsNo] = useState();
	const [deleteHolder, setDeleteHolder] = useState();
	const [open, setOpen] = useState(false);
	const [openDeleteCerts, setOpenDeleteCerts] = useState(false);
	const [openDeleteHolder, setOpenDeleteHolder] = useState(false);

	const actionItems = (cell, row) => {
		return (
			<>
				<Stack spacing={1} direction="row" justifyContent="center">
					<button
						name="edit-user-btn"
						id="0"
						type="button"
						className="btn btn-circle btn-icon-only btn-default"
						title="Edit">
						<i className="fa fa-file-pdf-o"></i>
					</button>
					<button
						name="pause-user-btn"
						data-uid="0"
						type="button"
						className="btn btn-circle btn-icon-only btn-default"
						title="Resend">
						<i className="fa fa-envelope"></i>
					</button>
					<button
						name="delete-holder"
						// id="0"
						type="button"
						className="btn btn-circle btn-icon-only btn-default"
						title="Delete Holder"
						onClick={() => {
							console.log(row.holder);
							setDeleteHolder(row.holder);
							handleClickOpenDeleteHolder();
						}}>
						<i className="fa fa-trash"></i>
					</button>
				</Stack>
			</>
		);
	};
	const certsNo = (cell, row) => {
		return (
			<Button
				variant="outlined"
				onClick={() => {
					// Note: Over laping paths from certs and editCerts
					const pathName = location.pathname.replace("certs", "editCerts");
					navigate(`${pathName}/${cell}`);
				}}>
				{cell}
			</Button>
		);
	};
	const certsAction = (cell, row) => {
		return (
			<Stack spacing={1} direction="row">
				<Button variant="outlined" onClick={handleClickOpen}>
					Add Holder
				</Button>
				<Button
					variant="outlined"
					color="error"
					onClick={() => {
						setDeleteCertsNo(row.certsNo);
						handleClickOpenDeleteCerts();
					}}>
					Delete Holder
				</Button>
			</Stack>
		);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpenDeleteHolder = () => {
		setOpenDeleteHolder(true);
	};
	const handleCloseDeleteHolder = () => {
		setOpenDeleteHolder(false);
	};
	const handleClickOpenDeleteCerts = () => {
		setOpenDeleteCerts(true);
	};
	const handleCloseDeleteCerts = () => {
		setOpenDeleteCerts(false);
	};

	const subColumns = [
		{
			dataField: "holder",
			text: "Holder",
			// sort: true,
			// headerStyle: {
			// 	width: "36px",
			// },
		},
		{
			dataField: "email",
			text: "Email",
			// sort: true,
			// formatter: certsItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "phone",
			text: "Phone",
			// sort: true,
			// formatter: historyItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "address",
			text: "Address",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "issueDate",
			text: "Issue Date",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
		{
			dataField: "actions",
			text: "Actions",
			formatter: actionItems,
			align: "center",
			// sort: true,
			// headerStyle: {
			// 	width: "6%",
			// },
		},
	];

	const subProducts = [
		{
			phone: "187217612761",
			email: "luffy@wono.com",
			holder: "Cinnamon",
			issueDate: "09-01-2022 10:39 am",
			address: "Q-1 LA USA",
		},
	];
	const expandRow = {
		showExpandColumn: true,
		onlyOneExpanding: true,
		expandByColumnOnly: true,
		// expandHeaderColumnRenderer:(() => {})

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
							Holder Table :
						</Typography>
					</Box>
				</Table>
			</div>
		),
	};

	const columns = [
		{
			dataField: "certsNo",
			text: "Certificate No",
			formatter: certsNo,
			align: "start",
			sort: true,
			headerStyle: {
				// width: "6%",
				// backgroundColor: "peach",
			},
		},
		{
			dataField: "action",
			text: "Actions",
			formatter: certsAction,
			align: "start",
			// sort: true,
			headerStyle: {
				width: "250px",
			},
		},
	];

	const products = [
		{
			certsNo: "1239781237",
			action: "Cinnamon",
		},
		{
			certsNo: "123987734",
			action: "Greens",
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
					<Stack spacing={2} direction="row" paddingLeft="20px">
						<Button
							type="button"
							variant="outlined"
							onClick={() => {
								// Note: Over laping paths from certs and editCerts
								const pathName = location.pathname.replace("certs", "addCerts");
								navigate(`${pathName}`);
							}}
							className="btn btn-outline btn-circle blue btn-sm"
							data-toggle="modal">
							Add new +
						</Button>
					</Stack>
					<Paper elevation={1} style={{ marginLeft: 15, width: "75vw" }}>
						<Table columns={columns} products={products} expandRow={expandRow}>
							<>
								<Box className="caption font-dark">
									{/* <i className="fa fa-user" /> */}
									<Typography
										display="flex"
										className="caption-subject bold uppercase">
										CERTIFICATES TABLE
									</Typography>
								</Box>
							</>
						</Table>
					</Paper>
				</Stack>
				<NewHolder handleClose={handleClose} open={open} />
				<DeleteCertificateDialogBox
					handleClose={handleCloseDeleteCerts}
					open={openDeleteCerts}
					certNo={deleteCertsNo}
				/>
				<DeleteHolderDialogBox
					handleClose={handleCloseDeleteHolder}
					open={openDeleteHolder}
					holder={deleteHolder}
				/>
			</Box>
		</>
	);
};

export default UserCertificates;
