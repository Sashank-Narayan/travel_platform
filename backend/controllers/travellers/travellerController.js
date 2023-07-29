const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID} = require("../../services/travellers/travellerService")
const { sign } = require("jsonwebtoken");
const {getAllCatalogue} = require("../../services/catalogue/catalogueService");
const {getBookingsByTravellerId} = require("../../services/bookings/bookingService");

const signUp = async(req, res, next) => {
  const salt = genSaltSync(10)
  req.body.password = hashSync(req.body.password, salt);
  createSignUp(req.body, (error, results) => {
  if(error)
    return res.status(500).json({
      status: 0,
      message: error
    })
  return res.status(200).json({
    success: 1,
    data: results
    })
  })
}

const checkLogin = async(req, res, next) => {
  getByEmailID(req.body, (error, results) => {
    if(error)
      return res.json({
        message: error
      })
    if(!results)
      return res.json({
        message: "Invalid Credentials"
      })
    console.log(req.body.password, results)
    const resp = compareSync(req.body.password, results.password)
    if(resp){
      results.password = undefined;
      const jsontoken = sign({ resp: results}, "traveller", {
        expiresIn: "1h"
      })
      return res.json({
        travellerid: results.travellerid,
        token: jsontoken
      })
    }
    else{
      return res.json({
        message: "Username and Password doesnt match"
      })
    }
  })
}

const getCatalogue = async(req, res, next) => {
  getAllCatalogue(req.body, (error, results) => {
      if(error)
        return false
      if(!results)
        return res.json({
          success: 0,
          message: "Failed to get catalogue"
        })
      return res.status(200).json(results)
  })
}

const getAllBookingsById = (req, res, next) => {
  getBookingsByTravellerId(req.params.id, (error, results) => {
    if(error)
      return false
    if(!results)
      return res.json({
        success: 0,
        message: "Failed to get catalogue"
      })
    return res.status(200).json(results)
  })
}

module.exports = {signUp, checkLogin, getCatalogue, getAllBookingsById};
