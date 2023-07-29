const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID} = require("../../services/admin/adminService")
const { sign } = require("jsonwebtoken");


const signUpAdmin = async(req, res, next) => {
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

const checkLoginAdmin = async(req, res, next) => {
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
