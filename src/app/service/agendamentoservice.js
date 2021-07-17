import ApiService from '../apiservice'
import ErroValidacao from '../expcetion/erroValidacao'

export default class AgendamentoService extends ApiService {
    constructor() {
        super('/api/agendamentos')
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    validar(agendamento) {
        const erros = [];

        if (!agendamento.dataagendamento) {
            erros.push("Informe a data e horário do seu novo agendamento.")
        }
        if (!agendamento.valor) {
            erros.push("Informe o valor do Agendamento.")
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

    obterListaPatotas() {
        return [
            { label: 'SELECIONE...', value: '' }
        ]
    }

    obterUltimoId() {
        return this.get(`/buscaId`);
    }

    obterNomePatotas() {
        return this.get('/')
    }

    getAgePatJog(idage, nomepatota) {
        return this.get(`/getAgePatJog/${idage}/${nomepatota}`)
    }

    associarPatota(patota_id) {
        return this.post(`/inserirAssociacao/${patota_id}`)
    }

    salvar(agendamento, valor, id_usuario) {
        return this.post(`/${valor}/${id_usuario}`, agendamento)
    }

    atualizar(agendamento) {
        return this.put(`/${agendamento.id}`, agendamento);
    }

    consultar(agendamentoFiltro) {
        let params = `?dataagendamento=${agendamentoFiltro.dataagendamento}`

        if (agendamentoFiltro.horario) {
            params = `?valor=${agendamentoFiltro.valor}`
        }

        if (agendamentoFiltro.usuario) {
            params = `${params}&usuario=${agendamentoFiltro.usuario}`
        }
        
        return this.get(params);
    }
    deletar(id) {
        return this.delete(`/${id}`)
    }

    atribuiNota(ultimaNota, id, idp) {
        return this.post(`/atribuiNota/${ultimaNota}/${id}/${idp}`)
    }
    getNotas(patota_id) {
        return this.get(`/getNotas/${patota_id}`)
    }
}