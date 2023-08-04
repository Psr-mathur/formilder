export const SavedResponseInitialState = {};

export const SavedResponseReducer = (state, action) => {
	let newsavedResponses = {};
	switch (action.type) {
		case "change":
			newsavedResponses = { ...state };
			newsavedResponses[action.payload.qnNO] = action.payload.response;
			return newsavedResponses;
		default:
			return state;
	}
};
