import React from "react";

const Footer = () => {
	return (
		<>
			{/* <h1>Footer</h1> */}
			{/* BEGIN FOOTER */}
			<div
				className="page-footer"
				// style={{ zIndex: "4" }}
			>
				<div className="page-footer-inner">
					<span id="footerCurrentYear"></span> &copy; Xebra Portal By Aztec
					Internet Solutions
				</div>
				<div className="scroll-to-top">
					<i className="icon-arrow-up"></i>
				</div>
			</div>
			{/* END FOOTER */}
		</>
	);
};

export default Footer;
