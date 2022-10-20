import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const NewHolder = ({ open, handleClose }) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ top: "7%" }}>
				<DialogTitle id="alert-dialog-title">NEW HOLDER</DialogTitle>
				<DialogContent>
					<form id="new-holder-form" className="form-horizontal" role="form">
						<div className="form-body">
							<div className="form-group">
								<label className="col-md-3 control-label">Holder Name</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											pattern="^[&0-9A-Za-z -]+$"
											name="holder_name"
											id="holder_name"
											className="form-control"
											placeholder="Holder Name"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Street</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											name="holder_address_street"
											id="holder_address_street"
											className="form-control"
											placeholder="Street address & Suite"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">City</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											name="holder_address_city"
											id="holder_address_city"
											className="form-control"
											placeholder="City"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">State</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<select
											className="form-control"
											name="holder_address_state"
											id="holder_address_state"
											required>
											<option value="AK">Alaska</option>
											<option value="AL">Alabama</option>
											<option value="AR">Arkansas</option>
											<option value="AZ">Arizona</option>
											<option value="CA">California</option>
											<option value="CO">Colorado</option>
											<option value="CT">Connecticut</option>
											<option value="DC">District of Columbia</option>
											<option value="DE">Delaware</option>
											<option value="FL">Florida</option>
											<option value="GA">Georgia</option>
											<option value="HI">Hawaii</option>
											<option value="IA">Iowa</option>
											<option value="ID">Idaho</option>
											<option value="IL">Illinois</option>
											<option value="IN">Indiana</option>
											<option value="KS">Kansas</option>
											<option value="KY">Kentucky</option>
											<option value="LA">Louisiana</option>
											<option value="MA">Massachusetts</option>
											<option value="MD">Maryland</option>
											<option value="ME">Maine</option>
											<option value="MI">Michigan</option>
											<option value="MN">Minnesota</option>
											<option value="MO">Missouri</option>
											<option value="MS">Mississippi</option>
											<option value="MT">Montana</option>
											<option value="NC">North Carolina</option>
											<option value="ND">North Dakota</option>
											<option value="NE">Nebraska</option>
											<option value="NH">New Hampshire</option>
											<option value="NJ">New Jersey</option>
											<option value="NM">New Mexico</option>
											<option value="NV">Nevada</option>
											<option value="NY">New York</option>
											<option value="OH">Ohio</option>
											<option value="OK">Oklahoma</option>
											<option value="OR">Oregon</option>
											<option value="PA">Pennsylvania</option>
											<option value="PR">Puerto Rico</option>
											<option value="RI">Rhode Island</option>
											<option value="SC">South Carolina</option>
											<option value="SD">South Dakota</option>
											<option value="TN">Tennessee</option>
											<option value="TX">Texas</option>
											<option value="UT">Utah</option>
											<option value="VA">Virginia</option>
											<option value="VT">Vermont</option>
											<option value="WA">Washington</option>
											<option value="WI">Wisconsin</option>
											<option value="WV">West Virginia</option>
											<option value="WY">Wyoming</option>
										</select>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Zip Code</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-user" />
										</span>
										<input
											type="text"
											name="holder_address_zipcode"
											id="holder_address_zipcode"
											className="form-control"
											placeholder="Zip Code"
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
											name="holder_email"
											id="holder_email"
											className="form-control"
											placeholder="Email address"
											required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Phone</label>
								<div className="col-md-9">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-phone" />
										</span>
										<input
											type="tel"
											data-inputmask="'mask': '(999) 999-9999'"
											pattern="^\(\d{3}\) \d{3}-\d{4}$"
											name="money-inputmask"
											id="holder_phone"
											className="form-control"
											placeholder="Phone number"
											required
										/>
									</div>
								</div>
							</div>
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Add Holder
					</Button>
					<Button variant="outlined" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NewHolder;
