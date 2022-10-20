import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditMobileUser = ({ open, handleClose }) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ top: "7%" }}>
				<DialogTitle id="alert-dialog-title">EDIT MOBILE USER</DialogTitle>
				<DialogContent>
					<>
						<form
							id="edit-mob-user-form"
							className="form-horizontal"
							role="form">
							<div className="form-body">
								<div className="form-group">
									<label className="col-md-3 control-label">Group</label>
									<div className="col-md-9">
										<select
											name="group_name"
											id="group_name_edit"
											className="form-control"
											readOnly>
											<option>Mobile User</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">
										Username/Email
									</label>
									<div className="col-md-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-envelope" />
											</span>
											<input
												type="email"
												name="email_edit"
												id="email_edit"
												defaultValue
												className="form-control"
												placeholder="Email Address"
												required
											/>
											<input
												type="hidden"
												name="current_email_edit"
												id="current_email_edit"
												defaultValue
												className="form-control"
												placeholder="Email Address"
												required
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">Mobile Phone</label>
									<div className="col-md-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-phone" />
											</span>
											<input
												type="tel"
												data-inputmask="'mask': '(999) 999-9999'"
												name="money-inputmask"
												id="mobile_phone_edit"
												pattern="^\(\d{3}\) \d{3}-\d{4}$"
												defaultValue
												className="form-control"
												placeholder="Mobile Phone"
												required
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">
										AMS360 Account No.
									</label>
									<div className="col-md-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-file-text-o" />
											</span>
											<input
												type="text"
												name="amsno"
												id="amsno_edit"
												pattern="^[0-9]*$"
												defaultValue
												className="form-control"
												placeholder="AMS360 Number (Example: 10297)"
												required
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">
										General Agent
									</label>
									<div className="col-md-9">
										<label className="mt-checkbox">
											<input
												type="checkbox"
												name="is_schuberg_edit"
												id="is_schuberg_edit"
											/>
											Schuberg
											<span />
										</label>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">Company type</label>
									<div className="col-md-9">
										<label className="mt-checkbox">
											<input
												type="checkbox"
												name="is_dba_edit"
												id="is_dba_edit"
											/>
											Company is a DBA
											<span />
										</label>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">Company name</label>
									<div className="col-md-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-building" />
											</span>
											<input
												type="text"
												name="company"
												id="company_edit"
												defaultValue
												className="form-control"
												placeholder="Company Name"
											/>
										</div>
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
												name="given_name"
												id="given_name_edit"
												defaultValue
												pattern="^[.&0-9A-Za-z -]+$"
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
												name="middle_name"
												id="middle_name_edit"
												pattern="^[&0-9A-Za-z -]+$"
												defaultValue
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
												name="family_name"
												id="family_name_edit"
												pattern="^[&0-9A-Za-z -]+$"
												defaultValue
												className="form-control"
												placeholder="Last Name"
												required
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label className="col-md-3 control-label">
										Street number
									</label>
									<div className="col-md-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-home" />
											</span>
											<input
												type="text"
												name="address_street"
												id="address_street_edit"
												defaultValue
												className="form-control"
												placeholder="Street number"
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
												<i className="fa fa-home" />
											</span>
											<input
												type="text"
												name="address_city"
												id="address_city_edit"
												defaultValue
												className="form-control"
												placeholder="City"
												required
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="state" className="col-md-3 control-label">
										State
									</label>
									<div className="col-sm-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-home" />
											</span>
											<select
												className="form-control"
												name="address_state"
												id="address_state_edit"
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
									<label className="col-md-3 control-label">Zip code</label>
									<div className="col-md-9">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="fa fa-home" />
											</span>
											<input
												type="text"
												name="address_zipcode"
												id="address_zipcode_edit"
												pattern="^\d{5}$"
												defaultValue
												className="form-control"
												placeholder="Zip code"
												required
											/>
										</div>
									</div>
								</div>
							</div>
						</form>
					</>
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

export default EditMobileUser;
