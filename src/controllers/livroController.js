import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";


class LivroController {

    static async listarLivros (req, res) {
        try {
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    } catch(erro) {
        res.status(500).json({message: `${erro.message} - falha  na requisicao`});
    }
    };

    static async listarLivroPorId (req, res) {
        try {
        const id = req.params.id;
        const livroEncontrado = await livro.findById(id);
        res.status(200).json(livroEncontrado);
    } catch(erro) {
        res.status(500).json({message: `${erro.message} - falha  na requisicao`});
    }
    };

    static async cadastrarLivro(req, res) {
        try {
            

            const novoLivro = req.body;
            const autorEncontrado = await autor.findById(novoLivro.autor)

            const livroCompleto = { ...novoLivro, autor: { ... autorEncontrado._doc }}

            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({message: "criado com sucesso", livro: livroCriado});
        } catch(erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro`});
        }
    };

    static async atualizarLivro (req, res) {
        try {
        const id = req.params.id;
        const novoLivro = req.body;
        const autorEncontrado = await autor.findById(novoLivro.autor)

        const livroCompleto = { ...novoLivro, autor: { ... autorEncontrado._doc }}
        const livroCriado = await livro.findByIdAndUpdate(id, livroCompleto);
        res.status(200).json(livroCriado);
    } catch(erro) {
        res.status(500).json({message: `${erro.message} - falha  na requisicao`});
    }
    };

    static async deletarLivro (req, res) {
        try {
        const id = req.params.id;
        const livroDeletado = await livro.findByIdAndDelete(id);
        res.status(200).json(livroDeletado);
    } catch(erro) {
        res.status(500).json({message: `${erro.message} - falha  na requisicao`});
    }
    };

    static async listaLivrosPorEditora (req, res) {
        try {
            const editora = req.query.editora;
            const livrosEncontrado = await livro.find({editora});
            res.status(200).json(livrosEncontrado);

        } catch(erro) {
            res.status(500).json({message: `${erro.message} - falha  na requisicao`});
        }
    };
};

export default LivroController;
