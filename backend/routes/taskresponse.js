const express = require("express");
const mongoose = require("mongoose");
const { Createdtask } = require("./createtask");
const Schema = mongoose.Schema;

const router = express.Router();
const postRes = async (req, res) => {
	const submittedData = req.body.submittedData;

	let Taskresponse;
	try {
		Taskresponse = mongoose.model("Taskresponse");
	} catch (error) {
		const dynamicSchema = new Schema({}, { strict: false });
		Taskresponse = mongoose.model("Taskresponse", dynamicSchema);
	}

	try {
		// const exist = await Taskresponse.find({
		// 	publickey: req.query.key,
		// 	Email: submittedData.Email,
		// });
		// const ifExist = exist.map((item) => item.toObject());
		// if (ifExist.length > 0) {
		// 	return res
		// 		.status(500)
		// 		.send("Taskresponse already submiited with this email.");
		// }
		submittedData.publickey = req.query.key;
		const savedRes = await Taskresponse.create(submittedData);
		return res.status(201).send("Taskresponse Saved.");
	} catch (err) {
		console.error(err);
		return res.status(500).send("Database Server Error.");
	}
};
const getRes = async (req, res) => {
	// console.log("hit");
	const privatekey = req.query.key;
	let Taskresponse;
	try {
		Taskresponse = mongoose.model("Taskresponse");
	} catch (error) {
		const dynamicSchema = new Schema({}, { strict: false });
		Taskresponse = mongoose.model("Taskresponse", dynamicSchema);
	}

	try {
		const resp = await Createdtask.find(
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
		const data = await Taskresponse.find({ publickey: publickey });
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
