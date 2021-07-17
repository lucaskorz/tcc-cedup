import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import LocalStorageService from '../../app/service/localstorageService'
import { Calendar } from 'primereact/calendar';

import * as messages from '../../components/toastr'
import AgendamentoService from '../../app/service/agendamentoservice'
import AgendamentoTable from './agendamentoTable'

class ConsultaAgendamento extends React.Component {

    state = {
        valor: '',
        dataagendamento: '',
        showConfirmDialog: false,
        agendamentoDeletar: {},
        agendamentos: []
    }

    constructor() {
        super();
        this.service = new AgendamentoService();
    }

    buscar = () => {
        if (!this.state.dataagendamento) {
            messages.mensagemErro('O preenchimento do campo Data Agendamento é obrigatório para realizar a consulta.')
            return false;
        }

        const agendamentoFiltro = {
            valor: this.state.valor,
            dataagendamento: this.state.dataagendamento
        }

        this.service
            .consultar(agendamentoFiltro)
            .then(resposta => {
                const lista = resposta.data;

                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado. Reveja os filtros!")
                }
                this.setState({ agendamentos: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-agendamentos/${id}`)
    }

    abrirConfirmacao = (agendamento) => {
        this.setState({ showConfirmDialog: true, agendamentoDeletar: agendamento })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, agendamentoDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.agendamentoDeletar.id)
            .then(response => {
                const agendamentos = this.state.agendamentos;
                const index = agendamentos.indexOf(this.state.agendamentoDeletar)
                agendamentos.splice(index, 1);
                this.setState({ agendamentos: agendamentos, showConfirmDialog: false })
                messages.mensagemSucesso('Agendamento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar esse agendamento.')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-agendamentos')
    }

    handleDate = (e) => {
        const formatDate = new Date(e.value)
        formatDate.setMonth('07')
        const finalFormatDate = formatDate.getFullYear() + '/' + formatDate.getMonth().toString().padStart(2, 0) + '/' + formatDate.getDate().toString().padStart(2, 0) + ' ' +
            formatDate.getHours().toString().padStart(2, 0) + ':' + formatDate.getMinutes().toString().padStart(2, 0) + ':' + formatDate.getSeconds().toString().padStart(2, 0)
        this.setState({ dataagendamento: finalFormatDate })
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );

        return (
            <Card title="Consulta Agendamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <div className="col-md-4">
                                <FormGroup htmlFor="inputData" label="Data do Agendamento:">
                                    <input type="text"
                                        className="form-control"
                                        id="inputData"
                                        value={this.state.dataagendamento}
                                        onChange={e => this.setState({ dataagendamento: e.target.value })}
                                        placeholder="Informe a data..." />
                                </FormGroup>
                            </div>
                        </div>
                        <br />
                        <button onClick={this.buscar}
                            type="button"
                            className="btn btn-success">
                            <i className="pi pi-search"></i> Buscar
                        </button>
                        <button onClick={this.preparaFormularioCadastro}
                            type="button" className="btn btn-danger">
                            <i className="pi pi-plus"></i>  Cadastrar
                        </button>

                    </div>
                </div>

                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AgendamentoTable agendamentos={this.state.agendamentos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={(id) => this.editar(id)} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Tem certeza que deseja excluir esse agendamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaAgendamento);