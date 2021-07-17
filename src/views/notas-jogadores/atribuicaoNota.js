import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import * as messages from '../../components/toastr'
import AgendamentoService from '../../app/service/agendamentoservice';
import NotasJogadoresTable from '../../views/notas-jogadores/notasJogadoresTable'

class ConsultaPatota extends React.Component {

    state = {
        idagendamento: null,
        nomepatota: '',
        nomejogador: '',
        nota: '',
        jogadores: []
    }

    constructor() {
        super();
        this.service = new AgendamentoService();
    }

    buscar = () => {
        if (this.state.nomepatota === '' || this.state.idagendamento === '') {
            messages.mensagemErro('O preenchimento de todos os campos são obrigatórios para realizar a consulta.')
            return false;
        }

        const patotaFiltro = {
            idagendamento: this.state.idagendamento,
            nomepatota: this.state.nomepatota
        }

        this.service
            .getAgePatJog(patotaFiltro.idagendamento, patotaFiltro.nomepatota)
            .then(resposta => {
                const lista = resposta.data;


                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado. Reveja os filtros!")
                }
                this.setState({ jogadores: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    confirmarDados = async (nota, id, idp) => {

        await this.service.atribuiNota(nota, id, idp).then(response => {
            messages.mensagemSucesso('Nota alterado com sucesso para esse jogador!')
        }).catch(erro => {
            messages.mensagemSucesso('Nota alterado com sucesso para esse jogador!')
        })
    }

    prepareConsultaNota = () => {
        this.props.history.push('/consulta-notas')
    }

    render() {

        return (
            <Card title="Consulta Jogadores p/ atribuição de nota">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputIDAgendamento" label="ID Agendamento: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputIDAgendamento"
                                    value={this.state.idagendamento}
                                    onChange={e => this.setState({ idagendamento: e.target.value })}
                                    placeholder="Digite o ID do Agendamento" />
                            </FormGroup>
                            <br />
                            <FormGroup htmlFor="inputNomePatota" label="Nome da Patota: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputNomePatota"
                                    value={this.state.nomepatota}
                                    onChange={e => this.setState({ nomepatota: e.target.value })}
                                    placeholder="Digite o nome da Patota" />
                            </FormGroup>
                            <br />
                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.prepareConsultaNota}
                                type="button"
                                className="btn btn-primary">
                                <i className="pi pi-reply"></i> Consultar Notas
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <NotasJogadoresTable jogadores={this.state.jogadores}
                                notas={this.state.nota}
                                confirmarDados={(nota, id, idp) => this.confirmarDados(nota, id, idp)} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaPatota);