import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

const Droppable = ({ categ, id }) => {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	const style = {
		// opacity: isOver ? 1 : 0.8,
		backgroundColor: isOver ? "#6ecbfa" : "#b4f3fa",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			key={id}
			className=" flex flex-col items-center justify-center"
		>
			<h2 className=" bg-slate-200 w-32 text-center font-semibold">
				{categ}
			</h2>
			<div
				id={id}
				className=" h-40 w-32  flex flex-col items-center gap-2"
				tocheck="fordroppingelementfromonetoanother"
			></div>
		</div>
	);
};

const Draggable = ({ ib, id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useDraggable({
			id: id,
		});
	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};
	// console.log();

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			id={id}
			className=" px-3 py-1 bg-purple-400 rounded-md text-white"
		>
			{ib.item}
		</button>
	);
};

export const CategorizeInput = ({
	ibArr,
	ctgrysArr,
	qnNo,
	handleChangeResponse,
}) => {
	const [response, setResponse] = useState({});
	const handleDragEnd = (event) => {
		const { active, over } = event;
		const newparent = document.getElementById(over.id);
		const child = document.getElementById(active.id);
		const oldparent = child.parentElement;
		// console.log(oldparent.hasAttribute("tocheck"));
		let srcCategoryName = null;
		if (oldparent.hasAttribute("tocheck")) {
			srcCategoryName = oldparent.previousElementSibling.innerText;
		}
		const desCategoryName = newparent.previousElementSibling.innerText;
		const CategoryValue = child.innerText;
		newparent.appendChild(child);

		setResponse((prev) => {
			let newResponse = {
				...prev,
				[desCategoryName]: [
					...(prev[desCategoryName] || []),
					CategoryValue,
				],
			};
			if (srcCategoryName) {
				newResponse[srcCategoryName] = [];
				const ochilds = oldparent.querySelectorAll("*");
				for (var i = 0; i < ochilds.length; i++) {
					newResponse[srcCategoryName].push(ochilds[i].textContent);
				}
			}
			return newResponse;
		});
	};
	useEffect(() => {
		handleChangeResponse(qnNo, response);
	}, [response]);
	// console.log(response);
	return (
		<fieldset className=" relative w-full h-fit border group bg-slate-50 p-2">
			<legend className="text-lg mb-2 ">
				Catergorize the Following :
			</legend>
			<DndContext onDragEnd={handleDragEnd}>
				<div className="flex items-center justify-center  gap-3 flex-wrap">
					{ibArr.map((ib, i) => {
						return (
							<Draggable
								ib={ib}
								id={`drag${i.toString()}${qnNo.toString()}`}
								key={i}
							/>
						);
					})}
				</div>
				<div className="flex flex-wrap gap-5 justify-around mt-5">
					{ctgrysArr.map((categ, ind) => {
						return (
							<Droppable
								key={ind}
								categ={categ}
								id={`drop${ind.toString()}${qnNo.toString()}`}
							/>
						);
					})}
				</div>
			</DndContext>
		</fieldset>
	);
};
