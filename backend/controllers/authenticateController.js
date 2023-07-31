const db = require("../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID} = require("../services/authenticateService")
const { sign } = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const signUp = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.query.role)
  req.body.userType = req.query.role;
  const salt = genSaltSync(10)
  req.body.password = hashSync(req.body.password, salt);
  createSignUp(req.body, (error, results) => {
  if(error)
    return res.status(500).json({
      status: "FAILURE",
      message: error
    })
  return res.status(200).json({
    status: "SUCCESS",
    data: results
    })
  })
}

const checkLogin = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.query.role)
  req.body.userType = req.query.role;
  console.log(req.query.userType)
  getByEmailID(req.body, (error, results) => {
    console.log(req.query.role + results.travellerid)
    if(error)
      return res.json({
        status: "FAILURE",
        message: error
      })
    if(!results)
      return res.json({
        status: "FAILURE",
        message: "Invalid Credentials"
      })
    console.log(req.body.password, results)
    const resp = compareSync(req.body.password, results.password)
    const key = req.query.role == "admin" ? req.query.role : req.query.role + results.travellerid;
    if(resp){
      results.password = undefined;
      const jsontoken = sign({ resp: results}, key, {
        expiresIn: "1h"
      })
      return res.json({
        status: "SUCCESS",
        id: req.query.role == "admin" ? results.adminid : results.travellerid,
        token: jsontoken
      })
    }
    else{
      return res.json({
        status: "FAILURE",
        message: "Username and Password doesnt match"
      })
    }
  })
}

module.exports = {signUp, checkLogin};
