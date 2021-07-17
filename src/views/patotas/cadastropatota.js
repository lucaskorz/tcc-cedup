import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import PatotaService from '../../app/service/patotaService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroPatota extends React.Component {

    state = {
        idpatota: null,
        nomepatota: '',
        atualizando: false
    }

    constructor() {
        super();
        this.service = new PatotaService();
    }

    componentDidMount() {
        const params = this.props.match.params

        if (params.id) {
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true, idpatota: params.id})
                }).catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    submit = () => {
        
        const { nomepatota } = this.state;
        const patota = { nomepatota };

        try {
            this.service.validar(patota)
        } catch (erros) {
            const mensagens = erros.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(patota)
            .then(response => {
                this.props.history.push('/patota-jogadores')
                messages.mensagemSucesso('Patota cadastrada com sucesso! Agora informe quais jogadores farão parte dessa patota.')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
 
        
        const { nomepatota, idpatota } = this.state;
        const patota = { nomepatota, idpatota: parseInt(idpatota) };

        try {
            this.service.validar(patota)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .atualizar(patota)
            .then(response => {
                console.log('entrou')
                this.props.history.push('/consulta-patota')
                messages.mensagemSucesso('Patota atualizada com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    render() {

        return (
            <div className="col-md-5" style={{ position: 'relative', left: '400px' }}>
            <Card title={this.state.atualizando ? 'Atualização de Patota' : 'Cadastro de Patota'}>
                <div className="row" style={{ position: 'relative', left: '110px'}}>
                    <div className="col-md-7">
                        <FormGroup id="inputNomePatota" label="Nome da Patota: *">
                            <input id="inputNomePatota" type="text" placeholder="Digite o nome da patota..."
                                className="form-control"
                                name="nomepatota"
                                value={this.state.nomepatota}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                </div>
                <br />
                <div className="row" style={{ position: 'relative', left: '140px'}}>
                    <div>
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar}
                                    className="btn btn-primary">
                                    <i className="pi pi-refresh"></i> Atualizar</button>
                            ) : (
                                <button onClick={this.submit}
                                    className="btn btn-success"><i
                                        className="pi pi-save"></i> Salvar</button>
                            )

                        }
                        <button onClick={e => this.props.history.push('/consulta-patota')}
                            className="btn btn-danger"><i
                                className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </Card>
            </div>
        )
    }
}

export default withRouter(CadastroPatota)