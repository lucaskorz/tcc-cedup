import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'
import PatotaService from '../../app/service/patotaService'
import PatotasTable from './patotasTable'

class ConsultaPatota extends React.Component {

    state = {
        nomepatota: '',
        showConfirmDialog: false,
        patotaDeletar: {},
        patotas: []
    }

    constructor() {
        super();
        this.service = new PatotaService();
    }

    buscar = () => {
        if (this.state.nomepatota === '') {
            messages.mensagemErro('O preenchimento do campo Nome Patota é obrigatório para realizar a consulta.')
            return false;
        }

        const patotaFiltro = {
            nomepatota: this.state.nomepatota
        }

        this.service
            .consultar(patotaFiltro)
            .then(resposta => {
                const lista = resposta.data;

                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado. Reveja os filtros!")
                }
                this.setState({ patotas: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (idPatota) => {
        this.props.history.push(`/cadastro-patota/${idPatota}`)
    }

    abrirConfirmacao = (patota) => {
        this.setState({ showConfirmDialog: true, patotaDeletar: patota })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, patotaDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.patotaDeletar.idpatota)
            .then(response => {
                const patotas = this.state.patotas;
                const index = patotas.indexOf(this.state.patotaDeletar)
                patotas.splice(index, 1);
                this.setState({ patotas: patotas, showConfirmDialog: false })
                messages.mensagemSucesso('Patota deletada com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Impossível excluir pois existem jogador vinculados à essa Patota.')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-patota')
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );


        return (
            <Card title="Consulta Patotas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNomePatota" label="Nome patota: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputNomePatota"
                                    value={this.state.nomepatota}
                                    onChange={e => this.setState({ nomepatota: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>
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
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <PatotasTable patotas={this.state.patotas}
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
                        Tem certeza que deseja excluir esse patota?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaPatota);