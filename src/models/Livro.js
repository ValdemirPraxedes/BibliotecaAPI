import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    anoPublicacao: { type: Number, required: true, min: 0 },
    editora: { type: String, required: true, trim: true },
    disponivel: { type: Boolean, default: true },
    dataCadastro: { type: Date, default: Date.now },
    preco: { type: Number, required: true, min: 0 },
    paginas: { type: Number, required: true, min: 1 },
    autor: autorSchema

  }, {versionKey: false});

  const livro = mongoose.model("livros", livroSchema);

  export default livro;