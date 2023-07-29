const express = require("express");
const {signUpAdmin, checkLoginAdmin} = require("../controllers/admin/adminController");
const {checkAdminToken} = require("../auth/token_validation");
const adminRouter = express.Router();

adminRouter.post("/create",signUpAdmin);
adminRouter.post("/login",checkLoginAdmin);
// adminRouter.get("/:id/catalogue",getCatalogue);

module.exports = adminRouter;
