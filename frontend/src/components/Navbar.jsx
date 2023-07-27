import React from "react";

const Navbar = () => {
	return (
		<div className=" z-50 flex items-center justify-cente bg-slate-100 h-16 px-10 shadow-inherit fixed top-0 w-full">
			<div className="flex items-center justify-between w-full">
				<h1 className=" italic text-lg font-bold mx-8">Formilder</h1>
				<button className=" bg-slate-700 text-white font-bold hover:bg-slate-400 hover:text-slate-800 min-w-max px-7 py-3 rounded-xl mx-8 transition-all">
					It's free
				</button>
			</div>
		</div>
	);
};

export default Navbar;
