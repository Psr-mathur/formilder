import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
	return (
		<div className=" pt-16 ">
			<div className=" flex flex-col gap-5 items-center justify-center px-10">
				<h1 className=" text-5xl font-bold mt-16">
					Welcome to Formilder!
				</h1>
				<span className=" text-lg text-fuchsia-700 font-medium">
					{" "}
					Your Free Form Builder
				</span>
				<h3 className="text-lg text-slate-700 font-medium mt-10">
					Create Stunning Forms with Ease
				</h3>
				<p className="text-lg text-slate-500 font-thin max-w-4xl text-justify my-10">
					Formilder is your go-to platform for building and managing
					beautiful forms without any hassle. Whether you need simple
					contact forms, detailed surveys, event registrations, or any
					other type of form, Formilder has got you covered.
				</p>
				<div className=" flex gap-10">
					<Link
						to="/createform"
						className=" bg-purple-400 text-white font-bold hover:bg-slate-400 hover:text-slate-800 px-7 sm:py-3 rounded-xl transition-all inline-block"
					>
						Get Started
					</Link>
					<Link
						to="/response"
						className=" bg-purple-400 text-white font-bold hover:bg-slate-400 hover:text-slate-800 px-7 sm:py-3 rounded-xl transition-all inline-block"
					>
						View Responses
					</Link>
				</div>
				<div className=" flex gap-10">
					<Link
						to="/task"
						className=" bg-purple-400 text-white font-bold hover:bg-slate-400 hover:text-slate-800 px-7 sm:py-3 rounded-xl transition-all inline-block"
					>
						Get Started T
					</Link>
					<Link
						to="/taskresponse"
						className=" bg-purple-400 text-white font-bold hover:bg-slate-400 hover:text-slate-800 px-7 sm:py-3 rounded-xl transition-all inline-block"
					>
						View Responses T
					</Link>
				</div>
				<p className="text-lg text-slate-500 font-thin max-w-3xl text-justify italic my-10">
					Create unlimited forms without breaking the bank! Formilder
					offers a powerful and free form builder that puts the
					control in your hands. Whether you're a small business
					owner, blogger, or non-profit organization, our free plan
					has everything you need to collect data and engage with your
					audience.
				</p>

				<div className=" flex flex-col">
					<h3 className=" text-xl font-bold">Why Formilder ?</h3>
					<span className=" text-lg my-3 font-thin">
						&#x2022; &nbsp;&nbsp;&nbsp;&nbsp;It's Free , No Hidden
						Costs.
					</span>
					<span className=" text-lg my-3 font-thin">
						&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Unlimited Forms,
						Unlimited Responses.
					</span>
					<span className=" text-lg my-3 font-thin">
						&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Easy to Use, No Coding
						Required.
					</span>
					<span className=" text-lg my-3 font-thin">
						&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Responsive Forms for All
						Devices.
					</span>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
