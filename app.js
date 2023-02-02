const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");

app.use(express.json({ extended: true }));

app.use(cors());
app.use("/api/v1", router());

module.exports = app;
