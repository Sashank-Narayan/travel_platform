const express = require("express");
const {getCatalogue, updateByOwnerId, getAllOwner} = require("../controllers/propertyOwner/propertyOwnerController");
const {signUp, checkLogin} = require("../controllers/authenticateController");
const authRouter = express.Router();
const {validateSignUpFields, validateLoginFields} = require("../utils/validateFields")

authRouter.post("/signup", validateSignUpFields, signUp);
authRouter.post("/login", validateLoginFields, checkLogin);

module.exports = authRouter;
