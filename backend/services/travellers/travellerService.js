const db = require("../../config/db")
const {genSaltSync, hashSync, compareSync} = require("bcrypt")

module.exports = {
  createSignUp: (data, callback) => {
    const password = data.password
    db.query(
      `insert into travellers (name, email, password) values (?,?,?)`,
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
    `select * from travellers where email=?`,
    [
      data.email
    ],
    (error, results, fields) => {
      if(error)
        return callback(error)
      return callback(null, results[0])
      }
    )
  }
}
