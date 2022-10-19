import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const NewMobileUser = ({ open, handleClose }) => {
	return (
		<div>
			<h1>New Mobile User</h1>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ top: "7%" }}>
				<DialogTitle id="alert-dialog-title">NEW MOBILE USER</DialogTitle>
				<DialogContent>
					{/* <DialogContentText id="alert-dialog-description">
						Are you sure you want to Delete? NewMobileUserDialog
					</DialogContentText> */}
					<div class="portlet-body form">
						<form id="new-mob-user-form" class="form-horizontal" role="form">
							<div class="form-body">
								<div class="form-group">
									<label class="col-md-3 control-label">Group</label>
									<div class="col-md-9">
										<select
											name="group_name"
											id="group_name"
											class="form-control">
											<option>Mobile User</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Username/Email</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-envelope"></i>
											</span>
											<input
												type="email"
												id="email"
												name="email"
												class="form-control"
												placeholder="Email Address"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Mobile Phone</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-phone"></i>
											</span>
											<input
												type="tel"
												data-inputmask="'mask': '(999) 999-9999'"
												pattern="^\(\d{3}\) \d{3}-\d{4}$"
												id="mobile_phone"
												name="money-inputmask"
												class="form-control"
												placeholder="Mobile Phone"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">AMS360 Account #</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-file-text-o"></i>
											</span>
											<input
												type="text"
												id="amsno"
												name="amsno"
												pattern="^[0-9]*$"
												class="form-control"
												placeholder="(Example: 10297)"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">General Agent</label>
									<div class="col-md-9">
										<label class="mt-checkbox">
											<input
												type="checkbox"
												name="is_schuberg"
												id="is_schuberg"
											/>
											Schuberg
											<span></span>
										</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Company type</label>
									<div class="col-md-9">
										<label class="mt-checkbox">
											<input type="checkbox" name="is_dba" id="is_dba" />
											Company is a DBA
											<span></span>
										</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Company name</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-building"></i>
											</span>
											<input
												type="text"
												id="company"
												name="company"
												class="form-control"
												placeholder="Company Name"
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">First name</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-user"></i>
											</span>
											<input
												type="text"
												id="given_name"
												name="given_name"
												pattern="^[.&0-9A-Za-z -]+$"
												class="form-control"
												placeholder="First Name"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Middle name</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-user"></i>
											</span>
											<input
												type="text"
												id="middle_name"
												name="middle_name"
												pattern="^[&0-9A-Za-z -]+$"
												class="form-control"
												placeholder="Middle Name"
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Last name</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-user"></i>
											</span>
											<input
												type="text"
												id="family_name"
												name="family_name"
												pattern="^[&0-9A-Za-z -]+$"
												class="form-control"
												placeholder="Last Name"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">Street number</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-home"></i>
											</span>
											<input
												type="text"
												id="address_street"
												name="address_street"
												class="form-control"
												placeholder="Street number"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">City</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-home"></i>
											</span>
											<input
												type="text"
												id="address_city"
												name="address_city"
												class="form-control"
												placeholder="City"
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label for="state" class="col-md-3 control-label">
										State
									</label>
									<div class="col-sm-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-home"></i>
											</span>
											<select
												class="form-control"
												id="address_state"
												name="address_state"
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
								<div class="form-group">
									<label class="col-md-3 control-label">Zip code</label>
									<div class="col-md-9">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="fa fa-home"></i>
											</span>
											<input
												type="text"
												id="address_zipcode"
												name="address_zipcode"
												pattern="^\d{5}$"
												class="form-control"
												placeholder="Zip code"
												required
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="form-actions">
								<div class="row">
									<div class="col-md-offset-3 col-md-9">
										<button
											id="new-mob-user-form-btn-submit"
											type="submit"
											class="btn blue"
											data-loading-text="<i class='fa fa-spinner fa-spin '></i> Creating User...">
											Submit
										</button>
										<button
											id="new-mob-user-form-btn-cancel"
											type="button"
											data-dismiss="modal"
											class="btn dark btn-outline">
											Close
										</button>
										<button
											id="new-mob-user-form-btn-reset"
											type="reset"
											class="btn blue">
											Reset
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Submit
					</Button>
					<Button variant="outlined" onClick={handleClose}>
						Close
					</Button>
					<Button variant="contained" onClick={handleClose}>
						Reset
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default NewMobileUser;
