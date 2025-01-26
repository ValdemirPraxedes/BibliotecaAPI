import mongoose from "mongoose";
import { autor } from "../models/index.js";
import Erro404 from "../erros/Erro404.js";


class AutorController {

  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch(erro) {
      next(erro);
    }
  };

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if(autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new Erro404("Id do autor não localizado."));
      }
     
    } catch(erro) {
      next(erro);
    }
  };

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "criado com sucesso", autor: novoAutor});
    } catch(erro) {
      next(erro);
    }
  };

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if(autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new Erro404("Id do autor não localizado."));
      }

    } catch(erro) {
      next(erro);
    }
  };

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorDeletado = await autor.findByIdAndDelete(id);
      if(autorDeletado !== null) {
        res.status(200).json(autorDeletado);
      } else {
        next(new Erro404("Id do autor não localizado."));
      }
    } catch(erro) {
      next(erro);
    }
  };
};

export default AutorController;
