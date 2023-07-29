const {verify} = require("jsonwebtoken")

module.exports = {
  checkTravellerToken: (req, res, next) => {
    let token = req.get("authorization")
    if(token){
      token = token.slice(7)
      verify(token, "traveller", (err, decode) => {
        if(err) {
          res.json({
            success: 0,
            message: "Invalid Token"
          })
        }
        else{
          next();
        }
      })
    }
    else{
      res.json({
        success: 0,
        message: "Access denied"
      })
    }
  },

  checkAdminToken: (req, res, next) => {
    let token = req.get("authorization")
    if(token){
      token = token.slice(7)
      verify(token, "admin", (err, decode) => {
        if(err) {
          res.json({
            success: 0,
            message: "Invalid Token"
          })
        }
        else{
          next();
        }
      })
    }
    else{
      res.json({
        success: 0,
        message: "Access denied"
      })
    }
  },

  checkOwnerToken: (req, res, next) => {
    let token = req.get("authorization")
    if(token){
      token = token.slice(7)
      verify(token, "property", (err, decode) => {
        console.log(decode[resp][ownerid]);
        if(err) {
          res.json({
            success: 0,
            message: "Invalid Token"
          })
        }
        else{
          next();
        }
      })
    }
    else{
      res.json({
        success: 0,
        message: "Access denied"
      })
    }
  }
}
