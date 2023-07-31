const express = require("express")
const http = require("http")
const cors = require("cors")
const travellerRouter = require("./routes/travelRouter")
const propertyOwnerRouter = require("./routes/propertyOwnerRouter");
const authRouter = require("./routes/authRouter");
require("./config/db")

const app = express()
app.use(express.json())
app.use(cors())
app.use("/images", express.static("upload/images"))
app.set("view engine", "ejs")
app.use("/api/v1/traveller", travellerRouter)
app.use("/api/v1/property-owner",propertyOwnerRouter)
app.use("/api/v1",authRouter)

app.listen(8080, () => console.log("server started 8080 .."))
