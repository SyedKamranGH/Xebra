import React from "react";
import { Button, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import image1 from "../../../assets/1.jpg";
import image2 from "../../../assets/2.jpg";
import image3 from "../../../assets/3.jpg";
import image4 from "../../../assets/4.jpg";
import image5 from "../../../assets/5.jpg";
import InputField from "../../../Components/Shared/InputField";
// import ImageSlider from "../../../Components/Shared/ImageSlider";

import "./style.css";
import { CheckBox } from "@mui/icons-material";
import ImageSlider from "../../Shared/ImageSlider";

const UserManagement = () => {
	return (
		<>
			<div className="containerStyle">
				<ImageSlider images={[image1, image2, image3, image4, image5]}>
					{/* BEGIN LOGO */}
					<div className="logo">
						<a href="index.html">
							<img src="images/SGI_LOGO.png" alt />
						</a>
					</div>
					{/* END LOGO */}
				</ImageSlider>
			</div>
		</>
	);
};

export default UserManagement;
