import { useLocation } from "react-router-dom";
import { Customheader, Custominput } from "../components/Customform";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error404 from "./Error404";
import Servererr from "./Servererr";
import { useState } from "react";
import { BASE_URL } from "../Base";

const Published = () => {
	const location = useLocation();
	const publickey = location.pathname.split("/").reverse()[0];
	// console.log(publickey);
	const [resps, setResps] = useState({});
	const [status, setStatus] = useState(" ");
	const { data, isLoading, isError } = useQuery(["getInputs"], async () => {
		const res = await axios.get(
			`${BASE_URL}/api/createform?publickey=${publickey}`
		);
		return res.data;
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus(`submitting...`);
		try {
			const res = await axios.post(
				`${BASE_URL}/api/response?key=${publickey}`,
				{
					submittedData: resps,
				}
			);
			setStatus(`Response submitted successfully!`);
		} catch (error) {
			// console.log(error.response.data);
			setStatus(`${error.response.data}`);
		}
	};
	const handleRespChange = (e) => {
		setResps({ ...resps, [e.target.name]: e.target.value });
	};

	return (
		<div className="h-screen flex flex-col p-5 pb-20 items-center justify-center bg-gradient-to-r from-slate-200 to-cyan-100">
			<div className=" z-50 flex items-center justify-cente h-4 shadow-inherit fixed top-0 w-full bg-gradient-to-l from-slate-200 to-cyan-100"></div>

			{isLoading ? (
				<h1>Loading..</h1>
			) : isError ? (
				<Servererr />
			) : data &&
			  Array.isArray(data) &&
			  data.length > 0 &&
			  data[0].hasOwnProperty("inputdata") &&
			  data[0].inputdata.length ? (
				<form className=" h-full overflow-scroll no-scrollbar container max-w-3xl flex flex-col gap-6">
					<Customheader
						headtitle={data[0].headtitle}
						headinfo={data[0].headinfo}
					/>
					{data[0].inputdata.map((val, index) => {
						const nam = val.name;
						return (
							<Custominput
								{...val}
								key={index}
								value={resps.value}
								handleRespChange={handleRespChange}
							/>
						);
					})}
					<div className=" flex flex-col items-center justify-center gap-3">
						<span className=" text-xs font-medium text-fuchsia-600">
							{status}
						</span>
						<button
							onClick={handleSubmit}
							className=" bg-cyan-600 text-white font-semibold hover:bg-cyan-700 hover:text-slate-800 px-6 sm:py-2 rounded-xl mx-auto transition-all w-7/12 m-auto"
						>
							submit
						</button>
					</div>
				</form>
			) : (
				<Error404 />
			)}

			<div className=" z-50 flex items-center justify-cente  h-16 px-10 shadow-inherit fixed bottom-0 w-full bg-gradient-to-l from-slate-200 to-cyan-100">
				<div className="flex items-center justify-between w-full">
					<h1 className=" italic text-lg font-bold mx-8">
						Formilder
					</h1>
					<button className=" bg-slate-700 text-white font-bold hover:bg-slate-400 hover:text-slate-800 px-7 sm:py-3 rounded-xl mx-8 transition-all">
						<span className=" font-thin text-xs">
							Powered by &nbsp; &nbsp;&nbsp;
						</span>
						<span className=" font-bold italic">Formilder</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Published;
