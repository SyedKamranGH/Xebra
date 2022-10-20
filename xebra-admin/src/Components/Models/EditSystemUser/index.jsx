import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditSystemUser = ({ open, handleClose }) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ top: "7%" }}>
				<DialogTitle id="alert-dialog-title">
					<i className="fa fa-server" />
					<span className="caption-subject font-dark sbold uppercase">
						EDIT SYSTEM USER
					</span>
				</DialogTitle>
				<DialogContent>
					<form
						id="new-admin-user-form"
						className="form-horizontal"
						role="form">
						<div className="form-body">
							<div className="form-group">
								<label className="col-md-3 control-label">Group</label>
								<div className="col-md-9">
									<select id="group-selection" className="form-control">
										<option>Admin</option>
										<option>Agent</option>
									</select>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">First name</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="First Name"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Middle name</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="Middle Name"
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Last name</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="Last Name"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Username/Email</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-envelope" />
										</span>
										<input
											type="email"
											className="form-control"
											placeholder="Email Address"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group signature">
								<label
									className="col-md-3 control-label"
									htmlFor="inputFileNewUser">
									Signature
								</label>
								<div className="col-md-9" id="userSignature">
									No Signature File Selected
								</div>
								<div className="col-md-9">
									<img
										className="signature-noimage"
										id="userSignDisplay"
										src="#"
										hidden
									/>
								</div>
							</div>
							<div className="form-group signature">
								<label
									className="col-md-3 control-label"
									htmlFor="inputFileNewUser"
								/>
								<div className="col-md-9">
									<input type="file" id="inputFileNewUser" accept=".png" />
									<p className="help-block">
										Chose .jpg or .png signature file
									</p>
								</div>
							</div>
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Update
					</Button>
					<Button variant="outlined" onClick={handleClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditSystemUser;
