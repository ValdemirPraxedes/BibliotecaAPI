import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    titulo: { type: String, required: true, trim: true },
    autor: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    anoPublicacao: { type: Number, required: true, min: 0 },
    editora: { type: String, required: true, trim: true },
    disponivel: { type: Boolean, default: true },
    dataCadastro: { type: Date, default: Date.now },
    preco: { type: Number, required: true, min: 0 },
    paginas: { type: Number, required: true, min: 1 }
  }, {versionKey: false});

  const livro = mongoose.model("livros", livroSchema);

  export default livro;