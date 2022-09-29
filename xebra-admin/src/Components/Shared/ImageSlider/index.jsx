import React, { useEffect, useState } from "react";
import "./style.css";

const ImageSlider = ({
	images = [],
	autoPlay = true,
	autoPlayTime = 6000,
	children,
	...props
}) => {
	// console.log("images: ", images);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			const newSlideIndex =
				currentSlide >= images.length - 1 ? 0 : currentSlide + 1;
			setCurrentSlide(newSlideIndex);
		}, autoPlayTime);

		return () => clearTimeout(timer);
	}, [currentSlide]);
	return (
		<>
			{/* ImageSlider */}
			<div className="wrapper" {...props}>
				{/* <div className="slideContainer"> */}
				{images.map((imageUrl, index) => (
					<div
						className="slide"
						key={index}
						style={{
							backgroundImage: `url(${imageUrl})`,
							marginLeft: index === 0 ? `-${currentSlide * 100}%` : "unset",
						}}></div>
				))}
				{/* </div> */}
				<div className="gradient" />
				<div className="childrenWrapper">{children}</div>
			</div>
		</>
	);
};

export default ImageSlider;
