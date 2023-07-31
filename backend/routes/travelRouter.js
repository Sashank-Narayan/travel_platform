const express = require("express");
const {getCatalogue, getAllBookingsById} = require("../controllers/travellers/travellerController");
const {checkAdminToken, checkTravellerToken} = require("../auth/token_validation");
const travellerRouter = express.Router();
const {validateSignUpFields, validateLoginFields} = require("../utils/validateFields")

travellerRouter.get("/:id/catalogue", checkTravellerToken, getCatalogue);
// travelRouter.get("/",checkAdminToken, getAllTravellers);
// travelRouter.get("/:id",checkAdminToken, getTravellerById);
travellerRouter.get("/:id/bookings", checkTravellerToken, getAllBookingsById);

module.exports = travellerRouter;
