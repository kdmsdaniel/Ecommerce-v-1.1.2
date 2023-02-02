const app = require("./app");
require("./config/db");
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Servidor Levantado en el puerto ${port}!!! ${environment}`));
