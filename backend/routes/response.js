const express = require("express");
const mongoose = require("mongoose");
const Tocreate = require("../schemas");
const Schema = mongoose.Schema;

const router = express.Router();

const getSchObj = (d) => {
	let newObj = {};
	for (let key in d) {
		newObj[key] = String;
	}
	return newObj;
};
const postRes = async (req, res) => {
	const submittedData = req.body.submittedData;
	// const schOfSubmitted = getSchObj(submittedData);
	// console.log(schOfSubmitted);
	// const tsSchema = new Schema(
	// 	{ ...schOfSubmitted, publickey: String },
	// 	{ timestamps: true }
	// );
	const dynamicSchema = new Schema({}, { strict: false });

	let Response;
	try {
		Response = mongoose.model("Response");
	} catch (error) {
		// const tsSchema = new mongoose.Schema(
		// 	{ ...schOfSubmitted, publickey: String },
		// 	{ timestamps: true }
		// );
		const dynamicSchema = new Schema({}, { strict: false });
		Response = mongoose.model("Response", dynamicSchema);
	}

	try {
		const exist = await Response.find({
			publickey: req.query.key,
			Email: submittedData.Email,
		});
		const ifExist = exist.map((item) => item.toObject());
		// console.log(ifExist);
		if (ifExist.length > 0) {
			return res
				.status(500)
				.send("Response already submiited with this email.");
		}
		submittedData.publickey = req.query.key;
		// console.log(submittedData);
		// const newRes = new Response({
		// 	submittedData,
		// });
		const savedRes = await Response.create(submittedData);
		return res.status(201).send("Response Saved.");
	} catch (err) {
		console.error(err);
		return res.status(500).send("Database Server Error.");
	}
};
const getRes = async (req, res) => {
	// console.log("hit");
	const privatekey = req.query.key;
	let Response;
	try {
		Response = mongoose.model("Response");
	} catch (error) {
		const dynamicSchema = new Schema({}, { strict: false });
		Response = mongoose.model("Response", dynamicSchema);
	}

	try {
		const resp = await Tocreate.find(
			{ privatekey: privatekey },
			"publickey"
		);
		if (resp.length == 0) {
			return res
				.status(401)
				.send("Invalid Key! Please enter valid Private Key.");
		}
		// console.log(resp);
		const publickey = resp[0].publickey;
		const data = await Response.find({ publickey: publickey });
		const dts = data.map((val) => {
			const { publickey, _id, __v, ...others } = val.toObject();
			return others;
		});
		return res.status(200).send(dts);
	} catch (error) {
		return res
			.status(500)
			.send("Database Server Down. Please try after sometime.");
	}
};

router.post("/", postRes);
router.get("/", getRes);

module.exports = router;
