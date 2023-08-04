import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const replaceWordWithUnderscores = (inputString, wordToReplace) => {
	const regex = new RegExp(`\\b${wordToReplace}\\b`, "gi");
	const underscores = "_".repeat(12);
	return inputString.replace(regex, underscores);
};

const CustomText = ({ updatedSen, qnNo }) => {
	const placeholder = "____________";
	const segments = updatedSen.split(" ");

	return (
		<div
			className=" flex items-center justify-center flex-wrap gap-1"
			id={`answer${qnNo}`}
		>
			{segments.map((segment, index) => {
				if (segment == placeholder)
					return <Droppable key={index} id={`drop${index}${qnNo}`} />;
				else
					return (
						<div key={index} className="">
							{segment}
						</div>
					);
			})}
		</div>
	);
};

const Droppable = ({ id }) => {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	const style = {
		opacity: isOver ? 1 : 0.8,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			key={id}
			id={id}
			className=" h-10 minwidth border border-dashed border-purple-700 bg-rose-50 flex items-center justify-center"
			tocheck="fordroppingelementfromonetoanother"
		></div>
	);
};

const Draggable = ({ val, id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useDraggable({
			id: id,
		});
	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			id={id}
			className=" h-full px-3 py-1 bg-purple-400 rounded-md text-white"
		>
			{val}
		</button>
	);
};

function getAllInnerText(element) {
	let innerText = "";

	function traverse(node) {
		if (
			node.nodeType === Node.TEXT_NODE &&
			node.textContent.trim() !== ""
		) {
			innerText += node.textContent.trim() + " ";
		}

		if (node.childNodes) {
			node.childNodes.forEach((child) => {
				traverse(child);
			});
		}
	}

	traverse(element);
	return innerText;
}

export const ClozeInput = ({
	sentence,
	hiddenWords,
	options,
	qnNo,
	handleChangeResponse,
}) => {
	let updatedSen = sentence;
	for (let word of hiddenWords) {
		updatedSen = replaceWordWithUnderscores(updatedSen, word);
	}

	const [response, setResponse] = useState("");

	const handleDragEnd = (event) => {
		const { active, over } = event;
		const newparent = document.getElementById(over.id);
		const child = document.getElementById(active.id);
		const oldparent = child.parentElement;
		if (newparent.hasChildNodes()) {
			oldparent.appendChild(newparent.querySelector("*"));
			newparent.appendChild(child);
		} else {
			newparent.appendChild(child);
		}
		const ansEle = document.getElementById(`answer${qnNo}`);
		const answerSen = getAllInnerText(ansEle);
		// console.log(answerSen);
		setResponse((prev) => answerSen);
		handleChangeResponse(qnNo, response);
	};

	// console.log(response);

	return (
		<fieldset className="relative w-full h-fit border group bg-slate-50 px-2">
			<legend className="text-lg mb-2 ">
				{qnNo}. Fill in the blanks.
			</legend>
			<DndContext onDragEnd={handleDragEnd}>
				<div className="relative w-full h-fit py-3">
					<div className="flex items-center justify-center  gap-3 flex-wrap">
						{options.map((v, i) => {
							return (
								<Draggable
									val={v}
									id={`drag${i}${qnNo}`}
									key={i}
								/>
							);
						})}
					</div>
					<div className=" text-lg font-semibold pt-5 px-2">
						<CustomText updatedSen={updatedSen} qnNo={qnNo} />
					</div>
				</div>
			</DndContext>
		</fieldset>
	);
};
