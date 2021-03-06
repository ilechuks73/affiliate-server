const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		commission: {
			type: Number,
			required: true,
		},
		productImg: {
			type: String,
			required: true,
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "client",
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

module.exports = Product = mongoose.model("product", ProductSchema);
