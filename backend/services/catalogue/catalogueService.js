const db = require("../../config/db")

module.exports = {
  getAllCatalogue: (data, callback) => {
    db.query(
      `select * from catalogue`,
      [],
      (error, results, fields) => {
        if(error)
          return callback(error)
        return callback(null, results)
      }
    )
  }
}
