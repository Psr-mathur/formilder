const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectSchema = new Schema({
	inputtitle: String,
	selectedType: String,
	inputRequired: String,
	maxlength: String,
	inputPlaceholder: String,
});
const cfSchema = new Schema(
	{
		privatekey: String,
		publickey: String,
		headtitle: String,
		headinfo: String,
		inputdata: [objectSchema],
	},
	{ timestamps: true }
);

const Tocreate = mongoose.model("Tocreate", cfSchema);

module.exports = Tocreate;
