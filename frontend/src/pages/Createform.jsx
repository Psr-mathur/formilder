import React, { useState } from "react";
import ShortUniqueId from "short-unique-id";
import { Customheader, Custominput } from "../components/Customform";
import axios from "axios";
import Footer from "../components/Footer";
import { BASE_URL, BASE_UI_URL } from "../Base";

const Createform = () => {
	const uid = new ShortUniqueId();
	const [para, setpara] = useState(["Your form will look like this..."]);
	const [Resp, setResp] = useState(null);
	const [selectedData, setSelecteddata] = useState({
		inputtitle: "",
		selectedType: "text",
		inputRequired: "",
		maxlength: "144",
		inputPlaceholder: " ",
	});
	const handleDatachange = (e) => {
		setSelecteddata({ ...selectedData, [e.target.name]: e.target.value });
	};
	const [headerData, setHeaderData] = useState({
		headtitle: "Company",
		headinfo: "write any info or anything you want share with form.",
	});
	const handleheaderData = (e) => {
		setHeaderData({ ...headerData, [e.target.name]: e.target.value });
	};
	const [toshow, setToshow] = useState([
		{
			inputtitle: "Email",
			selectedType: "email",
			inputRequired: "true",
			maxlength: "190",
			inputPlaceholder: " ",
		},
	]);
	const handleInsert = () => {
		setToshow((prev) => {
			return [...prev, selectedData];
		});
		setSelecteddata({
			inputtitle: "",
			selectedType: "text",
			inputRequired: "",
			maxlength: "144",
			inputPlaceholder: " ",
		});
	};
	const postcfTodb = async (d) => {
		try {
			const res = await axios.post(`${BASE_URL}/api/createform`, {
				data: d.toshow,
				privatekey: d.priv,
				publickey: d.pub,
				headtitle: d.headerData.headtitle,
				headinfo: d.headerData.headinfo,
			});
			const data = await res.data;
			setpara([
				"Your Form is pulished.",
				`Private Key : ${data.privatekey}`,
				"Save this key to view responses of your form.",
				`${BASE_UI_URL}/#/published/${data.publickey}`,
			]);
			return data;
		} catch (error) {
			setpara(["Something went wrong ! please try again later."]);
			return null;
		}
	};
	// console.log(uid());
	const handlePublish = async () => {
		setpara(["Publishing please wait ..."]);
		const pub = uid();
		const priv = uid();
		// postcfdata.mutate({ toshow, pub, priv, headerData });
		const data = postcfTodb({ toshow, pub, priv, headerData });
	};
	return (
		<div className=" pt-16 ">
			<div className=" pt-5 pb-5 w-full flex items-start justify-between gap-3 px-5 xl:px-10">
				<div className=" order-1 w-1/3 shadow h-screen overflow-y-scroll no-scrollbar">
					<div className=" px-5 xl:px-14 py-10 flex flex-col gap-3 items-center">
						<div className=" relative w-full h-fit border flex flex-col gap-5 items-center justify-center p-3 mb-10">
							<textarea
								name="headtitle"
								placeholder="Set Header Title"
								className=" w-full font-bold text-lg outline-none border p-3"
								value={headerData.headtitle}
								onChange={handleheaderData}
							/>
							<textarea
								name="headinfo"
								placeholder="Write Info here"
								className=" w-full text-justify font-thin outline-none border h-32 p-3"
								value={headerData.headinfo}
								onChange={handleheaderData}
							/>
						</div>
						<div className=" relative w-full h-fit border group">
							<input
								className=" w-full h-full py-3 pl-28 outline-none peer"
								name="inputtitle"
								type="text"
								placeholder=" "
								required={true}
								onChange={handleDatachange}
							/>
							<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
								Input Title
							</label>
						</div>
						<div className=" relative w-full h-fit border group">
							<p className=" px-3">
								Please select the type of Input:
							</p>
							<input
								className=" ml-10"
								type="radio"
								id="text"
								name="selectedType"
								value="text"
								onChange={handleDatachange}
							/>
							<label className=" ml-10" htmlFor="text">
								text
							</label>
							<br />
							<input
								className=" ml-10"
								type="radio"
								id="email"
								name="selectedType"
								value="email"
								onChange={handleDatachange}
							/>
							<label className=" ml-10" htmlFor="email">
								email
							</label>
							<br />
							<input
								className=" ml-10"
								type="radio"
								id="password"
								name="selectedType"
								value="password"
								onChange={handleDatachange}
							/>
							<label className=" ml-10" htmlFor="password">
								password
							</label>
							<br />
							<input
								className=" ml-10"
								type="radio"
								id="number"
								name="selectedType"
								value="number"
								onChange={handleDatachange}
							/>
							<label className=" ml-10" htmlFor="number">
								number
							</label>
							<br />
							<input
								className=" ml-10"
								type="radio"
								id="file"
								name="selectedType"
								value="file"
								onChange={handleDatachange}
							/>
							<label className=" ml-10" htmlFor="file">
								file
							</label>
							<br />
							<input
								className=" ml-10"
								type="radio"
								id="date"
								name="selectedType"
								value="date"
								onChange={handleDatachange}
							/>
							<label className=" ml-10" htmlFor="date">
								date
							</label>
						</div>
						<div className=" relative w-full h-fit border group">
							<input
								className=" w-full h-full py-3 pl-28 outline-none peer"
								name="inputRequired"
								type="text"
								placeholder="true or false"
								required={true}
								onChange={handleDatachange}
							/>
							<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
								Required
							</label>
						</div>
						<div className=" relative w-full h-fit border group">
							<input
								className=" w-full h-full py-3 pl-28 outline-none peer"
								name="inputPlaceholder"
								type="text"
								placeholder=" "
								onChange={handleDatachange}
							/>
							<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
								Placeholder
							</label>
						</div>
						<div className=" flex flex-col items-center justify-center h-fit border p-3 w-full group">
							<label className=" w-full">
								Max length = {selectedData.maxlength}
							</label>
							<input
								className=" w-full h-full py-3 outline-none peer"
								name="maxlength"
								type="range"
								min={5}
								max={200}
								required={true}
								value={selectedData.maxlength}
								onChange={handleDatachange}
							/>
						</div>
						<div className=" pb-16">
							<button
								className=" bg-slate-700 text-white font-semibold hover:bg-slate-400 hover:text-slate-800 px-6 sm:py-2 rounded-xl mx-8 transition-all"
								onClick={handleInsert}
							>
								Add
							</button>
						</div>
					</div>
				</div>

				<div className=" order-2 w-2/3 shadow">
					<div className=" px-14 py-10 flex flex-col gap-3 items-center">
						<div className=" w-full flex items-center justify-between">
							<div className=" font-thin pl-3">
								{para.length == 1 ? (
									para[0]
								) : (
									<>
										<p>{para[0]}</p>
										<p>
											<span className=" font-semibold">
												{para[1]}
											</span>{" "}
											{para[2]}
										</p>
										<p>
											Form Link :{" "}
											<a
												className=" underline text-blue-500"
												href={para[3]}
											>
												{para[3]}
											</a>
										</p>
									</>
								)}
							</div>
							<button
								className=" bg-red-400 text-white font-semibold hover:bg-red-600 hover:text-slate-800 px-6 sm:py-2 rounded-xl mx-8 transition-all"
								onClick={handlePublish}
							>
								Publish
							</button>
						</div>
						<Customheader
							headtitle={headerData.headtitle}
							headinfo={headerData.headinfo}
						/>
						{toshow.map((val, index) => {
							return <Custominput key={index} {...val} />;
						})}
						<div>
							<abbr title="This is just for demo purpose.">
								<button className=" bg-slate-700 text-white font-semibold hover:bg-slate-400 hover:text-slate-800 px-6 sm:py-2 rounded-xl mx-8 transition-all">
									Submit
								</button>
							</abbr>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Createform;
