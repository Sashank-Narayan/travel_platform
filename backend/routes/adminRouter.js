const express = require("express");
const {getCatalogue, updateByOwnerId, getAllOwner} = require("../controllers/propertyOwner/propertyOwnerController");
const {signUpAdmin, checkLoginAdmin} = require("../controllers/admin/adminController");
const {checkAdminToken} = require("../auth/token_validation");
const adminRouter = express.Router();

adminRouter.post("/create",signUpAdmin);
adminRouter.post("/login",checkLoginAdmin);
adminRouter.get("/property-owner",checkAdminToken, getAllOwner);
adminRouter.patch("/property-owner/:id",checkAdminToken, updateByOwnerId);
adminRouter.get("/property-owner/:id/catalogue",checkAdminToken, getCatalogue);
// adminRouter.get("/:id/catalogue",getCatalogue);

module.exports = adminRouter;
