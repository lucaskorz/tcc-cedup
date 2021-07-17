import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import PatotasAssocTable from './patotasAssocTable'
import PatotasAssocTable2 from './patotasAssocTable2'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import AgendamentoService from '../../app/service/agendamentoservice'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'
import PatotaService from '../../app/service/patotaService'

class DetalhesAgendamento extends React.Component {

    state = {
        patota: '',
        nomepatota: '',
        patotasAssociadas: [],
        patotasAAssociar: []
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    constructor() {
        super();
        this.pat = new PatotaService();
        this.service = new AgendamentoService();
    }

    buscar = () => {
        if (this.state.nomepatota === '') {
            messages.mensagemErro('O preenchimento do campo Nome da Patota é obrigatório para realizar a consulta.')
            return false;
        }

        const patotaFiltro = {
            nomepatota: this.state.nomepatota
        }

        this.pat
            .consultar(patotaFiltro)
            .then(resposta => {
                const lista = resposta.data;

                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado. Reveja os filtros!")
                }
                this.setState({ patotasAAssociar: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    trazerNaTela = async () => {
        const ultimoId = await this.service.obterUltimoId().data;

        const string = `${ultimoId}`

        return string;
    }

    confirmarDados = async (id) => {

        let objAgendamento = this.state.patotasAssociadas.map((item) => {
   
            if (item.idpatota === id) {
                item.clicked = true;
                return item;
            } else {
                // item.clicked = false;
                return item;
            }
        })

        this.setState({ patotasAssociadas: objAgendamento })

        await this.service.associarPatota(id).then(response => {
            messages.mensagemSucesso('Patota confirmada para esse Agendamento!')
        }).catch(error => {
            messages.mensagemSucesso('Patota confirmada para esse Agendamento!')
        })

        console.log(objAgendamento[0])
    }

    desassociar = (patota) => {
        const patotas = this.state.patotasAssociadas;
        var index = patotas.indexOf(patota);

        if (index > -1) {
            this.state.patotasAssociadas.splice(index, 1);
            this.setState({ patotasAssociadas: patotas })
            messages.mensagemSucesso('Patota desassociada com sucesso!')
        }
    }

    handleAssociar = (patota) => {

        if (this.state.patotasAssociadas.length >= 2) {
            messages.mensagemErro('Só é possível adiconar 2 Patotas a um Agendamento!')

        } else {
            let patotasAssociadas = this.state.patotasAssociadas;
            patotasAssociadas.push(patota)
            this.setState({ patotasAssociadas })
        }
    }

    render() {
        return (
            <div className="col-md-10" style={{ position: 'relative', left: '100px' }}>
                <Card title='Associação de Patotas à Agendamento'>
                    <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-3">
                            <input type="text"
                                className="form-control"
                                id="inputValor"
                                value={this.state.nomepatota}
                                onChange={e => this.setState({ nomepatota: e.target.value })}
                                placeholder="nome da patota a ser associada" />
                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-primary">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                        </div>
                        <div classname="col-md-1">

                        </div>
                        <br />
                    </div>
                    <div className="row">

                        <FormGroup id="inputPatotasAssociadas" label="Patotas associadas:"></FormGroup>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <PatotasAssocTable patotasAssociadas={this.state.patotasAssociadas}
                                        desassociar={this.desassociar}
                                        confirmarDados={(id) => this.confirmarDados(id)} />
                                    <br />
                                </div>
                            </div>
                            <br />
                        </div>
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-5">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <PatotasAssocTable2 patotasAAssociar={this.state.patotasAAssociar} handleAssociar={this.handleAssociar} />

                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">

                            <br />
                        </div>
                    </div>
                </Card>
                <br />
            </div>
        )
    }
}

export default withRouter(DetalhesAgendamento)