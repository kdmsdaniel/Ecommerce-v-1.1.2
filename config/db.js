const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.DB_STRING || "mongodb://localhost/ecommerce-dev";

const db = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log(`conectado a la bd de mongo!!! en el string de conexión ${dbURL}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

db();

module.exports = db;
