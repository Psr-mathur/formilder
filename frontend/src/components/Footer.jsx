import React from "react";

const Footer = () => {
	return (
		<div className="footer w-full bg-slate-300 flex flex-col sm:flex-row justify-around items-center">
			<footer className=" flex gap-4 items-center justify-around pt-2 flex-1">
				<a
					href="https://github.com/Psr-mathur"
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<i className="fa-brands fa fa-github fa-2x"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/prakash-kumar-a9685a190/"
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<i className="fa-brands fa fa-linkedin fa-2x"></i>
				</a>
				<a href="" style={{ textDecoration: "none", color: "inherit" }}>
					<i className="fa-brands fa fa-instagram fa-2x"></i>
				</a>
			</footer>
			<footer className="text-center text-lg-start flex-1">
				<div className="text-center p-3">
					© 2023 Copyright:
					<span>&nbsp; Contact me for Source Code.</span>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
