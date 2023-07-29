const db = require("../../config/db");
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {createSignUp, getByEmailID, updateById, createCatalogueByOwnerId, getCatalogueByOwnerId} = require("../../services/propertyOwner/propertyOwnerService")
const { sign } = require("jsonwebtoken");

const signUpOwner = async(req, res, next) => {
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

const checkLoginOwner = async(req, res, next) => {
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
      const jsontoken = sign({ resp: results}, "property", {
        expiresIn: "3m"
      })
      return res.json({
        ownerid: results.ownerid,
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

const getAllOwner = async(req, res, next) => {
  const query = "select * from property_owner";
  db.query(
    query,
    (err, results, fields) => {
      if(!err){
        console.log(results)
        return res.json(results)
      }
      else {
        console.log(err)
      }
    }
  )
}

const updateByOwnerId = async(req, res, next) => {
  console.log(req.params.id)
  updateById([req.body, req.params.id], (error, results) => {
    if(error)
      return false
    if(!results)
      return res.json({
        success: 0,
        message: "Failed to update user"
      })
    return res.status(200).json({
      success: 1,
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
      return false
    if(!results)
      return res.json({
        success: 0,
        message: "Failed to get catalogue"
      })
    return res.status(200).json(results)
  })
}

module.exports = {signUpOwner, checkLoginOwner, getAllOwner, updateByOwnerId, postCatalogue, getCatalogue};
