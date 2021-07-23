const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/register");
const validateBody = require("../../middleware/validateBody");
const { registerClientSchema, registerMarketerSchema } = require("../../utils/validationSchemas");

//process client's info
router.post("/client", validateBody(registerClientSchema), registerController.process_client_info);
//process marketer's info
router.post(
	"/marketer",
	validateBody(registerMarketerSchema),
	registerController.process_marketer_info
);

module.exports = router;
