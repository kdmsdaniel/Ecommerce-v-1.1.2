const { find, findById, create, update, erase } = require("../helpers/crud");
const Model = require("../models/Products");

/**
 * Get all data Controller
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {Object} Products Found!!
 */
exports.getAllData = async (req, res) => {
  try {
    const data = await find(Model);

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Get data by ID
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {Object} Product Found
 */
exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await findById(Model, id);

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Create a product controller
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {Object} Product created
 */
exports.createData = async (req, res) => {
  const { _id } = req.body.user;
  req.body.productOwner = _id;

  try {
    const data = await create(Model, req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Update Product controller
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {Object} Product Updated
 */
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await update(Model, req.body, id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Get data by ID
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {String} Message
 */
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await erase(Model, id);

    res.send(deleteData);
  } catch (error) {
    res.status(400).send(error);
  }
};
