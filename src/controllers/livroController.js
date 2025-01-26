import { autor } from "../models/index.js";
import { livro } from "../models/index.js";
import Erro404 from "../erros/Erro404.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {

    static async listarLivros(req, res, next) {
        try {

            const { limite = 5, pagina = 1, campoOrdenacao = "_id", ordem = -1 } = req.query;



            const listaLivros = await livro.find()
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite)
                .populate("autor")
                .exec();

            res.status(200).json(listaLivros);



        } catch (erro) {
            next(erro);
        }
    };

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);

            if (livroEncontrado !== null) {
                res.status(200).json(livroEncontrado);
            } else {
                next(new Erro404("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static async cadastrarLivro(req, res, next) {
        try {


            const novoLivro = req.body;
            const autorEncontrado = await autor.findById(novoLivro.autor);

            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };

            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
        } catch (erro) {
            next(erro);
        }
    };

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;
            const novoLivro = req.body;
            const autorEncontrado = await autor.findById(novoLivro.autor);

            if (livroEncontrado === null) {
                next(new Erro404("Id do livro não localizado."));
            } else {
                const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
                const livroCriado = await livro.findByIdAndUpdate(id, livroCompleto);
                res.status(200).json(livroCriado);
            }


        } catch (erro) {
            next(erro);
        }
    };

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;
            const livroDeletado = await livro.findByIdAndDelete(id);
            if (livroDeletado !== null) {
                res.status(200).json(livroDeletado);
            } else {
                next(new Erro404("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static async listaLivrosPorFiltro(req, res, next) {
        try {
            const { editora, titulo, nomeAutor } = req.query;

            const busca = {};

            if (editora) busca.editora = editora;
            if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
            if (nomeAutor) {
                const a = await autor.findOne({ nome: nomeAutor });
                if (a !== null) {
                    busca.autor = a._id;
                } else {
                    busca = null;
                }
            }
            if (busca !== null) {
                const livrosEncontrado = await livro.find(busca).populate("autor");
                res.status(200).send(livrosEncontrado);
            } else {
                res.status(200).send([]);
            }

        } catch (erro) {
            next(erro);
        }
    };
};

export default LivroController;
