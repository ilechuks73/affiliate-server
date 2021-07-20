const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a schema
const ClientSchema = new Schema(
	{
		username: {
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
		password: {
			type: String,
			required: true,
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "product",
			},
		],
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ strictQuery: true, timestamps: true }
);

module.exports = Client = mongoose.model("client", ClientSchema);
