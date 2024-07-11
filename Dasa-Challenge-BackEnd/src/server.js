import { sequelize } from "./database/database.js";

import { app } from "./app.js";

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    app.listen(8080, () => {
      console.log("Servidor rodando na porta 8080");
    });
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });
