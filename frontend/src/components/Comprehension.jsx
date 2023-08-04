import React, { useContext } from "react";
import { ComprehensionContext } from "../Contextapi/createcontext";
import ShortUniqueId from "short-unique-id";

const CreateQuestion = ({ val, index }) => {
	const uid = new ShortUniqueId();
	const randomid = uid();
	const {
		getstate: comstate,
		handleAddOption,
		handleChangeInput,
		handleQnImgChange,
	} = useContext(ComprehensionContext);
	console.log(comstate);
	return (
		<fieldset className="p-4 border bg-purple-50">
			<legend className=" font-semibold text-xs">Qn.{index + 1}</legend>
			<div className="space-y-4">
				<textarea
					name="question"
					placeholder="What's your question?"
					className=" w-full text-xs outline-none border p-3 pb-8"
					value={comstate.questions[index].question}
					onChange={(e) => handleChangeInput(e, index)}
				/>
			</div>
			<div className=" flex flex-col items-center justify-center">
				<div className="my-3 relative border border-dashed p-2 cursor-pointer shadow bg-rose-50">
					<input
						type="file"
						accept="image/*"
						id={`image${index}`}
						className=" hidden"
						onChange={(e) => handleQnImgChange(e, index)}
					/>
					<label
						htmlFor={`image${index}`}
						className=" text-ellipsis p-1 whitespace-nowrap cursor-pointer"
					>
						{comstate.images[index].file
							? comstate.images[index].file.name
							: "ADD IMAGE"}
					</label>
				</div>
			</div>
			<div className=" flex gap-2 px-3 ">
				<input
					className=" py-1 px-3 flex-1 outline-none shadow bg-slate-200"
					type="text"
					name="option"
					placeholder="create option"
					value={comstate.questions[index].option}
					onChange={(e) => handleChangeInput(e, index)}
				/>
				<button
					className=" bg-slate-400 px-5 py-1 text-yellow-50 font-bold shadow"
					onClick={(e) => handleAddOption(e, index)}
				>
					<abbr title="Add Option" style={{ textDecoration: "none" }}>
						+
					</abbr>
				</button>
			</div>
			<div className=" mt-2 px-3 py-2 grid grid-cols-2 items-center justify-center">
				{comstate.questions[index].options.map((val, ind) => {
					return (
						<div
							className="w-full h-full border text-center"
							key={ind}
						>
							{val}
						</div>
					);
				})}
			</div>
		</fieldset>
	);
};

const Comprehension = () => {
	const {
		getstate: comstate,
		handleChangeComprehension,
		handleIncreaseQn,
	} = useContext(ComprehensionContext);
	console.log(comstate);
	return (
		<div className=" bg-slate-100 px-3 py-5">
			<div className="border bg-white">
				<div className="w-full h-fit border flex flex-col gap-5 items-center justify-center p-3 mb-10">
					<textarea
						name="comprehension"
						placeholder="Write Passage Here"
						className=" w-full text-xs outline-none border p-3 pb-32"
						value={comstate.comprehension}
						onChange={handleChangeComprehension}
						required
					/>
				</div>
				<div className=" flex flex-col">
					<h1 className="text-md font-bold mb-4">Questions:</h1>
					{comstate.questions.map((val, ind) => {
						return (
							<CreateQuestion key={ind} index={ind} val={val} />
						);
					})}
				</div>
				<div className=" flex p-3">
					<abbr
						title="Create question"
						style={{ textDecoration: "none" }}
					>
						<button
							className=" bg-purple-400 h-12 w-12 text-center text-slate-700 font-bold shadow text-2xl rounded-full"
							onClick={handleIncreaseQn}
						>
							+
						</button>
					</abbr>
				</div>
			</div>
		</div>
	);
};

export default Comprehension;
