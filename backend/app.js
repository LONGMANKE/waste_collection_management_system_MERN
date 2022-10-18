const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser") //to pass cookie in auth.js

app.use(express.json()) 
app.use(cookieParser())

// Routes import

const user = require("./routes/userRoute");


app.use("/api/v1", user); 

module.exports = app;