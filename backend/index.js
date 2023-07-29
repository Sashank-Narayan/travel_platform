const express = require("express")
const http = require("http")
const cors = require("cors")
const travellerRouter = require("./routes/travelRouter")
const adminRouter = require("./routes/adminRouter")
const propertyOwnerRouter = require("./routes/propertyOwnerRouter");
// const catalogueRouter = require("./routes/catalogueRouter");
require("./config/db")

const app = express()
app.use(express.json())
app.use(cors())
app.set("view engine", "ejs")
app.use("/api/v1/traveller", travellerRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/property-owner",propertyOwnerRouter)
// app.use("/api/v1/catalogue",catalogueRouter)

app.listen(8080, () => console.log("server started 8080 .."))
