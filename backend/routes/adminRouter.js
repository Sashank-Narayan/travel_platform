const express = require("express");
const {getCatalogue, updateByOwnerId, getAllOwner} = require("../controllers/propertyOwner/propertyOwnerController");
const {signUpAdmin, checkLoginAdmin} = require("../controllers/admin/adminController");
const {checkAdminToken} = require("../auth/token_validation");
const adminRouter = express.Router();
const {validateSignUpFields, validateLoginFields} = require("../utils/validateFields")

adminRouter.post("/create",validateSignUpFields, signUpAdmin);
adminRouter.post("/login",validateLoginFields, checkLoginAdmin);
adminRouter.get("/property-owner",checkAdminToken, getAllOwner);
adminRouter.patch("/property-owner/:id",checkAdminToken, updateByOwnerId);
adminRouter.get("/property-owner/:id/catalogue",checkAdminToken, getCatalogue);

module.exports = adminRouter;
