const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const router = express.Router();

const dynamicSchema = new Schema({}, { strict: false });
const Createdtask = mongoose.model("Createdtask", dynamicSchema);

const createtask = async (req, res) => {
	// console.log(req.body.data);
	// let Createdtask;
	// try {
	// 	Createdtask = mongoose.model("Createdtask");
	// } catch (error) {
	// 	const dynamicSchema = new Schema({}, { strict: false });
	// 	Createdtask = mongoose.model("Createdtask", dynamicSchema);
	// }
	try {
		const savedRes = await Createdtask.create({
			privatekey: req.body.privatekey,
			publickey: req.body.publickey,
			data: req.body.data,
		});
		return res.status(201).send(savedRes);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Database Server Error.");
	}
};

const getcreatedtask = async (req, res) => {
	console.log("h");
	// let Createdtask;
	// try {
	// 	Createdtask = mongoose.model("Createdtask");
	// } catch (error) {
	// 	const dynamicSchema = new Schema({}, { strict: false });
	// 	Createdtask = mongoose.model("Createdtask", dynamicSchema);
	// }

	try {
		const publickey = req.query.publickey;
		console.log(publickey);
		const data = await Createdtask.find({ publickey: publickey });
		const dataToSend = data.map((item) => item.toObject());
		return res.status(200).send(dataToSend);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Database Server Error.");
	}
};

router.post("/", createtask);
router.get("/", getcreatedtask);

module.exports = { router, Createdtask };
