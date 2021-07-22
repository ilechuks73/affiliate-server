const Client = require("../models/Client");
const Marketer = require("../models/Marketer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const createError = require("http-errors");

//process client's info
exports.process_client_info = async (req, res, next) => {
	const { username, email, password } = req.body;

	//checks if user already exist
	const userExists = await Client.exists({ email });
	if (userExists) return next(createError(409, "User with same email already exists"));

	const newClient = new Client({
		username,
		email,
		password,
	});

	//create salt and hash password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newClient.password, salt, (err, hash) => {
			if (err) throw err;
			newClient.password = hash;
			newClient
				.save()
				.then((user) => {
					jwt.sign(
						{ id: user.id },
						process.env.SECRET_KEY,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									username: user.username,
									email: user.email,
								},
							});
						}
					);
				})
				.catch(next);
		});
	});
};

//process marketer's info
exports.process_marketer_info = async (req, res, next) => {
	const { name, email, website, category, password } = req.body;

	//Checks if user already exist
	const userExists = await Marketer.exists({ email });
	if (userExists) return next(createError(409, "User with same email already exists"));

	const newMarketer = new Marketer({
		name,
		email,
		website,
		category,
		password,
	});

	//create salt and hash password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newMarketer.password, salt, (err, hash) => {
			newMarketer.password = hash;
			newMarketer
				.save()
				.then((user) => {
					jwt.sign(
						{ id: user.id },
						process.env.SECRET_KEY,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									name: user.name,
									email: user.email,
									website: user.website,
									category: user.category,
								},
							});
						}
					);
				})
				.catch(next);
		});
	});
};
