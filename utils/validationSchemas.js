const Joi = require("joi");

const registerClientSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
	confirm: Joi.ref("password"),
}).with("password", "confirm");

const registerMarketerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	website: Joi.string().required(),
	category: Joi.string().required(),
	password: Joi.string().required(),
	confirm: Joi.ref("password"),
}).with("password", "confirm");

module.exports = { registerClientSchema, registerMarketerSchema };
