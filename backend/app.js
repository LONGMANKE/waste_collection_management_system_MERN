const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser") //to pass cookie in auth.js
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes import

const user = require("./routes/userRoute");


app.use("/api/v1", user);  

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;