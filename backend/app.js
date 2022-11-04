const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser") //to pass cookie in auth.js
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// app.use(express.json());
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(fileUpload()); 
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, 
// parameterLimit:50000 
}));   

    
// Routes import

const user = require("./routes/userRoute");
const service = require("./routes/serviceRoute")
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", user); 
app.use("/api/v1", service);
app.use("/api/v1", order);
app.use("/api/v1", payment);



//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;