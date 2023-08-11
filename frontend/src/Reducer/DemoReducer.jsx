export const demoIS = {
	head: {
		title: "",
		description: "",
		file: null,
		url: null,
	},
	allqns: [],
};

export const DemoReducer = (state, action) => {
	let newallqns = [];
	let newhead = {};
	switch (action.type) {
		case "INSERT_TO_DEMO":
			newallqns = [...state.allqns, action.payload];
			return { ...state, allqns: newallqns };
		case "CHANGE_HEAD_T&D":
			newhead = {
				...state.head,
				[action.payload.name]: action.payload.value,
			};
			return { ...state, head: newhead };
		case "CHANGE_FILE&URL":
			newhead = { ...state.head };
			newhead.file = action.payload.file;
			newhead.url = action.payload.url;
			return { ...state, head: newhead };
		case "DELETE":
			const index = parseInt(action.payload.index);
			newallqns = [...state.allqns];
			newallqns.splice(index, 1);
			return { ...state, allqns: newallqns };
		default:
			return state;
	}
};
