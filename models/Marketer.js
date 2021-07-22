const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a schema
const MarketerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			lowercase: true,
			match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		},
		website: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "order",
			},
		],
	},
	{ strictQuery: true, timestamps: true }
);

module.exports = Marketer = mongoose.model("marketer", MarketerSchema);
