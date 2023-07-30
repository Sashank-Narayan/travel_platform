const express = require("express");
const {signUp, checkLogin, getCatalogue, getAllBookingsById} = require("../controllers/travellers/travellerController");
const {checkAdminToken, checkTravellerToken} = require("../auth/token_validation");
const travellerRouter = express.Router();
const {validateSignUpFields, validateLoginFields} = require("../utils/validateFields")

travellerRouter.post("/create",validateSignUpFields, signUp);
travellerRouter.post("/login",validateLoginFields, checkLogin);
travellerRouter.get("/catalogue", checkTravellerToken, getCatalogue);
// travelRouter.get("/",checkAdminToken, getAllTravellers);
// travelRouter.get("/:id",checkAdminToken, getTravellerById);
travellerRouter.get("/:id/bookings", checkTravellerToken, getAllBookingsById);

module.exports = travellerRouter;
