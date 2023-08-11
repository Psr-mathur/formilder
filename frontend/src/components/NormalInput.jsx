import React, { useEffect, useState } from "react";
import { imagekitupload2 } from "../imagekitsetup";
import Typed from "react-typed";

const NormalInput = ({
	qnNO,
	inputtitle = "name",
	selectedType = "text",
	inputRequired = false,
	maxlength = 199,
	inputPlaceholder = "Enter your name",
	handleChangeResponse,
}) => {
	const [response, setResponse] = useState({});
	const [fileuploadingStatus, setFileUploadingStatus] = useState(false);
	useEffect(() => handleChangeResponse(qnNO, response), [response]);

	const handleChangeLocal = async (e) => {
		if (e.target.files) {
			let fileurl = "";
			setFileUploadingStatus(true);
			fileurl = await imagekitupload2(e.target.files[0]);
			setFileUploadingStatus(false);
			setResponse({
				...response,
				[e.target.name]: fileurl,
			});
		} else
			setResponse({
				...response,
				[e.target.name]: e.target.value,
			});
		setFileUploadingStatus(false);
	};

	return (
		<div className=" relative w-full h-fit border group">
			{selectedType == "file" ? (
				<input
					className=" w-full h-full py-3 pl-28 outline-none peer"
					name={inputtitle}
					type={selectedType}
					placeholder={inputPlaceholder}
					maxLength={inputtitle == "file" ? 255 : parseInt(maxlength)}
					required={inputRequired === "true" ? true : false}
					onChange={handleChangeLocal}
				/>
			) : (
				<input
					className=" w-full h-full py-3 pl-28 outline-none peer"
					name={inputtitle}
					type={selectedType}
					placeholder={inputPlaceholder}
					maxLength={inputtitle == "file" ? 255 : parseInt(maxlength)}
					required={inputRequired === "true" ? true : false}
					value={response[inputtitle]}
					onChange={handleChangeLocal}
				/>
			)}

			<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
				{inputtitle}
			</label>
			{fileuploadingStatus && (
				<div className=" absolute left-2/4 bottom-top10per pl-3 pr-2 w-28 flex items-center justify-center font-semibold bg-slate-100 text-rose-300 z-10">
					<Typed
						strings={["uploading..."]}
						typeSpeed={4}
						backSpeed={4}
						loop
					/>
				</div>
			)}
		</div>
	);
};

export default NormalInput;
