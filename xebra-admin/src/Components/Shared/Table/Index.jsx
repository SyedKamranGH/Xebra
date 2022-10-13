import { Card, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const Table = () => {
	const actionItems = () => {
		return (
			<>
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
			headerStyle: {
				width: "6%",
			},
			sort: true,
		},
		{
			dataField: "name",
			text: "Name",
			sort: true,
		},
		{
			dataField: "certs",
			text: "Certs",
			formatter: certsItem,
		},
		{
			dataField: "history",
			text: "History",
			formatter: historyItem,
		},
		{
			dataField: "referral",
			text: "Referral",
			formatter: referralItem,
		},
		{
			dataField: "dateAdded",
			text: "Date Added",
			sort: true,
		},
		{
			dataField: "lastModified",
			text: "Last Modified",
			sort: true,
		},
		{
			dataField: "status",
			text: "Status",
			sort: true,
		},
		{
			dataField: "enabled",
			text: "Enabled",
			sort: true,
		},
		{
			dataField: "actions",
			text: "Actions",
			formatter: actionItems,
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
	];
	return (
		<>
			{/* <Stack
				spacing={4}
				direction="column"
				sx={{
					marginLeft: "10px",
					border: "1px solid",
					backgroundColor: "white",
				}}> */}
			{/* <div className="row">
				<div className="col-md-12"> */}
			{/* BEGIN EXAMPLE TABLE PORTLET*/}
			<div className="portlet light bordered">
				<div className="portlet-title">
					<div className="caption font-dark">
						<i className="fa fa-user" />
						<span className="caption-subject bold uppercase">Users</span>
					</div>
					<Divider />

					<div className="tools">
						<div className="portlet-body">
							<BootstrapTable
								keyField="id"
								data={products}
								columns={columns}
								headerClasses="heading"
								className="table table-striped table-bordered table-hover"
								id="mob_usrs_tbl"
							/>
						</div>
					</div>
				</div>
			</div>
			{/* END EXAMPLE TABLE PORTLET*/}
			{/* </div>
			</div> */}
			{/* </Stack> */}
		</>
	);
};

export default Table;
