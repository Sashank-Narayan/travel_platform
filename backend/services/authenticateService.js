const db = require("../config/db")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")

module.exports = {
  createSignUp: (data, callback) => {
    const password = data.password;
    console.log(data);
    // let query = "insert into" + data.userType == "a" ? "admin" : (data.userType == "o" ? "property_owner" : "travellers"); "(name, email, password, userType) values (?,?,?,?)"
    let query = `insert into user (name, email, password, role) values (?,?,?,?)`
    db.query(
      query,
      [
        data.name,
        data.email,
        data.password,
        data.userType
      ],
      (error, results, fields) => {
        if (error)
          return callback(error)
        return callback(null, results)
      }
    );
  },

  getByEmailID: (data, callback) => {
    // let query = "SELECT * FROM " + data.userType == "a" ? "admin" : (data.userType == "o" ? "property_owner" : "travellers"); "where email=?"
    let query = "SELECT * FROM user where email=?"
    db.query(
      query,
      [
        data.email
      ],
      (error, results, fields) => {
        if (error)
          return callback(error)
        return callback(null, results[0])
      }
    )
  }
}
