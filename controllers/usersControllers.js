const { find, findById, create, update, erase } = require("../helpers/crud");
const Model = require("../models/Users");

exports.getAllData = async (req, res) => {
  console.log("req.body :>> ", req.body);
  try {
    const data = await find(Model);

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await findById(Model, id);

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await update(Model, req.body, id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await erase(Model, id);

    res.send(deleteData);
  } catch (error) {
    res.status(400).send(error);
  }
};
