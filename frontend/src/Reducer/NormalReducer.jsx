export const NormalIS = {
	inputtitle: "",
	selectedType: "text",
	inputRequired: "",
	maxlength: "144",
	inputPlaceholder: "",
};

export const NormalReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_INPUT":
			return { ...state, [action.payload.name]: action.payload.value };
		case "RESET":
			return {
				inputtitle: "",
				selectedType: "text",
				inputRequired: "",
				maxlength: "144",
				inputPlaceholder: " ",
			};
		default:
			return state;
	}
};
