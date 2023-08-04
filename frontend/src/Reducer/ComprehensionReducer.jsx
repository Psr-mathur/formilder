export const ComprehensionIS = {
	comprehension: "",
	images: [
		{
			file: null,
			url: null,
		},
	],
	questions: [
		{
			option: "",
			question: "",
			options: [],
		},
	],
};

export const ComprehensionReducer = (state, action) => {
	let index = -1;
	let newquestions = [];
	let newimages = [];
	switch (action.type) {
		case "RESET":
			return {
				comprehension: "",
				images: [
					{
						file: null,
						url: null,
					},
				],
				questions: [
					{
						option: "",
						question: "",
						options: [],
					},
				],
			};
		case "CHANGE_COMPREHENSION":
			return { ...state, [action.payload.name]: action.payload.value };
		case "CHANGE_INPUT":
			// console.count("CI");
			index = action.payload.index;
			newquestions = [...state.questions];
			newquestions[index][action.payload.name] = action.payload.value;
			return { ...state, questions: newquestions };
		case "ADD_OPTION":
			// console.count("AO");
			index = action.payload.index;
			if (
				state.questions[index].options.includes(
					state.questions[index].option
				)
			) {
				return state;
			}
			newquestions = [...state.questions];
			newquestions[index].options.push(newquestions[index].option);
			return { ...state, questions: newquestions };
		case "CHANGE_IMAGE":
			index = action.payload.index;
			newimages = [...state.images];
			newimages[index].file = action.payload.file;
			newimages[index].url = action.payload.url;
			return { ...state, images: newimages };
		case "INCREASE_QUESTION":
			newquestions = [
				...state.questions,
				{
					option: "",
					question: "",
					options: [],
				},
			];
			newimages = [
				...state.images,
				{
					file: null,
					url: null,
				},
			];
			return { ...state, questions: newquestions, images: newimages };
		default:
			return state;
	}
};
