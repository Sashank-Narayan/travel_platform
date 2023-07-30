const db = require("../../config/db")

module.exports = {
  getBookingsByTravellerId : (data, callback) => {
  console.log(data)
  db.query(
    `SELECT b.bookingid, b.travellerid, b.catalogueid, c.title as Venue, c.ownerid
      FROM bookings b
      JOIN catalogue c ON b.catalogueid = c.catalogueid
      WHERE b.travellerid =?`,
    [
      data
    ],
    (error, results, fields) => {
      if(error)
        return callback(error)
      return callback(null, results)
      }
    )
  },
  
  getBookingsCatalogueByTravellerId : (data,callback) => {
    db.query(
      `select bookingid, travellerid, catalogueid from bookings where travellerid=?`,
      [
        data
      ],
      (error, results, fields) => {
        if(error)
          return callback(error)
        return callback(null, results)
      }
    )
  }
}
