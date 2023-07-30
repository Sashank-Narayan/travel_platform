const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID} = require("../../services/admin/adminService")
const { sign } = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const signUpAdmin = async(req, res, next) => {
  const errors = validationResult(req);
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
    status: "SUCCESS",
    data: results
    })
  })
}

const checkLoginAdmin = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getByEmailID(req.body, (error, results) => {
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
      results.password = undefined;
      const jsontoken = sign({ resp: results}, "admin", {
        expiresIn: "1h"
      })
      return res.json({
        adminid: results.adminid,
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

module.exports = {signUpAdmin, checkLoginAdmin};
