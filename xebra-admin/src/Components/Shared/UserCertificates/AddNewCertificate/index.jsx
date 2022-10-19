import React from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import accordLogo from "../../../../assets/accord-logo.jpg";
const AddNewCertificate = () => {
	let { name, asm, email, certNo } = useParams();
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
					sx={{ paddingTop: "38px", width: "1800px" }}>
					<Typography
						variant="h3"
						className="page-title sbold"
						sx={{
							fontSize: "24px",
							display: "flex",
							paddingLeft: "20px",
							marginTop: "60px",
						}}>
						<i class="fa fa-file-pdf-o"> &nbsp; ADD NEW CERTIFICATE</i>
						{/* <i class="fa fa-server">&nbsp; USERS ACTIVITY</i> */}
					</Typography>
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
					<Paper
						elevation={1}
						style={{
							marginLeft: 15,
							width: "130vw",
							// overflowX: "scroll"
						}}>
						<Stack
							direction="column"
							spacing={2}
							padding={2}
							className="portlet-title">
							<Stack
								spacing={3}
								direction="row"
								style={{
									width: "75vw",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-around",
								}}>
								<Stack
									spacing={3}
									direction="row"
									style={{
										display: "flex",
										alignItems: "center",
									}}>
									<img src={accordLogo} />
									<Typography
										display="flex"
										style={{
											fontSize: "14px",
											fontWeight: "200",
											color: "GrayText",
										}}
										className="caption-subject bold uppercase">
										CERTIFICATE OF LIABILITY INSURANCE
									</Typography>
								</Stack>
								<Stack direction="column" marginLeft={60}>
									Date:
									<Typography
										sx={{
											fontSize: "14px",
											border: "1px solid grey",
											backgroundColor: "#cce6ff",
											padding: "6px 12px 6px 12px",
										}}>
										09-23-2022
									</Typography>
								</Stack>
							</Stack>
						</Stack>
						<Divider variant="middle" />
						<Typography padding={4} style={{ width: "75vw" }}>
							THIS CERTIFICATE IS ISSUED AS A MATTER OF INFORMATION ONLY AND
							CONFERS NO RIGHTS UPON THE CERTIFICATE HOLDER. THIS CERTIFICATE
							DOES NOT AFFIRMATIVELY OR NEGATIVELY AMEND, EXTEND OR ALTER THE
							COVERAGE AFFORDED BY THE POLICIES BELOW.THIS CERTIFICATE OF
							INSURANCE DOES NOT CONSTITUTE A CONTRACT BETWEEN THE ISSUING
							INSURER(S), AUTHORIZED REPRESENTATIVE OR PRODUCER, AND THE
							CERTIFICATE HOLDER.
						</Typography>
						<Divider variant="middle" />
						<Typography padding={4} style={{ width: "75vw" }}>
							IMPORTANT: If the certificate holder is an ADDITIONAL INSURED, the
							policy(ies) must be endorsed. If SUBROGATION IS WAIVED, subject to
							the terms and conditions of the policy, certain policies may
							require an endorsement. A statement on this certificate does not
							confer rights to the certificate holder in lieu of such
							endorsement(s).
						</Typography>
						<Divider variant="middle" />
						<Grid
							container
							spacing={2}
							style={{
								width: "65vw",
								marginTop: "5px",
								marginLeft: "10px",
								marginRight: "10px",
							}}>
							<Grid item xs={4}>
								<table class="table">
									<tbody>
										<tr>
											<td>PRODUCER</td>
										</tr>
										<tr>
											<td>
												<textarea
													name="producer"
													class="form-control"
													rows="1"
													id="producer"
													readonly
													required>
													Saint George Insurance Brokerage, Inc.
												</textarea>
											</td>
										</tr>
										<tr>
											<td>
												<textarea
													name="producer_address"
													class="form-control"
													rows="3"
													id="producer_address"
													readonly
													required>
													7668 Telegraph Road, Commerce, CA 90040
												</textarea>
											</td>
										</tr>
									</tbody>
								</table>
							</Grid>
							<Grid item xs={8}>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<td>CONTACT NAME</td>
											<td colSpan={3} align="left">
												<div>
													<select
														id="contact_name"
														name="contact_name"
														className="form-control"
														required
													/>
												</div>
											</td>
										</tr>
										<tr>
											<td>PHONE</td>
											<td align="left">
												<input
													id="contact_phone"
													name="contact_phone"
													defaultValue={3238888785}
													type="text"
													className="form-control"
													placeholder="Contact Phone"
													readOnly
													required
												/>
											</td>
											<td>FAX</td>
											<td align="left">
												<input
													id="contact_fax"
													name="contact_fax"
													defaultValue={3238888776}
													type="text"
													className="form-control"
													placeholder="Contact Fax"
													readOnly
													required
												/>
											</td>
										</tr>
										<tr>
											<td>EMAIL</td>
											<td colSpan={3} align="left">
												<input
													id="contact_email"
													name="contact_email"
													defaultValue="certificate@sgibco.com"
													type="text"
													className="form-control"
													placeholder="Contact Email"
													readOnly
													required
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</Grid>
						</Grid>
						<Divider variant="middle" />
						<Grid
							container
							spacing={2}
							style={{
								width: "75vw",
								marginTop: "5px",
								marginLeft: "10px",
								marginRight: "10px",
							}}>
							<Grid item xs={4}>
								<table className="table">
									<tbody>
										<tr>
											<td>INSURED</td>
										</tr>
										<tr>
											<td>
												<select
													id="insured"
													name="insured"
													className="form-control"
												/>
											</td>
										</tr>
										<tr>
											<td colSpan={2}>
												<textarea
													name="insured_address"
													className="form-control"
													rows={3}
													id="insured_address"
													readOnly
													required
													defaultValue={""}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</Grid>
							<Grid item xs={8}>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<td align="left">&nbsp;</td>
											<td align="left">INSURER(S) AFFORDING COVERAGE</td>
											<td align="center" style={{ fontWeight: "bold" }}>
												NAIC #
											</td>
											{/* <td align="center" font-weight:bold;"></td> */}
										</tr>
										<tr>
											<td>INSURER A</td>
											<td>
												<input
													name="insurer_a"
													id="insurer_a"
													length={65}
													maxLength={65}
													type="text"
													className="form-control"
													list="insurers"
													placeholder="INSURER A"
												/>
											</td>
											<td>
												<input
													name="insurer_a_naic"
													id="insurer_a_naic"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="NAIC"
												/>
											</td>
										</tr>
										<tr>
											<td>INSURER B</td>
											<td>
												<input
													name="insurer_b"
													id="insurer_b"
													length={65}
													maxLength={65}
													type="text"
													className="form-control"
													placeholder="INSURER B"
												/>
											</td>
											<td>
												<input
													name="insurer_b_naic"
													id="insurer_b_naic"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="NAIC"
												/>
											</td>
										</tr>
										<tr>
											<td>INSURER C</td>
											<td>
												<input
													name="insurer_c"
													id="insurer_c"
													length={65}
													maxLength={65}
													type="text"
													className="form-control"
													placeholder="INSURER C"
												/>
											</td>
											<td>
												<input
													name="insurer_c_naic"
													id="insurer_c_naic"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="NAIC"
												/>
											</td>
										</tr>
										<tr>
											<td>INSURER D</td>
											<td>
												<input
													name="insurer_d"
													id="insurer_d"
													length={65}
													maxLength={65}
													type="text"
													className="form-control"
													placeholder="INSURER D"
												/>
											</td>
											<td style={{ color: "rgb(0, 136, 204)" }}>
												<input
													name="insurer_d_naic"
													id="insurer_d_naic"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="NAIC"
												/>
											</td>
										</tr>
										<tr>
											<td>INSURER E</td>
											<td>
												<input
													name="insurer_e"
													id="insurer_e"
													length={65}
													maxLength={65}
													type="text"
													className="form-control"
													placeholder="INSURER E"
												/>
											</td>
											<td>
												<input
													name="insurer_e_naic"
													id="insurer_e_naic"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="NAIC"
												/>
											</td>
										</tr>
										<tr>
											<td>INSURER F</td>
											<td>
												<input
													name="insurer_f"
													id="insurer_f"
													length={65}
													maxLength={65}
													type="text"
													className="form-control"
													placeholder="INSURER F"
												/>
											</td>
											<td>
												<input
													name="insurer_f_naic"
													id="insurer_f_naic"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="NAIC"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</Grid>
							<Grid item xs={12}>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<td align="left">COVERAGES</td>
											<td align="left">&nbsp;</td>
											<td align="left">CERTIFICATE NUMBER</td>
											<td align="left">
												<input
													name="certificate_number"
													id="certificate_number"
													length={15}
													maxLength={15}
													type="text"
													className="form-control"
													placeholder="Certificate Number"
													required
												/>
											</td>
											<td align="left">REVISION NUMBER</td>
											<td align="left">
												<input
													name="certificate_revision"
													id="certificate_revision"
													length={8}
													maxLength={8}
													type="text"
													className="form-control"
													placeholder="Revision Number"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</Grid>
							<Grid item xs={12}>
								<>
									<table className="table table-bordered">
										<tbody>
											<tr>
												<td colSpan={9} align="left">
													THIS IS TO CERTIFY THAT THE POLICIES OF INSURANCE
													LISTED BELOW HAVE BEEN ISSUED TO THE INSURED NAMED
													ABOVE FOR THE POLICY PERIOD INDICATED. NOTWITHSTANDING
													ANY REQUIREMENT, TERM OR CONDITION OF ANY CONTRACT OR
													OTHER DOCUMENT WITH RESPECT TO WHICH THIS CERTIFICATE
													MAY BE ISSUED OR MAY PERTAIN, THE INSURANCE AFFORDED
													BY THE POLICIES DESCRIBED HEREIN IS SUBJECT TO ALL THE
													TERMS, EXCLUSIONS AND CONDITIONS OF SUCH POLICIES.
													LIMITS SHOWN MAY HAVE BEEN REDUCED BY PAID CLAIMS.
												</td>
											</tr>
											<tr>
												<td align="center">INSR LTR</td>
												<td align="center">TYPE OF INSURANCE</td>
												<td align="center">ADDL INSR</td>
												<td align="center">SUBR WVD</td>
												<td align="center">POLICY NUMBER</td>
												<td align="center">POLICY EFFECTIVE</td>
												<td align="center">POLICY EXPIRES</td>
												<td colSpan={2} align="center">
													LIMITS
												</td>
											</tr>
											<tr>
												<td align="center">
													<select
														name="gen_liab_insurer_letter"
														id="gen_liab_insurer_letter"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
												</td>
												<td align="center">
													<table className="table">
														<tbody>
															<tr>
																<td>GENERAL LIABILITY</td>
															</tr>
															<tr>
																<td>
																	<input
																		name="gen_liab_comm"
																		id="gen_liab_comm"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	COMMERCIAL GENERAL LIABILITY
																</td>
															</tr>
															<tr>
																<td>
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																	<input
																		name="gen_liab_claims"
																		id="gen_liab_claims"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	CLAIMS MADE &nbsp;&nbsp;{" "}
																	<input
																		name="gen_liab_occur"
																		id="gen_liab_occur"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	OCCUR
																</td>
															</tr>
															<tr>
																<td>
																	<table className="table">
																		<tbody>
																			<tr>
																				<td align="right">
																					<input
																						name="gen_liab_other1"
																						id="gen_liab_other1"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>
																					<input
																						name="gen_liab_other1_desc"
																						id="gen_liab_other1_desc"
																						type="text"
																						className="form-control"
																					/>
																				</td>
																			</tr>
																			<tr>
																				<td align="right">
																					<input
																						name="gen_liab_other2"
																						id="gen_liab_other2"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>
																					<input
																						name="gen_liab_other2_desc"
																						id="gen_liab_other2_desc"
																						type="text"
																						className="form-control"
																					/>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
															<tr>
																<td>GENERAL AGGREGATE LIMIT APPLIES PER:</td>
															</tr>
															<tr>
																<td>
																	<input
																		name="gen_liab_policy"
																		id="gen_liab_policy"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	POLICY &nbsp;&nbsp;{" "}
																	<input
																		name="gen_liab_project"
																		id="gen_liab_project"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	PROJECT &nbsp;&nbsp;{" "}
																	<input
																		name="gen_liab_location"
																		id="gen_liab_location"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	LOC
																</td>
															</tr>
														</tbody>
													</table>
												</td>
												<td align="center">
													<select
														name="gen_liab_additional"
														id="gen_liab_additional"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<select
														name="gen_liab_subr"
														id="gen_liab_subr"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<input
														name="gen_liab_policy_no"
														id="gen_liab_policy_no"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
												</td>
												<td align="center">
													<input
														name="gen_liab_effective"
														id="gen_liab_effective"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
												</td>
												<td align="center">
													<input
														name="gen_liab_expires"
														id="gen_liab_expires"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
												</td>
												<td colSpan={2} align="center">
													<table className="table table-bordered">
														<tbody>
															<tr>
																<td className="limits-desc">EACH OCCURRENCE</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_occur"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	DAMAGE TO RENTED PREMISES (Each occurrence)
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_damage"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	MED EXP (Any one person)
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_medical"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	PERSONAL &amp; ADV INJURY
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_injury"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	GENERAL AGGREGATE
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_aggregate"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	PRODUCTS - COMP/OP AGG
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_products"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	<input
																		name="gen_liab_limit_xtra_desc"
																		id="gen_liab_limit_xtra_desc"
																		type="text"
																		className="form-control"
																	/>
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="gen_liab_limit_xtra"
																		className="form-control-money"
																	/>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td align="center">
													<select
														name="auto_liab_insurer_letter"
														id="auto_liab_insurer_letter"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
												</td>
												<td align="center">
													<table className="table">
														<tbody>
															<tr>
																<td>AUTOMOBILE LIABILITY</td>
															</tr>
															<tr>
																<td>
																	<input
																		name="auto_liab_any"
																		id="auto_liab_any"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	ANY AUTO
																</td>
															</tr>
															<tr>
																<td>
																	<input
																		name="auto_liab_all"
																		id="auto_liab_all"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	ALL OWNED AUTOS &nbsp;&nbsp;{" "}
																	<input
																		name="auto_liab_scheduled"
																		id="auto_liab_scheduled"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	SCHEDULED AUTOS
																</td>
															</tr>
															<tr>
																<td>
																	<input
																		name="auto_liab_hired"
																		id="auto_liab_hired"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	HIRED AUTOS
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
																	<input
																		name="auto_liab_non_owned"
																		id="auto_liab_non_owned"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	NON-OWNED AUTOS
																</td>
															</tr>
															<tr>
																<td align="left">
																	<table className="table">
																		<tbody>
																			<tr>
																				<td>
																					<input
																						name="auto_liab_other1"
																						id="auto_liab_other1"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>
																					<input
																						name="auto_liab_other1_desc"
																						id="auto_liab_other1_desc"
																						style={{
																							color: "#585858",
																							fontWeight: "normal",
																							textAlign: "left",
																						}}
																						type="text"
																						className="form-control"
																					/>
																				</td>
																			</tr>
																			<tr>
																				<td>
																					<input
																						name="auto_liab_other2"
																						id="auto_liab_other2"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>
																					<input
																						name="auto_liab_other2_desc"
																						id="auto_liab_other2_desc"
																						style={{
																							color: "#585858",
																							fontWeight: "normal",
																							textAlign: "left",
																						}}
																						type="text"
																						className="form-control"
																					/>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
												<td align="center">
													<select
														name="auto_liab_additional"
														id="auto_liab_additional"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<select
														name="auto_liab_subdr"
														id="auto_liab_subdr"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<input
														name="auto_liab_policy_no"
														id="auto_liab_policy_no"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
												</td>
												<td align="center">
													<input
														name="auto_liab_effective"
														id="auto_liab_effective"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
												</td>
												<td align="center">
													<input
														name="auto_liab_expires"
														id="auto_liab_expires"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
												</td>
												<td colSpan={2} align="center">
													<table className="table table-bordered">
														<tbody>
															<tr>
																<td className="limits-desc">
																	COMBINED SINGLE LIMIT (Each accident)
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="auto_liab_limit_combined"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	BODILY INJURY (Per person)
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="auto_liab_limit_injury_person"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	BODILY INJURY (Per accident)
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="auto_liab_limit_injury_accident"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	PROPERTY DAMAGE (Per accident)
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="auto_liab_limit_property"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	<input
																		name="auto_liab_limit_xtra_desc"
																		id="auto_liab_limit_xtra_desc"
																		type="text"
																		className="form-control"
																	/>
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="auto_liab_limit_xtra"
																		className="form-control-money"
																	/>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td align="center">
													<select
														name="umb_liab_insurer_letter"
														id="umb_liab_insurer_letter"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
													<select
														name="excess_liab_insurer_letter"
														id="excess_liab_insurer_letter"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
												</td>
												<td align="center">
													<table className="table">
														<tbody>
															<tr>
																<td>
																	<input
																		name="umb_liab"
																		id="umb_liab"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	UMBRELLA LIAB
																</td>
																<td>
																	<input
																		name="umb_liab_occur"
																		id="umb_liab_occur"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	OCCUR
																</td>
															</tr>
															<tr>
																<td>
																	<input
																		name="umb_liab_excess"
																		id="umb_liab_excess"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	EXCESS LIAB
																</td>
																<td>
																	<input
																		name="umb_liab_claims"
																		id="umb_liab_claims"
																		type="checkbox"
																		className="icheck"
																		data-checkbox="icheckbox_flat-grey"
																	/>
																	CLAIMS-MADE
																</td>
															</tr>
															<tr>
																<td colSpan={2}>
																	<table className="table">
																		<tbody>
																			<tr>
																				<td>
																					<input
																						name="umb_liab_deductible"
																						id="umb_liab_deductible"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>DED</td>
																			</tr>
																			<tr>
																				<td>
																					<input
																						name="umb_liab_retention"
																						id="umb_liab_retention"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>RETENTION</td>
																				<td className="input-group-money">
																					<span className="input-group-addon">
																						$
																					</span>
																					<input
																						name="money-inputmask"
																						id="umb_liab_retention_amt"
																						maxLength={10}
																						className="form-control"
																					/>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
												<td align="center">
													<select
														name="umb_liab_additional"
														id="umb_liab_additional"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
													<select
														name="excess_liab_additional"
														id="excess_liab_additional"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<select
														name="umb_liab_subr"
														id="umb_liab_subr"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
													<select
														name="excess_liab_subr"
														id="excess_liab_subr"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<input
														name="umb_liab_policy_no"
														id="umb_liab_policy_no"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
													<input
														name="excess_liab_policy_no"
														id="excess_liab_policy_no"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
												</td>
												<td align="center">
													<input
														name="umb_liab_effective"
														id="umb_liab_effective"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
													<input
														name="excess_liab_effective"
														id="excess_liab_effective"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
												</td>
												<td align="center">
													<input
														name="umb_liab_expires"
														id="umb_liab_expires"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
													<input
														name="excess_liab_expires"
														id="excess_liab_expires"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
												</td>
												<td colSpan={2} align="center">
													<table className="table table-bordered">
														<tbody>
															<tr>
																<td className="limits-desc">EACH OCCURRENCE</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="umb_liab_limit_occur"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">AGGREGATE</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="umb_liab_limit_aggregate"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	<input
																		name="umb_liab_limit_xtra_desc"
																		id="umb_liab_limit_xtra_desc"
																		type="text"
																		className="form-control"
																	/>
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="umb_liab_limit_xtra"
																		className="form-control-money"
																	/>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td align="center">
													<select
														name="workers_comp_insurer_letter"
														id="workers_comp_insurer_letter"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
												</td>
												<td align="center">
													<table className="table">
														<tbody>
															<tr>
																<td colSpan={2}>
																	WORKERS COMPENSATION AND EMPLOYERS' LIABILITY
																</td>
															</tr>
															<tr>
																<td>
																	ANY PROPRIETOR/PARTNER/EXECUTIVE
																	OFFICER/MEMBER EXCLUDED?
																</td>
																<td>
																	<select
																		name="workers_comp_excluded"
																		id="workers_comp_excluded"
																		className="form-control-letter">
																		<option value>-</option>
																		<option value="Y">Y</option>
																		<option value="N">N</option>
																	</select>
																</td>
															</tr>
															<tr>
																<td colSpan={2}>(Mandatory in NH)</td>
															</tr>
															<tr>
																<td colSpan={2}>
																	If yes, describe under DESCRIPTION OF
																	OPERATIONS below
																</td>
															</tr>
														</tbody>
													</table>
												</td>
												<td align="center">N/A</td>
												<td align="center">
													<select
														name="workers_comp_subdr"
														id="workers_comp_subdr"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<input
														name="workers_comp_policy_no"
														id="workers_comp_policy_no"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
												</td>
												<td align="center">
													<input
														name="workers_comp_effective"
														id="workers_comp_effective"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
												</td>
												<td align="center">
													<input
														name="workers_comp_expires"
														id="workers_comp_expires"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
												</td>
												<td colSpan={2} align="center">
													<table className="table table-bordered">
														<tbody>
															<tr>
																<td>
																	<table className="table table-bordered">
																		<tbody>
																			<tr>
																				<td>
																					<input
																						name="workers_comp_limit_stat"
																						id="workers_comp_limit_stat"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>WC STATUTORY LIMITS</td>
																			</tr>
																			<tr>
																				<td>
																					<input
																						name="workers_comp_limit_other_chk"
																						id="workers_comp_limit_other_chk"
																						type="checkbox"
																						className="icheck"
																						data-checkbox="icheckbox_flat-grey"
																					/>
																				</td>
																				<td>OTHER</td>
																			</tr>
																			<tr>
																				<td colSpan={4}>
																					<input
																						name="workers_comp_limit_other_desc"
																						id="workers_comp_limit_other_desc"
																						type="text"
																						className="form-control"
																					/>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	E.L. EACH ACCIDENT
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="workers_comp_limit_acc"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	E.L. DISEASE - EA EMPLOYEE
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="workers_comp_limit_emp"
																		className="form-control-money"
																	/>
																</td>
															</tr>
															<tr>
																<td className="limits-desc">
																	E.L. DISEASE - POLICY LIMIT
																</td>
																<td className="input-group-money">
																	<span className="input-group-addon">$</span>
																	<input
																		name="money-inputmask"
																		id="workers_comp_limit_pol"
																		className="form-control-money"
																	/>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td align="center">
													<select
														name="other_coverage_insurer_letter"
														id="other_coverage_insurer_letter"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
												</td>
												<td align="center">
													<input
														name="other_coverage_desc"
														id="other_coverage_desc"
														type="text"
														className="form-control"
													/>
												</td>
												<td align="center">
													<select
														name="other_coverage_additional"
														id="other_coverage_additional"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<select
														name="other_coverage_subdr"
														id="other_coverage_subdr"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<input
														name="other_coverage_policy_no"
														id="other_coverage_policy_no"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
												</td>
												<td align="center">
													<input
														name="other_coverage_effective"
														id="other_coverage_effective"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
												</td>
												<td align="center">
													<input
														name="other_coverage_expires"
														id="other_coverage_expires"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
												</td>
												<td colSpan={2} align="center">
													<input
														name="other_coverage_limit"
														id="other_coverage_limit"
														type="text"
														className="form-control"
														placeholder="Other Coverage Limit"
													/>
												</td>
											</tr>
											<tr>
												<td align="center">
													<select
														name="other_coverage_insurer_letter_b"
														id="other_coverage_insurer_letter_b"
														className="form-control-letter">
														<option value>-</option>
														<option value="A">A</option>
														<option value="B">B</option>
														<option value="C">C</option>
														<option value="D">D</option>
														<option value="E">E</option>
														<option value="F">F</option>
													</select>
												</td>
												<td align="center">
													<input
														name="other_coverage_desc_b"
														id="other_coverage_desc_b"
														type="text"
														className="form-control"
													/>
												</td>
												<td align="center">
													<select
														name="other_coverage_additional_b"
														id="other_coverage_additional_b"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<select
														name="other_coverage_subdr_b"
														id="other_coverage_subdr_b"
														className="form-control-letter">
														<option value>-</option>
														<option value="Y">Y</option>
														<option value="N">N</option>
													</select>
												</td>
												<td align="center">
													<input
														name="other_coverage_policy_no_b"
														id="other_coverage_policy_no_b"
														length={20}
														maxLength={20}
														type="text"
														className="form-control-letter"
														placeholder="Policy Number"
													/>
												</td>
												<td align="center">
													<input
														name="other_coverage_effective_b"
														id="other_coverage_effective_b"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Effective"
													/>
												</td>
												<td align="center">
													<input
														name="other_coverage_expires_b"
														id="other_coverage_expires_b"
														length={10}
														maxLength={10}
														type="text"
														className="form-control form-control-inline date-picker"
														data-date-format="mm-dd-yyyy"
														placeholder="Expires"
													/>
												</td>
												<td colSpan={2} align="center">
													<input
														name="other_coverage_limit_b"
														id="other_coverage_limit_b"
														type="text"
														className="form-control"
														placeholder="Other Coverage Limit"
													/>
												</td>
											</tr>
											<tr>
												<td colSpan={8}>
													<div className="form-group">
														<span>
															DESCRIPTION OF OPERATIONS / LOCATIONS / VEHICLES
															(Attach ACORD 101, Additional Remarks Schedule, if
															more space is required)
														</span>
														<textarea
															className="form-control"
															rows={8}
															name="operations_desc"
															id="operations_desc"
															defaultValue={""}
														/>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</>
							</Grid>
						</Grid>
						<Divider variant="middle" />
						<Grid
							container
							spacing={2}
							style={{
								width: "75vw",
								marginTop: "5px",
								marginLeft: "10px",
								marginRight: "10px",
							}}>
							<Grid item xs={12}>
								<table className="table">
									<tbody>
										<tr>
											<td align="left">CERTIFICATE HOLDER</td>
											<td align="left">CANCELLATION</td>
										</tr>
									</tbody>
								</table>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<td rowSpan={2} align="left">
												<textarea
													name="cert_holder"
													readOnly
													className="form-control"
													rows={7}
													cols={60}
													id="cert_holder"
													defaultValue={
														"                                                                        "
													}
												/>
											</td>
											<td align="left">
												SHOULD ANY OF THE ABOVE DESCRIBED POLICIES BE CANCELLED
												BEFORE THE EXPIRATION DATE THEREOF, NOTICE WILL BE
												DELIVERED IN ACCORDANCE WITH THE POLICY PROVISIONS.
											</td>
										</tr>
										<tr>
											<td align="left">AUTHORIZED REPRESENTATIVE</td>
										</tr>
									</tbody>
								</table>
							</Grid>
							<Divider variant="middle" />
							<Grid item xs={12}>
								<table className="table">
									<tbody>
										<tr>
											<td align="left">ACORD 25 (2010/05)</td>
											<td align="left">
												© 1988-2010 ACORD CORPORATION. All rights reserved.
											</td>
										</tr>
										<tr>
											<td colSpan={2} align="center">
												The ACORD name and logo are registered marks of ACORD
											</td>
										</tr>
									</tbody>
								</table>
							</Grid>
						</Grid>
						<Divider variant="middle" />
						<Grid
							container
							spacing={2}
							style={{
								width: "75vw",
								marginTop: "5px",
								marginLeft: "10px",
								marginRight: "10px",
							}}>
							<Grid item xs={12}>
								<div>
									<table className="table">
										<tbody>
											<tr>
												<td align="center">COMMENTS/REMARKS</td>
											</tr>
										</tbody>
									</table>
									<table className="table table-bordered">
										<tbody>
											<tr>
												<td align="left">
													<textarea
														className="form-control"
														rows={40}
														id="comments"
														defaultValue={""}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Grid>
						</Grid>
						<Divider variant="middle" />
						<Stack
							spacing={3}
							direction="row"
							justifyContent="start"
							style={{
								width: "75vw",
								margin: "15px",
							}}>
							<Button
								variant="contained"
								size="large"
								color="primary"
								type="submit">
								Update Certificate
							</Button>
							<Button variant="outlined" size="large" type="button">
								Cancel
							</Button>
						</Stack>
					</Paper>
				</Stack>
			</Box>
		</>
	);
};

export default AddNewCertificate;
