import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  titulo: { type: String, required: [true, "o titulo do livro é obrigatório"], trim: true },
  genero: { type: String, required: [true, "o genero do livro é obrigatório"], trim: true },
  anoPublicacao: { type: Number, required: [true, "o anoPublicacao do livro é obrigatório"], min: [0, "o ano não pode ser menor que 0"] },
  editora: { type: String, required: [true, "a editora do livro é obrigatório"], trim: true },
  disponivel: { type: Boolean, default: true },
  dataCadastro: { type: Date, default: Date.now },
  preco: { type: Number, required: [true, "o preco do livro é obrigatório"], min: [0, "O preco não pode ser menor que 0"] },
  paginas: { type: Number, required: [true, "as paginas do livro é obrigatório"], min: [0, "o numero de paginas não pode ser menor que 0"] },
  autor: autorSchema

}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;
