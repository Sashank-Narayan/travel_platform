const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID, updateById, createCatalogueByOwnerId, getCatalogueByOwnerId, getByOwnerId, updateVerifiedByOwnerId} = require("../../services/propertyOwner/propertyOwnerService")
const { sign } = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const sendEmail = require("../../utils/email")
const {encrypt, decrypt} = require("../../utils/encryptAndDecrypt");
require("dotenv").config()

const signUpOwner = async(req, res, next) => {
  const errors = validationResult(req);
  let message;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = genSaltSync(10)
  req.body.password = hashSync(req.body.password, salt);
  const token = encrypt(req.body.email);
  console.log(token)
  createSignUp(req.body, (err, results) => {
    console.log(results);
  if(err)
    return res.status(500).json({
      status: "FAILED",
      message: err
    })
  try{
    message = `${process.env.HOST}property-owner/verify/${results.insertId}?token1=${token.token1}&token2=${token.token2}`;
    sendEmail(req.body.email, "Verify Email", message);
    } catch (error) {
    return res.status(400).send({err : "An error occured " + error});
  }
  return res.status(200).json({
    status: "SUCCESS",
    verification_url: message,
    data: results
    })
  })
}

const verifyEmailToken = async(req, res, next) => {
  let verfied = false;
  console.log(req.query.token1, req.query.token2, req.params.id)
  getByOwnerId(req.params.id,(error, results) => {
    if (!results) return res.status(400).send("Invalid link");
    try{
      const resp = decrypt({token1: req.query.token1, token2: req.query.token2})
      console.log(resp, req.query.token1, results.email)
      if(resp == results.email){
        updateVerifiedByOwnerId(req.params.id, (err, rest) => {
          if(err)
            return res.status(400).json({message: "Could not verify account"});
        })
        return res.status(200).json({
          message: "Successfully verified"
        })
      }
    } catch(e){
      return res.status(400).send("Invalid Link");
    }
    return res.status(400).send("Some error occured");
  })
}

const checkLoginOwner = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getByEmailID(req.body, (error, results) => {
    if(error)
      return res.status(400).json({
        status: "FAILED",
        message: error
      })
    if(!results)
      return res.status(401).json({
        status: "FAILED",
        message: "Invalid Credentials"
      })
    console.log(req.body.password, results)
    const resp = compareSync(req.body.password, results.password)
    if(resp){
      results.password = undefined;
      const jsontoken = sign({ resp: results}, "property" + results.ownerid, {
        expiresIn: "3m"
      })
      return res.status(200).json({
        status: "SUCCESS",
        ownerid: results.ownerid,
        token: jsontoken
      })
    }
    else{
      return res.status(400).json({
        status: "FAILED",
        message: "Username and Password doesnt match"
      })
    }
  })
}

const getAllOwner = async(req, res, next) => {
  const query = "select * from property_owner";
  db.query(
    query,
    (err, results, fields) => {
      if(!err){
        return res.status(200).json({
          success: "SUCCESS",
          data: results
        })
      }
      else {
        return res.status(500).json({
          status: "FAILED",
          message: err
        })
      }
    }
  )
}

const updateByOwnerId = async(req, res, next) => {
  console.log(req.params.id)
  updateById([req.body, req.params.id], (error, results) => {
    if(error)
      return res.status(400).json({
        success: "FAILURE",
        message: error
      })
    if(!results)
      return res.status(500).json({
        success: "FAILURE",
        message: "Failed to update user"
      })
    return res.status(200).json({
      success: "SUCCESS",
      message: "successfully updated"
    })
  })
}

const postCatalogue = (req, res, next) => {
  console.log(req.file)
  createCatalogueByOwnerId([req.body, req.params.id, req.file], (error, results) => {
    if(error)
      return res.json({
        message: error
      })
    console.log(results)
    return res.status(200).json({
      success: 1,
      image_url: `http://localhost:8080/profile/${req.file.filename}`,
      message: "successfully created"
    })
  })
}

const getCatalogue = (req, res, next) => {
  getCatalogueByOwnerId( req.params.id, (error, results) => {
    if(error)
      return res.status(400).json({
        success: "FAILURE",
        message: error
      })
    if(!results)
      return res.json({
        success: "FAILURE",
        message: "Failed to get catalogue"
      })
    return res.status(200).json({
      status: "SUCCESS",
      data:results
    })
  })
}

module.exports = {signUpOwner, checkLoginOwner, getAllOwner, updateByOwnerId, postCatalogue, getCatalogue, verifyEmailToken};
