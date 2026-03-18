const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const connectDB = require("./config/db"); // or correct path

connectDB();
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
