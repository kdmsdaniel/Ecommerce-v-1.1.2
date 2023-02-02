module.exports = {
  find: async model => {
    try {
      const data = await model.find();

      return data;
    } catch (error) {
      throw error.message;
    }
  },
  findById: async (model, id) => {
    try {
      const data = await model.findOne({ _id: id });

      return data;
    } catch (error) {
      throw error.message;
    }
  },
  create: async (model, body) => {
    try {
      const data = new model(body);

      const dataCreated = await data.save();

      return dataCreated;
    } catch (error) {
      throw error.message;
    }
  },
  update: async (model, body, id) => {
    try {
      const data = await model.findByIdAndUpdate(id, body, { new: true });

      return data;
    } catch (error) {
      throw error.message;
    }
  },
  erase: async (model, id) => {
    try {
      await model.findByIdAndDelete(id);

      return "La data fue borrada correctamente!!!";
    } catch (error) {
      throw error.message;
    }
  }
};
