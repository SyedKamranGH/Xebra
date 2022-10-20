import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const NewUserReferral = ({ open, handleClose }) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ top: "7%" }}>
				<DialogTitle id="alert-dialog-title">NEW USER REFERRAL</DialogTitle>
				<DialogContent>
					<form id="new-referral-form" className="form-horizontal" role="form">
						<div className="form-body">
							<div className="form-group">
								<label className="col-md-3 control-label">Full name</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											id="full_name"
											name="full_name"
											pattern="^[.&0-9A-Za-z -]+$"
											className="form-control"
											placeholder="Full Name"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Email</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-envelope" />
										</span>
										<input
											type="email"
											id="email"
											name="email"
											className="form-control"
											placeholder="Email Address"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Phone Number</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-phone" />
										</span>
										<input
											type="tel"
											data-inputmask="'mask': '(999) 999-9999'"
											pattern="^\(\d{3}\) \d{3}-\d{4}$"
											id="mobile_phone"
											name="money-inputmask"
											className="form-control"
											placeholder="Phone Number"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="state" className="col-md-3 control-label">
									Service Requested
								</label>
								<div className="col-sm-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-home" />
										</span>
										<select
											className="form-control"
											id="service_requested"
											name="service_requested"
											required>
											<option value="Truck Insurance">Truck Insurance</option>
											<option value="Registration & Permits">
												Registration &amp; Permits
											</option>
											<option value="Business Insurance">
												Business Insurance
											</option>
											<option value="Life & Health">Life &amp; Health</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						type="submit"
						onClick={handleClose}
						autoFocus>
						Submit
					</Button>
					<Button variant="outlined" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="contained"
						type="reset"
						onClick={handleClose}
						autoFocus>
						Reset
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NewUserReferral;
