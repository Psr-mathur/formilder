import React from "react";

const Error404 = () => {
	return (
		<div className="gradient text-white min-h-screen flex items-center w-full">
			<div className="container mx-auto p-4 flex flex-wrap items-center">
				<div className="w-full md:w-5/12 text-center p-4">
					<img
						className=" shadow-inherit"
						src="https://cdn.dribbble.com/users/3995683/screenshots/9601030/media/f632ec99e4106e4d044c91f4c3faed2c.png?resize=1000x750&vertical=center"
						alt="Not Found"
					/>
				</div>
				<div className="w-full md:w-7/12 text-center md:text-left p-4">
					<div className="text-xl md:text-3xl font-medium mb-4">
						Oops. This page has gone missing.
					</div>
					<div className="text-lg mb-8">
						You may have mistyped the address or the page may have
						moved.
					</div>
					<a href="/" className="border border-white rounded p-4">
						Go Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default Error404;
