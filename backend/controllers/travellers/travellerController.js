const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken");
const {getAllCatalogue} = require("../../services/catalogue/catalogueService");
const {getBookingsByTravellerId} = require("../../services/bookings/bookingService");
const { body, validationResult } = require('express-validator');

const getCatalogue = async(req, res, next) => {
  getAllCatalogue(req.body, (error, results) => {
      if(error)
        return res.status(400).json({
          success: "FAILURE",
          message: "Failed to get catalogue"
        })
      if(!results)
        return res.status(500).json({
          success: "FAILURE",
          message: "No Catalogue Available"
        })
      return res.status(200).json({
        success: "SUCCESS",
        data: results
      })
  })
}

const getAllBookingsById = (req, res, next) => {
  getBookingsByTravellerId(req.params.id, (error, results) => {
    if(error)
      return res.status(400).json({
        success: "FAILURE",
        message: error
      })
    if(!results)
      return res.status(200).json({
        success: "FAILURE",
        message: "No Bookings Available"
      })
    return res.status(200).json({
      success: "SUCCESS",
      data: results
    })
  })
}

module.exports = {getCatalogue, getAllBookingsById};
