import express from "express";
import conectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectDatabase();


conexao.on("error", (erro) => {
  console.log("erro de conexao", erro);
});

conexao.once("open", () => {
  console.log("conexao feita com sucesso!");
});

const app = express();

routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
