const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID} = require("../../services/travellers/travellerService")
const { sign } = require("jsonwebtoken");
const {getAllCatalogue} = require("../../services/catalogue/catalogueService");
const {getBookingsByTravellerId} = require("../../services/bookings/bookingService");
const { body, validationResult } = require('express-validator');

const signUp = async(req, res, next) => {
  const errors = validationResult(req);
  let message;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = genSaltSync(10)
  req.body.password = hashSync(req.body.password, salt);
  createSignUp(req.body, (error, results) => {
  if(error)
    return res.status(500).json({
      status: "FAILURE",
      message: error
    })
  return res.status(200).json({
    success: "SUCCESS",
    data: results
    })
  })
}

const checkLogin = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getByEmailID(req.body, (error, results) => {
    if(error)
      return res.status(400).json({
        status: "FAILURE",
        message: error
      })
    if(!results)
      return res.status(401).json({
        status: "FAILURE",
        message: "Invalid Credentials"
      })
    const resp = compareSync(req.body.password, results.password)
    if(resp){
      results.password = undefined;
      const jsontoken = sign({ resp: results}, "traveller", {
        expiresIn: "1h"
      })
      return res.json({
        status: "SUCCESS",
        travellerid: results.travellerid,
        token: jsontoken
      })
    }
    else{
      return res.status(400).json({
        status: "FAILURE",
        message: "Username and Password doesnt match"
      })
    }
  })
}

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

module.exports = {signUp, checkLogin, getCatalogue, getAllBookingsById};
