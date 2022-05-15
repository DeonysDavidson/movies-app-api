const express = require("express");
const cookieParser = require("cookie-parser");
const movieRoute = require("./routes/movieRouter");
const userRoute = require("./routes/userRouter");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/movies", movieRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
