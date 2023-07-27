import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../Base";

const Response = () => {
	const [prikey, setPrikey] = useState("");
	const [quer, setQuer] = useState("eslaf");
	const [show, setshow] = useState(false);
	const { data, isLoading, isError, error } = useQuery(
		["myData"],
		async () => {
			const res = await axios.get(`${BASE_URL}/api/response?key=${quer}`);
			return res.data;
		}
	);
	// const data = [
	// 	{
	// 		Dob: "2023-07-13",
	// 		Email: "Prakashkrindia@outlook.com",
	// 		Name: "Prakash Kumar",
	// 		Password: "12",
	// 		createdAt: "2023-07-26T15:59:07.850Z",
	// 		image: "C:\\fakepath\\Signature.jpg",
	// 		mobile: "12",
	// 		updatedAt: "2023-07-26T15:59:07.850Z",
	// 	},
	// ];
	const handlefetch = () => {
		setshow(true);
		setQuer((prev) => prikey);
	};
	// console.log(data);
	return (
		<div className="pt-16 px-10">
			<div className=" flex flex-col p-4">
				<div className="flex w-full items-center justify-center">
					<input
						type="text"
						name="privid"
						placeholder="Enter Private Key"
						className=" outline-none max-w-xl w-full px-3 py-2 bg-slate-100 text-base"
						value={prikey}
						onChange={(e) => setPrikey(e.target.value)}
					/>
					<label
						htmlFor="privid"
						className=" bg-slate-200 px-5 py-2 border-none shadow text-center font-semibold"
						onClick={handlefetch}
					>
						Get Responses
					</label>
				</div>
				{!show ? (
					<div className=" flex w-full items-center justify-center h-96">
						<span className=" max-w-lg text-lg font-bold h-16 text-justify">
							Enter private key and click on Get Responses to
							fetch data.
						</span>
					</div>
				) : isLoading ? (
					<div className=" flex w-full items-center justify-center h-96">
						<span className=" max-w-lg text-lg font-bold h-16 text-justify">
							Loading...
						</span>
					</div>
				) : error ? (
					<div className=" flex w-full items-center justify-center h-96">
						<span className=" max-w-lg text-lg font-bold h-16 text-justify">
							{error.response.data}
						</span>
					</div>
				) : (
					<div className=" p-10 border flex items-center justify-center">
						<div className="tableCon shadow">
							<table className=" w-full border bg-white shadow-md rounded-lg ">
								<thead className="bg-gray-100">
									<tr>
										{Object.keys(data[0]).map((key) => {
											return (
												<th
													className="px-4 py-2"
													key={key}
												>
													{key}
												</th>
											);
										})}
									</tr>
								</thead>

								<tbody className=" min-w-max">
									{data.map((valObj, index) => {
										return (
											<tr key={index}>
												{Object.keys(valObj).map(
													(key) => {
														return (
															<td
																className="border px-4 py-2"
																key={key}
															>
																{valObj[key]}
															</td>
														);
													}
												)}
											</tr>
										);
									})}
								</tbody>
								<tfoot>
									<tr>
										<td
											className="border px-4 py-2"
											colSpan="3"
										>
											Total: {data.length} entries
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Response;
