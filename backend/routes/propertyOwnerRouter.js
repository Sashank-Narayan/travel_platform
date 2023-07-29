const express = require("express");
const {signUpOwner, checkLoginOwner, getAllOwner, updateByOwnerId, postCatalogue, getCatalogue} = require("../controllers/propertyOwner/propertyOwnerController");
const {checkAdminToken, checkOwnerToken} = require("../auth/token_validation");
const propertyOwnerRouter = express.Router();
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, callback) => {
    return callback(null, `${file.fieldname || "sample"}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage
})

propertyOwnerRouter.post("/create",signUpOwner);
propertyOwnerRouter.post("/login",checkLoginOwner);
propertyOwnerRouter.post("/:id/catalogue",checkOwnerToken,upload.single("images"), postCatalogue);
propertyOwnerRouter.get("/:id/catalogue",checkOwnerToken, getCatalogue);

module.exports = propertyOwnerRouter;
