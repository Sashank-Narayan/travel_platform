const express = require("express");
const {signUp, checkLogin, getCatalogue, getAllBookingsById} = require("../controllers/travellers/travellerController");
const {checkAdminToken, checkTravellerToken} = require("../auth/token_validation");
const travellerRouter = express.Router();

travellerRouter.post("/create",signUp);
travellerRouter.post("/login",checkLogin);
travellerRouter.get("/catalogue", checkTravellerToken, getCatalogue);
// travelRouter.get("/",checkAdminToken, getAllTravellers);
// travelRouter.get("/",checkAdminToken, getTravellerById);
travellerRouter.get("/:id/bookings", checkTravellerToken, getAllBookingsById);

module.exports = travellerRouter;
