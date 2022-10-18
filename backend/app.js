const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error.js");

app.use(express.json()) 

//Routes import

// const user = require("./routes/userRoute");


// app.use("/api/v1", user); 

module.exports = app;