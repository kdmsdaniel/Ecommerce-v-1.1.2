const Model = require("../../models/Users");
const { create } = require("../../helpers/crud");
const { encryptPassword, createToken, decryptPassword } = require("../../helpers");

exports.register = async (req, res) => {
  req.body.password = await encryptPassword(req.body.password);

  try {
    const user = await create(Model, req.body);

    const token = createToken(user.id);

    res.status(201).json({ message: "User Created", token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password: pass } = req.body;
  try {
    // si el email existe en bd, sino return un error
    const user = await Model.find({ email });
    if (user.length === 0) return res.status(404).send("User Not Found");

    // verificar si el pass es correcto, sino return error
    const [{ password, id, name }] = user;
    const checkPass = await decryptPassword(pass, password);
    if (!checkPass) return res.status(404).send("Email or password invalid");
    // crear un token y se lo devolvemos a la app

    const token = createToken(id);

    res.json({ user: name, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
