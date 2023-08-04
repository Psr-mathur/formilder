import React, { createContext, useReducer } from "react";
import { CategIS, CategoReducer } from "../Reducer/CategoReducer";
import { ClozeIS, ClozeReducer } from "../Reducer/ClozeReducer";
import {
	ComprehensionIS,
	ComprehensionReducer,
} from "../Reducer/ComprehensionReducer";

export const CategorizeContext = createContext({
	getstate: {},
	resetCateg: (e) => {},
	handleChange: (e) => {},
	handleCTGadd: (e) => {},
	handleIBadd: (e) => {},
	handleIBArrChange: (e, id) => {},
	handleIBArrDelete: (id) => {},
	handleCategDelete: (id) => {},
	ChangeCategArray: (arr) => {},
	ChangeIBArray: (arr) => {},
});
export const ClozeContext = createContext({
	getstate: {},
	resetCloze: (e) => {},
	handleChange: (e) => {},
	handleAddHide: (e) => {},
	handleAddOptions: (e) => {},
	ChangeOptionsArray: (arr) => {},
	deleteHideCom: (id) => {},
});
export const ComprehensionContext = createContext({
	getstate: {},
	resetCompr: (e) => {},
	handleChangeComprehension: (e) => {},
	handleChangeInput: (e, index) => {},
	handleAddOption: (e, index) => {},
	handleIncreaseQn: (e) => {},
	handleQnImgChange: (e) => {},
});

const MyContextProvider = ({ children }) => {
	const [categstate, categdispatch] = useReducer(CategoReducer, CategIS);
	const resetCateg = () => {
		categdispatch({ type: "RESET" });
	};
	const categhandleChange = (e) => {
		categdispatch({
			type: "CHANGE_INPUT",
			payload: { name: e.target.name, value: e.target.value },
		});
	};
	const handleIBadd = (e) => {
		e.preventDefault();
		categdispatch({
			type: "SET_IB_ARRAY",
			payload: { item: categstate.item, bto: categstate.bto },
		});
	};
	const handleCTGadd = (e) => {
		e.preventDefault();
		categdispatch({
			type: "SET_CATEGORY_ARRAY",
			payload: categstate.ctgry,
		});
	};
	const handleIBArrChange = (e, ind) => {
		e.preventDefault();
		categdispatch({
			type: "UPDATE_IB_ARRAY",
			payload: { ind: ind, value: e.target.value },
		});
	};
	const handleIBArrDelete = (ind) => {
		categdispatch({
			type: "DELETE_FROM_IB",
			payload: ind,
		});
	};
	const handleCategDelete = (ind) => {
		categdispatch({
			type: "DELETE_FROM_CATEG",
			payload: ind,
		});
	};
	const ChangeCategArray = (arr) => {
		categdispatch({
			type: "CHANGE_CATEG_ARRAY",
			payload: arr,
		});
	};
	const ChangeIBArray = (arr) => {
		categdispatch({
			type: "CHANGE_IB_ARRAY",
			payload: arr,
		});
	};

	const [clozestate, clozedispatch] = useReducer(ClozeReducer, ClozeIS);
	const resetCloze = () => {
		clozedispatch({ type: "RESET" });
	};
	const clozehandleChange = (e) => {
		clozedispatch({
			type: "CHANGE_INPUT",
			payload: { name: e.target.name, value: e.target.value },
		});
	};
	const handleAddHide = (e) => {
		e.preventDefault();
		clozedispatch({ type: "ADD_HIDDENWORD", payload: clozestate.tohide });
	};
	const handleAddOptions = (e) => {
		e.preventDefault();
		clozedispatch({ type: "ADD_OPTIONS", payload: clozestate.opt });
	};
	const ChangeOptionsArray = (arr) => {
		clozedispatch({ type: "CHANGE_OPTIONS_ARRAY", payload: arr });
	};
	const deleteHideCom = (id) => {
		clozedispatch({ type: "DELETE_FROM_HIDDEN_ARRAY", payload: id });
	};

	const [comprehensionstate, ComprehensionDispatch] = useReducer(
		ComprehensionReducer,
		ComprehensionIS
	);
	const resetCompr = () => {
		ComprehensionDispatch({ type: "RESET" });
	};
	const handleChangeComprehension = (e) => {
		e.preventDefault();
		ComprehensionDispatch({
			type: "CHANGE_COMPREHENSION",
			payload: {
				name: e.target.name,
				value: e.target.value,
			},
		});
	};
	const handleChangeInput = (e, index) => {
		e.preventDefault();
		ComprehensionDispatch({
			type: "CHANGE_INPUT",
			payload: {
				index: index,
				name: e.target.name,
				value: e.target.value,
			},
		});
	};
	const handleAddOption = (e, index) => {
		e.preventDefault();
		ComprehensionDispatch({
			type: "ADD_OPTION",
			payload: {
				index: index,
			},
		});
	};
	const handleIncreaseQn = (e) => {
		e.preventDefault();
		ComprehensionDispatch({
			type: "INCREASE_QUESTION",
			payload: {},
		});
	};
	const handleQnImgChange = (e, index) => {
		let file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				const url = reader.result;
				ComprehensionDispatch({
					type: "CHANGE_IMAGE",
					payload: {
						index: index,
						file: file,
						url: url,
					},
				});
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<CategorizeContext.Provider
			value={{
				getstate: categstate,
				handleChange: categhandleChange,
				handleCTGadd: handleCTGadd,
				handleIBadd: handleIBadd,
				handleIBArrChange: handleIBArrChange,
				handleIBArrDelete: handleIBArrDelete,
				handleCategDelete: handleCategDelete,
				ChangeCategArray: ChangeCategArray,
				ChangeIBArray: ChangeIBArray,
				resetCateg,
			}}
		>
			<ClozeContext.Provider
				value={{
					getstate: clozestate,
					handleChange: clozehandleChange,
					handleAddHide: handleAddHide,
					handleAddOptions: handleAddOptions,
					ChangeOptionsArray: ChangeOptionsArray,
					deleteHideCom: deleteHideCom,
					resetCloze,
				}}
			>
				<ComprehensionContext.Provider
					value={{
						getstate: comprehensionstate,
						handleChangeComprehension: handleChangeComprehension,
						handleChangeInput: handleChangeInput,
						handleIncreaseQn: handleIncreaseQn,
						handleAddOption: handleAddOption,
						handleQnImgChange: handleQnImgChange,
						resetCompr,
					}}
				>
					{children}
				</ComprehensionContext.Provider>
			</ClozeContext.Provider>
		</CategorizeContext.Provider>
	);
};
export default MyContextProvider;
