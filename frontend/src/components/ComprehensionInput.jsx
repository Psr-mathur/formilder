import React, { useEffect, useState } from "react";

const Question = ({ Q, subQnNo, handlesetResponse, image }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
		setResponse((prev) => {
			return { ...prev, [subQnNo]: event.target.value };
		});
	};

	// console.log(Q);
	return (
		<div className="p-4 border border-red-200">
			<h1 className="text-lg font-semibold mb-3">
				{subQnNo}. {Q.question}
			</h1>
			{image && image.url && (
				<div className=" flex items-center justify-center">
					<img
						src={image.url}
						alt=""
						width={"500px"}
						// height={"300px"}
					/>
				</div>
			)}
			<div className=" grid grid-cols-2 items-center justify-center pt-6">
				{Q.options.map((opt, i) => {
					let id = `option${+i}`;
					return (
						<div
							className="flex items-center justify-start pl-4"
							key={i}
						>
							<input
								type="radio"
								id={id}
								value={opt}
								checked={selectedOption == opt}
								onChange={handleOptionChange}
							/>
							<label htmlFor={opt} className="ml-2">
								{opt}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const ComprehensionInput = ({
	comprehension,
	images,
	questions,
	qnNO,
	handleChangeResponse,
}) => {
	const [response, setResponse] = useState({});
	// console.log(images);
	// console.log(response);
	useEffect(() => {
		handleChangeResponse(qnNO, response);
	}, [response]);
	return (
		<fieldset className=" relative w-full h-fit border group bg-slate-50 p-2">
			<legend>{qnNO}. Comprehension</legend>
			<div className=" bg-rose-50 p-2">{comprehension}</div>
			<div className="">
				{questions.map((Q, ind) => {
					if (Q.question || images[ind].url)
						return (
							<Question
								key={ind}
								image={images[ind]}
								Q={Q}
								subQnNo={`${qnNO}.${ind + 1}`}
								setResponse={setResponse}
							/>
						);
				})}
			</div>
		</fieldset>
	);
};

export default ComprehensionInput;
