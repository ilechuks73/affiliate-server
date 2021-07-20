const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "product",
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "marketer",
			required: true,
		},
	},
	{ strictQuery: true, timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);
