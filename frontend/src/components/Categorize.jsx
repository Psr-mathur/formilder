import React, { useContext } from "react";
import { CategorizeContext } from "../Contextapi/createcontext";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTR = ({ ctgrysArr, id, val }) => {
	const { handleIBArrChange, handleIBArrDelete } =
		useContext(CategorizeContext);
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: id + 1 });
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};
	return (
		<tr className=" border">
			<td
				className=" border text-center text-cyan-200 cursor-cell"
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				&#9783;
			</td>
			<td className=" border text-center">{val.item}</td>
			<td className=" border text-center">
				<select
					className=" outline-none bg-slate-100 text-slate-600"
					defaultValue={val.bto}
					name=""
					onChange={(e) => handleIBArrChange(e, ind)}
				>
					<option disabled hidden>
						Select Category...
					</option>
					{ctgrysArr.map((val, index) => {
						return (
							<option value={val} key={index}>
								{val}
							</option>
						);
					})}
				</select>
			</td>
			<td
				onClick={() => handleIBArrDelete(id)}
				className=" border text-center text-xs font-semibold p-2 cursor-pointer text-red-400"
			>
				X
			</td>
		</tr>
	);
};

const ItemCom = ({ ibArr, ctgrysArr }) => {
	const { getstate: state, ChangeIBArray } = useContext(CategorizeContext);
	// console.log(ibArr);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		// console.log(active.id, over.id);
		if (active.id !== over.id) {
			const arr = arrayMove(state.ibArr, active.id - 1, over.id - 1);
			// console.log(arr);
			ChangeIBArray(arr);
		}
	};

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={state.ibArr}
				strategy={verticalListSortingStrategy}
			>
				<table className=" w-full border bg-white shadow-md rounded-lg ">
					<thead className="bg-gray-100">
						<tr>
							<th>&nbsp;&nbsp;</th>
							<th>Item</th>
							<th>Belongs to</th>
							<th>&nbsp;&nbsp;</th>
						</tr>
					</thead>

					<tbody className=" min-w-max">
						{ibArr.map((val, ind) => {
							return (
								<SortableTR
									ctgrysArr={ctgrysArr}
									id={ind}
									val={val}
									key={ind}
								/>
							);
						})}
					</tbody>
				</table>
			</SortableContext>
		</DndContext>
	);
};

const CategosCom = ({ value, id }) => {
	// console.log(value);
	const { handleCategDelete } = useContext(CategorizeContext);

	const { attributes, listeners, setNodeRef, isDragging, transform, isOver } =
		useSortable({ id: id + 1 });
	// console.log(transition, transform, CSS);

	const style = {
		transition: "all 333ms ease",
		transform: CSS.Transform.toString(transform),
		// transition,
		opacity: isDragging ? "0.5" : "1",
		marginLeft: isDragging ? "20px" : "inherit",
		// opacity: isOver ? "0.7" : "1",
	};

	return (
		<div className=" h-12 cursor-none">
			<span
				className=" bg-slate-400 p-2 text-white font-semibold cursor-cell"
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				style={style}
			>
				&#9783;
			</span>
			<span className=" bg-slate-200 py-2 px-3 cursor-text">{value}</span>
			<span
				className=" bg-white p-2 text-rose-400 cursor-pointer"
				onClick={() => handleCategDelete(id)}
			>
				X
			</span>
		</div>
	);
};

const Categorize = () => {
	const {
		getstate: state,
		handleCTGadd,
		handleChange,
		handleIBadd,
		ChangeCategArray,
	} = useContext(CategorizeContext);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		// console.log(active.id, over.id);
		if (active.id !== over.id) {
			const arr = arrayMove(state.ctgrysArr, active.id - 1, over.id - 1);
			// console.log(arr);
			ChangeCategArray(arr);
		}
	};
	// console.log(state);
	return (
		<div className=" bg-slate-100 px-3 py-5">
			<div className="border bg-white">
				<p className=" text-lg mb-2 px-3">Category</p>
				<div className=" px-3 py-3 flex flex-col items-start justify-center">
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={state.ctgrysArr}
							strategy={verticalListSortingStrategy}
						>
							{state.ctgrysArr.map((val, index) => (
								<CategosCom
									value={val}
									id={index}
									key={index}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>
				<form className=" flex gap-2  px-3 " id="cates">
					<input
						className=" py-1 px-3 flex-1 outline-none shadow"
						type="text"
						name="ctgry"
						value={state.ctgry}
						onChange={handleChange}
					/>
					<button
						className=" bg-slate-400 px-5 py-1 text-yellow-50 font-bold shadow"
						onClick={handleCTGadd}
					>
						+
					</button>
				</form>
				<div className="">
					<p className="text-lg my-2 px-3">Items</p>
					<ItemCom ibArr={state.ibArr} ctgrysArr={state.ctgrysArr} />
					<div className=" flex gap-2 border p-3 " id="cates">
						<input
							className=" py-1 px-3 flex-1 outline-none shadow"
							type="text"
							name="item"
							value={state.item}
							onChange={handleChange}
						/>
						<select
							className=" outline-none bg-slate-100 text-slate-600"
							value={state.bto}
							name="bto"
							onChange={handleChange}
						>
							<option disabled hidden>
								Select Category...
							</option>
							{state.ctgrysArr.map((val, index) => {
								return (
									<option value={val} key={index}>
										{val}
									</option>
								);
							})}
						</select>
						<button
							className=" bg-slate-400 px-5 py-1 text-yellow-50 font-bold"
							onClick={handleIBadd}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categorize;
