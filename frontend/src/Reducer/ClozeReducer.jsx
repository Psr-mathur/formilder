export const ClozeIS = {
	sentence: "",
	tohide: "",
	opt: "",
	hiddenWords: [],
	options: [],
};

export const ClozeReducer = (state, action) => {
	let newoptArr = [];
	let newhidArr = [];
	switch (action.type) {
		case "RESET":
			return {
				sentence: "",
				tohide: "",
				opt: "",
				hiddenWords: [],
				options: [],
			};
		case "CHANGE_INPUT":
			// console.count("CIC");
			return { ...state, [action.payload.name]: action.payload.value };
		case "ADD_HIDDENWORD":
			newhidArr = state["hiddenWords"];
			if (!newhidArr.includes(action.payload)) {
				// console.log("adding word");
				newhidArr = [...newhidArr, action.payload];
				return {
					...state,
					hiddenWords: [...newhidArr],
					options: [...newhidArr],
				};
			} else {
				alert("Word already added");
				return state;
			}
			break;
		case "DELETE_FROM_HIDDEN_ARRAY":
			newoptArr = [...state.options];
			const index = newoptArr.indexOf(state.hiddenWords[action.payload]);
			newoptArr.splice(index, 1);
			newhidArr = [...state.hiddenWords];
			newhidArr.splice(action.payload, 1);
			return {
				...state,
				hiddenWords: [...newhidArr],
				options: [...newoptArr],
			};
		case "ADD_OPTIONS":
			// console.count("AOS");
			newoptArr = state["options"];
			if (!newoptArr.includes(action.payload)) {
				console.log("adding option");
				newoptArr = [...newoptArr, action.payload];
				return {
					...state,
					options: [...newoptArr],
				};
			} else {
				alert("option already exist.");
				return state;
			}
			break;
		case "CHANGE_OPTIONS_ARRAY":
			newoptArr = action.payload;
			return { ...state, ...{ options: newoptArr } };
		default:
			return state;
	}
};

// const [senten, setSenten] = useState("");
// 	const [hiddenWords, setHiddenWords] = useState([]);
// 	const [tohide, setTohide] = useState("");
// 	const [options, setOptions] = useState([]);
// 	const [opt, setOpt] = useState("");
// 	const handleHideClick = (e) => {
// 		e.preventDefault();
// 		setHiddenWords((prev) => {
// 			return [...prev, tohide];
// 		});
// 		setOptions((prev) => {
// 			return [...prev, opt];
// 		});
// 	};

// 	const handleOptionsClick = (e) => {
// 		e.preventDefault();
// 		setOptions((prev) => {
// 			return [...prev, opt];
// 		});
