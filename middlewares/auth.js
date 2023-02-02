const { verifyJwt, permissions } = require("../helpers");
const UsersModels = require("../models/Users");
const ProductsModels = require("../models/Products");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("No token provided");
  const token = req.headers.authorization.replace(/^Bearer\s+/, "");
  try {
    const verify = verifyJwt(token);

    const user = await UsersModels.findById(verify.id, { password: 0 }).populate("roles");
    if (!user) return res.status(401).send("User does not exists");

    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.authPermissions = async (req, res, next) => {
  const { roles, permissions: perms, isOwner } = req.body.user;
  const { method, path } = req;

  if (isOwner) return next();

  console.log("isOwner authPermissions:>> ", isOwner);

  const scope = path.split("/");

  const findPermissions = permissions.find(x => x.method === method);

  const methodPermissions = [...findPermissions.permissions, `${scope[1]}_${findPermissions.scope}`];

  const getPermissions = perms && perms.length !== 0 ? [perms] : roles.map(x => x.permissions);

  let count = 0;
  for (const assignPermissions of getPermissions) {
    for (const compare of methodPermissions) {
      if (assignPermissions.includes(compare)) {
        count++;
      }
    }
  }

  if (count === 0) return res.status(401).send("unauthorized!!");

  next();
};

exports.isOwner = async (req, res, next) => {
  const { id } = req.body.user;
  const { method, path } = req;

  const scope = path.split("/");

  console.log("scope :>> ", scope);

  switch (method) {
    case "PUT":
    case "DELETE":
      if (scope[1] === "products") {
        try {
          const productOwner = await ProductsModels.findOne({ _id: scope[2], productOwner: id });
          console.log("productOwner :>> ", productOwner);

          if (productOwner !== null) {
            req.body.user.isOwner = true;
            return next();
          }
        } catch (error) {
          console.log("error :>> ", error);
        }
      }

      if (scope[1] === "users") {
        if (id === scope[2]) {
          req.body.user.isOwner = true;
          return next();
        }
      }

    default:
      break;
  }

  next();
};
