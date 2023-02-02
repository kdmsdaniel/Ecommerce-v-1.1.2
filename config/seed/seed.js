require("../db");
const UsersModel = require("../../models/Users");
const RolesModel = require("../../models/Roles");
const { adminUser, roles } = require("./documents");
const { create } = require("../../helpers/crud");
const { encryptPassword } = require("../../helpers");

const createAdminRole = async roleId => {
  const userPass = await encryptPassword(adminUser.password);
  adminUser.password = userPass;
  adminUser.roles = [roleId];

  return await create(UsersModel, adminUser);
};

(async () => {
  try {
    //Revisar en la bd si existen los roles, si existen nos salimos del script
    const findRoles = await RolesModel.find();
    if (findRoles.length !== 0) {
      console.log("Ya existen roles en la bd");
      process.exit();
    }

    // sino existen roles los creamos
    for (const seedRoles of roles) {
      const createRoles = await create(RolesModel, seedRoles);
      console.log("Role Creado :>> ", createRoles);
    }

    // creamos el usuario admin y nos salimos del script
    const adminRole = await RolesModel.findOne({ name: "admin" });
    const admin = await createAdminRole(adminRole._id);
    console.log("User admin creado :>> ", admin);

    process.exit();
  } catch (error) {
    console.log("error.message :>> ", error.message);
    process.exit(1);
  }
})();
