const express = require("express");
const {signUpOwner, checkLoginOwner, getAllOwner, updateByOwnerId, postCatalogue, getCatalogue} = require("../controllers/propertyOwner/propertyOwnerController");
const {checkAdminToken, checkOwnerToken} = require("../auth/token_validation");
const propertyOwnerRouter = express.Router();

propertyOwnerRouter.post("/create",signUpOwner);
propertyOwnerRouter.post("/login",checkLoginOwner);
propertyOwnerRouter.post("/:id/catalogue",checkOwnerToken, postCatalogue);
propertyOwnerRouter.get("/:id/catalogue",checkOwnerToken, getCatalogue);

module.exports = propertyOwnerRouter;
