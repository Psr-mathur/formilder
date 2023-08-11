import React, { useState } from "react";

const Normal = (props) => {
	// console.log(props);
	const { normstate, normDispatch } = props;
	const handleInputchange = (e) => {
		normDispatch({
			type: "CHANGE_INPUT",
			payload: {
				name: e.target.name,
				value: e.target.value,
			},
		});
	};
	// console.log(normstate);

	return (
		<div className=" bg-slate-100 px-3 py-5">
			<div className="border bg-white flex flex-col gap-3">
				<div className=" relative w-full h-fit border group">
					<input
						className=" w-full h-full py-3 pl-28 outline-none peer"
						name="inputtitle"
						type="text"
						placeholder=" "
						required={true}
						value={normstate.inputtitle}
						onChange={handleInputchange}
					/>
					<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
						Input Title
					</label>
				</div>
				<div className=" relative w-full h-fit border group">
					<p className=" px-3">Please select the type of Input:</p>
					<input
						className=" ml-10"
						type="radio"
						id="text"
						name="selectedType"
						value="text"
						onChange={handleInputchange}
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
						onChange={handleInputchange}
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
						onChange={handleInputchange}
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
						onChange={handleInputchange}
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
						onChange={handleInputchange}
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
						onChange={handleInputchange}
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
						value={normstate.inputRequired}
						onChange={handleInputchange}
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
						value={normstate.inputPlaceholder}
						onChange={handleInputchange}
					/>
					<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
						Placeholder
					</label>
				</div>
				<div className=" flex flex-col items-center justify-center h-fit border p-3 w-full group">
					<label className=" w-full">
						Max length = {normstate.maxlength}
					</label>
					<input
						className=" w-full h-full py-3 outline-none peer"
						name="maxlength"
						type="range"
						min={5}
						max={200}
						required={true}
						value={normstate.maxlength}
						onChange={handleInputchange}
					/>
				</div>
			</div>
		</div>
	);
};

export default Normal;
