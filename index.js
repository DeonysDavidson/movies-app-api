const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const dbConnectionString = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(dbConnectionString, { useNewUrlParser: true })
  .then((res) => {
    console.log("DB connection established!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log("The express server is listening!");
});
