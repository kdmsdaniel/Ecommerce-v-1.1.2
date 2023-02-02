const jwt = require("jsonwebtoken");
require("dotenv").config();

const secrect = process.env.SECRECT_JWT;

exports.createToken = id => jwt.sign({ id }, secrect, { expiresIn: "1 day" });

exports.verifyJwt = token => jwt.verify(token, secrect);
