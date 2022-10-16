import {
	Card,
	Divider,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const Table = () => {
	// const { SearchBar } = Search;

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
				name="certs-user-btn"
				// id="0"
				type="button"
				className="btn btn-circle btn-icon-only btn-default"
				title="Certs">
				<i className="fa fa-search"></i>
			</button>
		);
	};
	const historyItem = () => {
		return (
			<button
				name="history-user-btn"
				// id="0"
				type="button"
				className="btn btn-circle btn-icon-only btn-default"
				title="History">
				<i className="fa fa-history"></i>
			</button>
		);
	};
	const referralItem = () => {
		return (
			<button
				name="referral-user-btn"
				// id="0"
				type="button"
				className="btn btn-circle btn-icon-only btn-default"
				title="Referral">
				<i className="fa fa-user-plus"></i>
			</button>
		);
	};

	const columns = [
		{
			dataField: "id",
			text: "AMS360 #",
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
			dataField: "certs",
			text: "Certs",
			formatter: certsItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "history",
			text: "History",
			formatter: historyItem,
			// headerStyle: {
			// 	width: "2%",
			// },
		},
		{
			dataField: "referral",
			text: "Referral",
			formatter: referralItem,
			// headerStyle: {
			// 	width: "6%",
			// },
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
			// headerStyle: {
			// 	width: "10%",
			// },
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

	const pagination = paginationFactory({
		page: 1,
		sizePerPage: 3,
		// lastPageText: "Last",
		// firstPageText: "First",
		// nextPageText: "Next",
		// prePageText: "Previous",
		showTotal: true,
		// hideSizePerPage: true,
		// alwaysShowAllBtns: false,
		// withFirstAndLast: false,
		// paginationTotalRenderer: customTotal,
		onPageChange: function (page, sizePerPage) {
			console.log("page", page);
			console.log("sizePerPage", sizePerPage);
		},
		onSizePerPageChange: function (page, sizePerPage) {
			console.log("page", page);
			console.log("sizePerPage", sizePerPage);
		},
	});

	return (
		<>
			<div className="portlet light bordered">
				<Stack direction="column" spacing={2} className="portlet-title">
					<Box className="caption font-dark">
						<i className="fa fa-user" />
						<Typography
							display="flex"
							className="caption-subject bold uppercase">
							Users
						</Typography>
					</Box>
					<Divider />

					<Box className="tools">
						<div className="portlet-body">
							<Stack
								direction="row"
								spacing={1}
								justifyContent="flex-end"
								marginBottom={2}>
								<Typography variant="h6" paddingTop={1}>
									Search:{" "}
								</Typography>
								<TextField
									id="input-with-icon-textfield margin-dense"
									// label="TextField"

									// id="margin-dense"
									margin="dense"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{/* <AccountCircle /> */}
												<SearchOutlinedIcon />
											</InputAdornment>
										),
									}}
									variant="outlined"
									size="small"
								/>
							</Stack>
							<BootstrapTable
								keyField="id"
								data={products}
								columns={columns}
								pagination={pagination}
								headerClasses="heading"
								className="table table-striped table-bordered table-hover"
								id="mob_usrs_tbl"
							/>
						</div>
					</Box>
				</Stack>
			</div>
		</>
	);
};

export default Table;
