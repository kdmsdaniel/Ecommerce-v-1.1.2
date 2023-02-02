const bcrypt = require("bcryptjs");

exports.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

exports.decryptPassword = async (password, comparePassword) => await bcrypt.compare(password, comparePassword);
