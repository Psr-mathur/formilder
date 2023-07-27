const express = require("express");
const Tocreate = require("../schemas");

const router = express.Router();

const createform = async (req, res) => {
	try {
		console.log(req.body);
		const newcf = new Tocreate({
			privatekey: req.body.privatekey,
			publickey: req.body.publickey,
			headtitle: req.body.headtitle,
			headinfo: req.body.headinfo,
			inputdata: req.body.data,
		});
		const savedRes = await newcf.save();
		return res.status(201).send(savedRes);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Database Server Error.");
	}
};

const getcreatedform = async (req, res) => {
	try {
		const publickey = req.query.publickey;
		// console.log(publickey);
		const data = await Tocreate.find({ publickey: publickey });
		const dataToSend = data.map((item) => item.toObject());
		return res.status(200).send(dataToSend);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Database Server Error.");
	}
};

router.post("/", createform);
router.get("/", getcreatedform);

module.exports = router;
