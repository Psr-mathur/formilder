import React from "react";

const Servererr = () => {
	return (
		<body className="bg-gradient-to-r from-slate-400 to-neutral-400 flex items-center justify-center h-screen w-full">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
				<h1 className="text-4xl font-bold mb-6 text-gray-800">
					Oops! Something went wrong.
				</h1>
				<p className="text-lg text-gray-600 mb-8">
					We apologize for the inconvenience. Please try again later.
				</p>
				<a
					href="/"
					className=" bg-slate-900 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
				>
					Go Home
				</a>
			</div>
		</body>
	);
};

export default Servererr;
