const db = require("../../config/db")
const multer = require("multer")
const path = require("path")
const express = require("express")

module.exports = {
  createSignUp: (data, callback) => {
    const password = data.password
    db.query(
      `insert into property_owner (name, email, password, isapproved) values (?,?,?,false)`,
      [
        data.name,
        data.email,
        data.password
      ],
      (error, results, fields) => {
        if(error)
          return callback(error)
        return callback(null, results)
      }
    );
  },

  getByEmailID : (data, callback) => {
  db.query(
    `select * from property_owner where email=? and isapproved=true`,
    [
      data.email
    ],
    (error, results, fields) => {
      if(error)
        return callback(error)
      return callback(null, results[0])
      }
    )
  },

  updateById : (data, callback) => {
    console.log(data)
    db.query(
      `update property_owner set isapproved=? where ownerid=?`,
      [
        data[0].isapproved,
        data[1]
      ],
      (error, results, fields) => {
        console.log(results)
        if(error)
          return callback(error)
        return callback(null, results)
        }
      )
    },

  createCatalogueByOwnerId: (data, callback) => {
    console.log(data)
    db.query(
      `insert into catalogue (ownerid, title, description, images) values (?,?,?,?)`,
      [
        data[1],
        data[0].title,
        data[0].description,
        `http://localhost:8080/profile/${data[2].filename}`
      ],
      (error, results, fields) => {
        if(error)
          return callback(error)
        return callback(null, results)
        }
      )
    },

    getCatalogueByOwnerId: (data, callback) => {
      db.query(
        `select * from catalogue where ownerid = ?`,
        [
          data
        ],
        (error, results, fields) => {
          console.log(results)
          if(error)
            return callback(error)
          return callback(null, results)
          }
      )
    }
}
