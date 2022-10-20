const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
//routes
const departmentsRoute = require("./route/DepartmentRoute");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db.");
  })
  .catch(() => {
    console.log("error connecting to db!!!");
  });

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/departments", departmentsRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("backend is running ON :", process.env.PORT);
});
