require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const mongoString = process.env.DATABASE_KEY;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log({ error });
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(express.json());

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server started at 3000");
});
