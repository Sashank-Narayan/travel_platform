const mysql = require("mysql2")
require("dotenv").config()

const con = mysql.createConnection({
  host: process.env.DB_HOST_LOCAL,
  user: process.env.DB_USER_LOCAL,
  password: process.env.DB_PASS_LOCAL,
  database: process.env.DB_NAME_LOCAL,
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
