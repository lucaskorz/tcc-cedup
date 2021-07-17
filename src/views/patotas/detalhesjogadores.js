import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import JogadoresAssocTable from './jogadoresAssocTable'
import JogadoresAssocTable2 from './jogadoresAssocTable2'
import UsuarioService from '../../app/service/usuarioService'

import * as messages from '../../components/toastr'
import PatotaService from '../../app/service/patotaService'

class DetalhesJogadores extends React.Component {

    state = {
        jogador: '',
        nomejogador: '',
        jogadoresAssociados: [],
        jogadoresAAssociar: []
    }

    constructor() {
        super();
        this.pat = new UsuarioService();
        this.service = new PatotaService();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    handleAssociar = (jogador) => {
        console.log(jogador)

        if (this.state.jogadoresAssociados.length >= 15) {
            messages.mensagemErro('Só é possível adiconar 15 jogadores a uma Patota!')

        } else {
            let jogadoresAssociados = this.state.jogadoresAssociados;
            jogadoresAssociados.push(jogador)
            this.setState({ jogadoresAssociados })
        }
    }

    buscar = () => {
        if (this.state.jogador === '') {
            messages.mensagemErro('O preenchimento do campo Jogador é obrigatório para realizar a consulta.')
            return false;
        }

        const usuarioFiltro = {
            nome: this.state.jogador
        }

        this.pat
            .consultar(usuarioFiltro)
            .then(resposta => {
                const lista = resposta.data;

                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado. Reveja os filtros!")
                }
                this.setState({ jogadoresAAssociar: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    confirmarDados = async (id) => {

        let objPatota = this.state.jogadoresAssociados.map((item) => {
            if (item.id === id) {
                item.clicked = true;
                return item;
            } else {
                // item.clicked = false;
                return item;
            }
        })

        this.setState({ jogadoresAssociados: objPatota })
        console.log(objPatota);

        await this.service.associarPatota(id).then(response => {
            messages.mensagemSucesso('Jogador confirmado para essa Patota!')
        }).catch(error => {
            messages.mensagemSucesso('Jogador confirmado para essa Patota!')
        })

        console.log(objPatota[0])
    }

    desassociar = (jogador) => {
        const jogadores = this.state.jogadoresAssociados
        var index = jogadores.indexOf(jogador);

        if (index > -1) {
            this.state.jogadoresAssociados.splice(index, 1);
            this.setState({ jogadoresAssociados: jogadores })
            messages.mensagemSucesso('Jogador desassociado com sucesso!')
        }
    }

    render() {

        return (
            <div className="col-md-10" style={{ position: 'relative', left: '100px' }}>
                <Card title='Associação de Jogadores à Patota'>
                    <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-2">
                            <input type="text"
                                className="form-control"
                                id="inputValor"
                                value={this.state.jogador}
                                onChange={e => this.setState({ jogador: e.target.value })}
                                placeholder="nome do jogador..." />
                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-primary">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.limpar}
                                type="button"
                                className="btn btn-danger">
                                <i className="pi pi-trash"></i>
                            </button>

                        </div>
                        <div classname="col-md-1">

                        </div>
                        <br />
                    </div>
                    <div className="row">

                        <FormGroup id="inputJogadoresAssociados" label="Jogadores associados:"></FormGroup>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <JogadoresAssocTable jogadoresAssociados={this.state.jogadoresAssociados} desassociar={this.desassociar}
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
                                    <JogadoresAssocTable2 jogadoresAAssociar={this.state.jogadoresAAssociar} handleAssociar={this.handleAssociar} />
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

export default withRouter(DetalhesJogadores)