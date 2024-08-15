const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlingMiddleware");

mongoose
  .connect(
    "mongodb+srv://kanadkulkarni2013:RYCiIRxAigjsleRU@cluster.vlzy7s1.mongodb.net/mern-expenses"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//!Middleware
app.use(express.json()); //?Pass data in json
//!Routes
app.use("/", userRouter);
//!Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is running at PORT ${PORT}`));
