import ApiService from '../apiservice'
import ErroValidacao from '../expcetion/erroValidacao'

export default class PatotaService extends ApiService {
    constructor() {
        super('/api/patotas')
    }

    obterPorId(idPatota) {
        return this.get(`/${idPatota}`)
    }

    validar(patota) {
        const erros = [];

        if (!patota.nomepatota) {
            erros.push("Informe o nome da patota.")
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

    obterNomeJogadores() {
        return this.get('/')
    }

    associarPatota(usuario_id) {
        return this.post(`/inserirAssociacao/${usuario_id}`)
    }

    salvar(patota) {
        return this.post('/', patota)
    }

    atualizar(patota) {
        return this.put(`/${patota.idpatota}`, patota);
    }

    consultar(patotaFiltro) {
        let params = `?nomepatota=${patotaFiltro.nomepatota}`

        return this.get(params);
    }
    deletar(id) {
        return this.delete(`/${id}`)
    }
}