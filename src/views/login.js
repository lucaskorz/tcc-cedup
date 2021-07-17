import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import { mensagemAlert, mensagemErro, mensagemSucesso } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

import LocalStorageService from '../app/service/localstorageService'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            mensagemSucesso("Você está logado no Joga Bem®!")
                this.props.history.push('/homeJogador')
        }).catch(erro => {
            if (this.state.email !== '' && this.state.senha === '') {
                mensagemAlert('Você precisa preencher todos os campos!')
                return false;
            }
            if (this.state.email === '' && this.state.senha === '') {
                mensagemAlert('Você precisa preencher seu e-mail e senha para logar.')
                return false;
            }
            if (this.state.email === '' && this.state.senha !== '') {
                mensagemAlert('Você precisa preencher todos os campos!')
                return false;
            } else {
                mensagemErro(erro.response.data)
                return false;
            }
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (
            <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassworld1">
                                            <input type="password"
                                                value={this.state.senha}
                                                onChange={e => this.setState({ senha: e.target.value })}
                                                class="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                        </FormGroup>
                                        <br />
                                        <button onClick={this.entrar}
                                            className="btn btn-success">
                                            <i className="pi pi-sign-in"></i> Entrar</button>
                                        <button onClick={this.prepareCadastrar}
                                            className="btn btn-danger">
                                            <i className="pi pi-times"></i> Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        )
    }
}

Login.contextType = AuthContext

export default withRouter(Login)