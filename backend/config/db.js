const mysql = require("mysql2")
// require("dotenv").config()

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password@123",
  database: "traveldb",
  connectionLimit: 10
})

con.connect((err) => {
  if(err)
    console.log(err);
  else {
    console.log("Connected to DB ..")
  }
});

module.exports = con;
