const db = require("../../config/db")

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
    db.query(
      `update property_owner set isapproved=? where ownerid=?`,
      [
        data.isapproved,
        data.id
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
      `insert into catalogue (ownerid, title, description) values (?,?,?)`,
      [
        data[1],
        data[0].title,
        data[0].description
      ],
      (error, results, fields) => {
        console.log(results)
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
