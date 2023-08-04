import React, { useContext } from "react";
import { ClozeContext } from "../Contextapi/createcontext";
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

const SortableList = ({ value, id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: id });
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className=" flex gap-2"
		>
			<span>&#9783;</span>
			<span>{value}</span>
		</div>
	);
};

const TohideCom = ({ value, id }) => {
	// console.log(value);

	const { deleteHideCom } = useContext(ClozeContext);

	return (
		<button className=" h-10">
			<span className="bg-slate-200 py-2 px-3 cursor-text">{value}</span>
			<span
				className=" bg-white p-2 text-rose-400 cursor-pointer"
				onClick={() => deleteHideCom(id)}
			>
				X
			</span>
		</button>
	);
};

const replaceWordWithUnderscores = (inputString, wordToReplace) => {
	const regex = new RegExp(`\\b${wordToReplace}\\b`, "gi");
	const underscores = "_".repeat(10);
	return inputString.replace(regex, underscores);
};

const Cloze = () => {
	const {
		getstate: clozestate,
		handleAddHide,
		handleChange,
		handleAddOptions,
		ChangeOptionsArray,
	} = useContext(ClozeContext);

	// console.log(clozestate);
	const handleDragEnd = (event) => {
		const { active, over } = event;
		// console.log(active.id, over.id);
		if (active.id !== over.id) {
			const arr = arrayMove(
				clozestate.options,
				active.id - 1,
				over.id - 1
			);
			// console.log(arr);
			ChangeOptionsArray(arr);
		}
	};

	let updatedSen = clozestate.sentence;
	for (let word of clozestate.hiddenWords) {
		updatedSen = replaceWordWithUnderscores(updatedSen, word);
	}

	return (
		<div className=" bg-slate-100 px-3 py-5">
			<div className="border bg-white p-3">
				<fieldset className=" border p-2">
					<legend className="font-semibold">Preview</legend>
					<p>{updatedSen}</p>
				</fieldset>
				<div>
					<h4 className=" text-lg my-2 font-semibold">Sentence :</h4>
					<textarea
						className=" py-1 px-3 flex-1 outline-none shadow w-full bg-slate-50"
						name="sentence"
						rows="3"
						placeholder="write sentence here ..."
						value={clozestate.sentence}
						onChange={handleChange}
					/>
				</div>
				<fieldset className=" border p-2">
					<legend className=" text-md font-semibold my-2">
						Add Hidden words :{" "}
					</legend>
					<div className=" flex flex-wrap gap-2 py-3">
						{clozestate.hiddenWords.map((word, index) => {
							return (
								<TohideCom
									value={word}
									key={index}
									id={index}
								/>
							);
						})}
					</div>
					<div className="flex gap-2 " id="cates">
						<input
							className=" py-1 px-3 flex-1 outline-none shadow"
							type="text"
							name="tohide"
							value={clozestate.tohide}
							onChange={handleChange}
						/>
						<button
							className=" bg-slate-400 px-5 py-1 text-yellow-50 font-bold shadow"
							onClick={handleAddHide}
						>
							+
						</button>
					</div>
				</fieldset>

				<fieldset className="border p-2">
					<legend className=" text-md font-semibold my-2">
						Create options :
					</legend>
					<div className="flex gap-2">
						<input
							className=" py-1 px-3 flex-1 outline-none shadow bg-blue-50"
							type="text"
							name="opt"
							value={clozestate.opt}
							onChange={handleChange}
						/>
						<button
							className=" bg-slate-400 px-5 py-1 text-yellow-50 font-bold shadow"
							onClick={handleAddOptions}
						>
							+
						</button>
					</div>
					<div className="flex gap-2 flex-col px-3">
						<p className=" text-base my-2">Created options :</p>
						<div className=" flex flex-col gap-2 px-3">
							<DndContext
								collisionDetection={closestCenter}
								onDragEnd={handleDragEnd}
							>
								<SortableContext
									items={clozestate.options}
									strategy={verticalListSortingStrategy}
								>
									{clozestate.options.map((v, i) => {
										return (
											<SortableList
												value={v}
												key={i}
												id={i + 1}
											/>
										);
									})}
								</SortableContext>
							</DndContext>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	);
};

export default Cloze;
