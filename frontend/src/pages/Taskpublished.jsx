import React, { useReducer, useState } from "react";
import Servererr from "./Servererr";
import Error404 from "./Error404";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../Base";
import { useLocation } from "react-router-dom";
import { CategorizeInput } from "../components/CategorizeInput";
import { ClozeInput } from "../components/ClozeInput";
import ComprehensionInput from "../components/ComprehensionInput";
import {
	SavedResponseInitialState,
	SavedResponseReducer,
} from "../Reducer/SavedResponseReducer";
import NormalInput from "../components/NormalInput";

const Taskpublished = ({}) => {
	const [status, setStatus] = useState(" ");
	const location = useLocation();
	const publickey = location.pathname.split("/").reverse()[0];
	const { data, isLoading, isError } = useQuery(["taskinputs"], async () => {
		const res = await axios.get(
			`${BASE_URL}/api/createtask?publickey=${publickey}`
		);
		return res.data;
	});
	const [savedResponse, disPatchSavedResponse] = useReducer(
		SavedResponseReducer,
		SavedResponseInitialState
	);

	const handleChangeResponse = (qnNO, response) => {
		disPatchSavedResponse({
			type: "change",
			payload: {
				qnNO: qnNO,
				response: response,
			},
		});
	};

	const handleSubmitResponse = async (e) => {
		e.preventDefault();
		setStatus(`submitting...`);
		try {
			const res = await axios.post(
				`${BASE_URL}/api/taskresponse?key=${publickey}`,
				{
					submittedData: savedResponse,
				}
			);
			setStatus(`Response submitted successfully!`);
		} catch (error) {
			// console.log(error.response.data);
			if (error && error.response) setStatus(`${error.response.data}`);
			else setStatus("Some error Occoured. Please try after Sometime.");
		}
	};
	// console.log(data);
	// console.log(savedResponse);

	return (
		<div className="h-screen flex flex-col p-5 pb-20 items-center justify-center bg-gradient-to-r from-slate-200 to-cyan-100">
			<div className=" z-50 flex items-center justify-cente h-4 shadow-inherit fixed top-0 w-full bg-gradient-to-l from-slate-200 to-cyan-100"></div>

			{isLoading ? (
				<h1>Loading..</h1>
			) : isError ? (
				<Servererr />
			) : data[0] && data[0].data.head ? (
				<form className=" h-full overflow-scroll no-scrollbar container max-w-3xl flex flex-col gap-6 border border-green-200 shadow">
					<div className=" flex flex-col items-center justify-center p-3 gap-2 shadow bg-lime-50">
						<h1 className=" text-2xl font-bold text-justify">
							{data[0].data.head.title}
						</h1>
						<p className=" font-thin text-base text-justify">
							{data[0].data.head.description}
						</p>
						{data[0].data.head.url && (
							<img
								className=" headpic"
								src={data[0].data.head.url}
							/>
						)}
					</div>
					{data[0].data.allqns.map((val, ind) => {
						if (val.type == 0) {
							return (
								<CategorizeInput
									key={ind}
									qnNo={ind + 1}
									ibArr={val.ibArr}
									ctgrysArr={val.ctgrysArr}
									handleChangeResponse={(q, r) =>
										handleChangeResponse(q, r)
									}
								/>
							);
						}
						if (val.type == 1) {
							return (
								<ClozeInput
									key={ind}
									qnNo={ind + 1}
									sentence={val.sentence}
									hiddenWords={val.hiddenWords}
									options={val.options}
									handleChangeResponse={(q, r) =>
										handleChangeResponse(q, r)
									}
								/>
							);
						}
						if (val.type == 2) {
							return (
								<ComprehensionInput
									key={ind}
									qnNO={ind + 1}
									images={val.images}
									comprehension={val.comprehension}
									questions={val.questions}
									handleChangeResponse={(q, r) =>
										handleChangeResponse(q, r)
									}
								/>
							);
						}
						if (val.type == 3) {
							return (
								<NormalInput
									key={ind}
									qnNO={ind + 1}
									{...val}
									handleChangeResponse={(q, r) =>
										handleChangeResponse(q, r)
									}
								/>
							);
						}
					})}
					<div className=" flex flex-col items-center justify-center gap-3 pb-14">
						<span className=" text-xs font-medium text-fuchsia-600">
							{status}
						</span>
						<button
							onClick={handleSubmitResponse}
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

export default Taskpublished;
