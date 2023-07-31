const {verify} = require("jsonwebtoken")

module.exports = {
  checkTravellerToken: (req, res, next) => {
    console.log(req.params)
    let token = req.get("authorization")
    if(token){
      token = token.slice(7)
      verify(token, "traveller" + req.params.id, (err, decode) => {
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
      verify(token, "property" + req.params.id, (err, decode) => {
        if (Date.now() >= decode?.exp * 1000) {
          return res.status(401).json({ message: 'Token has expired.' });
        }
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
