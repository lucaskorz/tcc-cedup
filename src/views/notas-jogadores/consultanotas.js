import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'
import AgendamentoService from '../../app/service/agendamentoservice'
import PatotasTable from './patotasTable';

class ConsultaPatota extends React.Component {

    state = {
        nomepatota: '',
        patotas: []
    }

    constructor() {
        super();
        this.service = new AgendamentoService();
    }

    buscar = () => {
        if (this.state.nomepatota === '') {
            messages.mensagemErro('O preenchimento do campo Nome Patota é obrigatório para realizar a consulta.')
            return false;
        }

        this.service
            .getNotas(this.state.nomepatota)
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

    preparaFormularioCadastro = () => {
        this.props.history.push('/notas')
    }

    render() {
        return (
            <Card title="Consulta Notas">
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
                                <i className="pi pi-replay"></i>  Atribuir Nota
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <PatotasTable patotas={this.state.patotas} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaPatota);