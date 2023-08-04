export const CategIS = {
	ctgry: "",
	ctgrysArr: [],
	ibArr: [],
	item: "",
	bto: "",
};

export const CategoReducer = (state, action) => {
	let newibArr = [];
	let newctgrysArr = [];
	switch (action.type) {
		case "RESET":
			return {
				ctgry: "",
				ctgrysArr: [],
				ibArr: [],
				item: "",
				bto: "",
			};
		case "CHANGE_INPUT":
			return { ...state, [action.payload.name]: action.payload.value };
		case "SET_CATEGORY_ARRAY":
			newctgrysArr = [...state.ctgrysArr, action.payload];
			return { ...state, ...{ ctgrysArr: newctgrysArr } };
		case "SET_IB_ARRAY":
			newibArr = [...state.ibArr, action.payload];
			return { ...state, ...{ ibArr: newibArr } };
		case "UPDATE_IB_ARRAY":
			const { value, ind } = action.payload;
			newibArr = [...state.ibArr];
			newibArr[ind].bto = value;
			return { ...state, ...{ ibArr: newibArr } };
		case "DELETE_FROM_IB":
			newibArr = [...state.ibArr];
			newibArr.splice(action.payload, 1);
			return { ...state, ...{ ibArr: newibArr } };
		case "DELETE_FROM_CATEG":
			newctgrysArr = [...state.ctgrysArr];
			newctgrysArr.splice(action.payload, 1);
			return { ...state, ...{ ctgrysArr: newctgrysArr } };
		case "CHANGE_CATEG_ARRAY":
			newctgrysArr = [...action.payload];
			return { ...state, ...{ ctgrysArr: newctgrysArr } };
		case "CHANGE_IB_ARRAY":
			newibArr = [...action.payload];
			return { ...state, ...{ ibArr: newibArr } };
		default:
			return state;
	}
};
