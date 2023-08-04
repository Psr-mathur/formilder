import React, { useContext, useReducer, useState } from "react";
import Footer from "../components/Footer";
import Comprehension from "../components/Comprehension";
import Cloze from "../components/Cloze";
import Categorize from "../components/Categorize";
import {
	CategorizeContext,
	ClozeContext,
	ComprehensionContext,
} from "../Contextapi/createcontext";
import { DemoReducer, demoIS } from "../Reducer/DemoReducer";
import { CategorizeInput } from "../components/CategorizeInput";
import { ClozeInput } from "../components/ClozeInput";
import ComprehensionInput from "../components/ComprehensionInput";
import ShortUniqueId from "short-unique-id";
import { BASE_UI_URL, BASE_URL } from "../Base";
import { imagekitupload2 } from "../imagekitsetup";
import axios from "axios";

const toqArr = ["Categorize", "Cloze", "Comprehension"];
const toqComp = [<Categorize />, <Cloze />, <Comprehension />];

const Task = () => {
	const uid = new ShortUniqueId();
	const [selectedQnTypeInd, setSelectedQnTypeInd] = useState(0);
	const { getstate: categstate, resetCateg } = useContext(CategorizeContext);
	const { getstate: clozestate, resetCloze } = useContext(ClozeContext);
	const { getstate: compstate, resetCompr } =
		useContext(ComprehensionContext);

	const [isOpen, setIsOpen] = useState(false);
	const [para, setpara] = useState(["Your form will look like this..."]);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	// console.log(selectedQnTypeInd);

	const [demo, demoDispatch] = useReducer(DemoReducer, demoIS);

	const handleDemoInsert = (e) => {
		// console.log("ins", selectedQnTypeInd);
		if (selectedQnTypeInd == 0) {
			demoDispatch({
				type: "INSERT_TO_DEMO",
				payload: {
					type: 0,
					ctgrysArr: categstate.ctgrysArr,
					ibArr: categstate.ibArr,
				},
			});
			resetCateg();
		} else if (selectedQnTypeInd == 1) {
			demoDispatch({
				type: "INSERT_TO_DEMO",
				payload: {
					type: 1,
					sentence: clozestate.sentence,
					hiddenWords: clozestate.hiddenWords,
					options: clozestate.options,
				},
			});
			resetCloze();
		} else if (selectedQnTypeInd == 2) {
			demoDispatch({
				type: "INSERT_TO_DEMO",
				payload: {
					type: 2,
					images: compstate.images,
					comprehension: compstate.comprehension,
					questions: compstate.questions,
				},
			});
			resetCompr();
		}
	};

	const handleChangeHeadTD = (e) => {
		demoDispatch({
			type: "CHANGE_HEAD_T&D",
			payload: {
				name: e.target.name,
				value: e.target.value,
			},
		});
	};
	const handleHeadFileChange = (e) => {
		let file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				const url = reader.result;
				demoDispatch({
					type: "CHANGE_FILE&URL",
					payload: {
						file: file,
						url: url,
					},
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadToDatabase = async (d) => {
		setpara(["Uploading Images ...."]);
		let newDemo = d.demo;
		let newallqns = newDemo.allqns;
		for (let i = 0; i < newallqns.length; i++) {
			if (newallqns[i].type == 2) {
				let fileurl = "";
				for (let j = 0; j < newallqns[i].images.length; j++) {
					let file = newallqns[i].images[j].file;
					if (!file) continue;
					fileurl = await imagekitupload2(file);

					newallqns[i].images[j].url = fileurl;
					newallqns[i].images[j].file = null;
				}
			}
		}

		try {
			const res = await axios.post(`${BASE_URL}/api/createtask`, {
				data: newDemo,
				privatekey: d.priv,
				publickey: d.pub,
			});
			const data = await res.data;
			setpara([
				"Your Form is pulished.",
				`Private Key : ${data.privatekey}`,
				"Save this key to view responses of your form.",
				`${BASE_UI_URL}/#/taskpublished/${data.publickey}`,
			]);
			return data;
		} catch (error) {
			setpara(["Something went wrong ! please try again later."]);
			return null;
		}
	};

	const handlePublish = async () => {
		console.log("ge");
		setpara(["Publishing please wait ..."]);
		const pub = uid();
		const priv = uid();
		// console.log(demo);
		uploadToDatabase({ demo, pub, priv });
	};
	// console.log(demo);
	return (
		<div className=" pt-16 ">
			<div className=" pt-5 pb-5 w-full flex items-start justify-between gap-3 px-10">
				<div className=" order-1 w-1/3 shadow h-screen overflow-y-scroll no-scrollbar">
					{isOpen && (
						<div className="fixed inset-0 flex items-center justify-start bg-black bg-opacity-50 px-10">
							<div className="flex flex-col gap-3 bg-slate-100 rounded-lg p-8 h-3/4 w-1/3">
								<input
									type="text"
									name="title"
									placeholder="Title"
									className=" px-2 py-4"
									value={demo.head.title}
									onChange={handleChangeHeadTD}
								/>
								<textarea
									name="description"
									placeholder="Description"
									className=" px-2 pt-4 pb-24"
									value={demo.head.description}
									onChange={handleChangeHeadTD}
								/>
								<input
									type="file"
									accept="image/*"
									name="file"
									className=" w-full border bg-white cursor-pointer"
									onChange={handleHeadFileChange}
								/>
								<button
									className="px-4 py-2 mt-4 bg-slate-400 text-white rounded"
									onClick={closeModal}
								>
									Close
								</button>
							</div>
						</div>
					)}
					<div className=" flex bg-slate-500 h-14 items-center justify-around">
						<label
							className=" font-semibold text-white"
							htmlFor="toq"
						>
							Type of Question : &nbsp; &nbsp;&nbsp;
						</label>
						<select
							className=" outline-none bg-slate-500 text-amber-200"
							value={selectedQnTypeInd}
							onChange={(e) =>
								setSelectedQnTypeInd(e.target.value)
							}
						>
							{toqArr.map((val, index) => {
								return (
									<option value={index} key={index}>
										{val}
									</option>
								);
							})}
						</select>
						<button
							className="px-2 py-2 bg-slate-300 text-black rounded"
							onClick={openModal}
						>
							Set Header
						</button>
					</div>
					{toqComp[selectedQnTypeInd]}
					<div className=" flex items-center justify-center p-3">
						<button
							className=" bg-slate-700 text-white font-semibold hover:bg-slate-400 hover:text-slate-800 px-6 sm:py-2 rounded-xl mx-8 transition-all"
							onClick={handleDemoInsert}
						>
							Add
						</button>
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
						<div className=" flex flex-col items-center justify-center p-3 gap-2 shadow">
							<h1 className=" text-2xl font-bold">
								{demo.head.title}
							</h1>
							<p className=" font-thin text-base">
								{demo.head.description}
							</p>
							{demo.head.url && (
								<img className=" headpic" src={demo.head.url} />
							)}
						</div>
						{demo.allqns.map((val, ind) => {
							if (val.type == 0) {
								return (
									<CategorizeInput
										key={ind}
										ibArr={val.ibArr}
										ctgrysArr={val.ctgrysArr}
										qnNo={ind + 1}
										handleChangeResponse={() => {}}
									/>
								);
							}
							if (val.type == 1) {
								return (
									<ClozeInput
										key={ind}
										sentence={val.sentence}
										hiddenWords={val.hiddenWords}
										options={val.options}
										qnNo={ind + 1}
										handleChangeResponse={() => {}}
									/>
								);
							}
							if (val.type == 2) {
								return (
									<ComprehensionInput
										key={ind}
										questions={val.questions}
										comprehension={val.comprehension}
										images={val.images}
										qnNO={ind + 1}
										handleChangeResponse={() => {}}
									/>
								);
							}
						})}
						<div>
							<button className=" bg-slate-700 text-white font-semibold hover:bg-slate-400 hover:text-slate-800 px-6 sm:py-2 rounded-xl mx-8 transition-all">
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Task;
