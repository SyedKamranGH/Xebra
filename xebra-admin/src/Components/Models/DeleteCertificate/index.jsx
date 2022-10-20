import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteCertificate = ({ open, handleClose, certNo }) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ top: "7%" }}>
				<DialogTitle id="alert-dialog-title">
					Confirm Delete Certificate
				</DialogTitle>
				<DialogContent>
					<div className="modal-body">
						<p>
							You are about to delete the certificate: <strong>{certNo}</strong>
							<strong id="delete-cert-number" />
						</p>
						<p>Do you want to proceed?</p>
						<p className="debug-url" />
					</div>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="contained" color="error" onClick={handleClose}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeleteCertificate;
