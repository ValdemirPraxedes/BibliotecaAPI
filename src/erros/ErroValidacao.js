import ErroBase from "./ErroBase.js";
import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {

    constructor(erro) {

        const mensagensErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ");

        super(`os seguintes erros foram encontrados: ${mensagensErro}`);

    }
}


export default ErroValidacao;