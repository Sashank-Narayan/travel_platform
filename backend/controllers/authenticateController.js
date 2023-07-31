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
  if(!(req.query.role == "admin" || req.query.role == "traveller"))
    return res.json({
      status: "FAILURE",
      message: "Send a valid user role"
    })
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
  getByEmailID(req.body, (error, results) => {
    console.log(results)
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
    if(resp){
      const key = results.role == "admin" ? results.role : results.role + results.userid;
      results.password = undefined;
      const jsontoken = sign({ resp: results}, key, {
        expiresIn: "1h"
      })
      return res.json({
        status: "SUCCESS",
        id: results.userid,
        admin: results.role == "admin" ? "yes" : "no",
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
