export const Customheader = ({
	headtitle = "Formilder",
	headinfo = "create form in minutes with a link to share.",
}) => {
	return (
		<div className=" relative w-full h-fit border flex flex-col items-center justify-center p-3 mb-10">
			<h1 className=" font-bold text-lg">{headtitle}</h1>
			<p className=" font-thin">{headinfo}</p>
		</div>
	);
};
export const Custominput = ({
	inputtitle = "name",
	selectedType = "text",
	inputRequired = false,
	maxlength = 199,
	inputPlaceholder = "Enter your name",
	handleRespChange,
	value,
}) => {
	return (
		<div className=" relative w-full h-fit border group">
			<input
				className=" w-full h-full py-3 pl-28 outline-none peer"
				name={inputtitle}
				type={selectedType}
				placeholder={inputPlaceholder}
				maxLength={inputtitle == "file" ? 255 : parseInt(maxlength)}
				required={inputRequired === "true" ? true : false}
				onChange={handleRespChange}
				value={value}
			/>
			<label className=" bg-slate-400 absolute left-0 top-0 w-full h-full flex items-center justify-center group-hover:w-24 group-hover:text-xs peer-focus:w-24 peer-focus-within:text-xs peer-[&:not(:placeholder-shown)]:w-24 peer-[&:not(:placeholder-shown)]:text-xs transition-all">
				{inputtitle}
			</label>
		</div>
	);
};
