import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import Erro404 from "../erros/Erro404.js";

function manipuladorDeErros(erro, req, res, next) {
    if( erro instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
      } else if(erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
      } else if(erro instanceof Erro404) {
        erro.enviarResposta(res);
      }
       else {
        new ErroBase().enviarResposta(res);
      }
}

export default manipuladorDeErros;