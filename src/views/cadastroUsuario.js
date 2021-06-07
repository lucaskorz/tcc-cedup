import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import LocalStorageService from '../app/service/localstorageService'
import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }


        try {
            this.service.validar(usuario);

        } catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }
        if (this.service.validarSenha(usuario) === true) {
            this.service.salvar(usuario)
                .then(response => {
                    LocalStorageService.adicionarItem('_usuario_logado', response.data)
                    mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')

                    this.props.history.push('/login')

                }).catch(error => {

                    mensagemErro(error.response.data)
                })
        } else {
            mensagemErro("A senha precisa ter pelo menos 6 caracteres, sendo eles 1 número e 1 caractere especial.");
        }
    }

    prepareCancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" placeholder="Digite seu nome aqui..."
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <br />
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" placeholder="Digite seu e-mail..."
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <br />
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" placeholder="Escolha uma senha de 6 dígitos (com 1 nº e 1 caractere especial ($#%@)..."
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <br />
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" placeholder="Informe a senha novamente..."
                                    id="inputRepitaSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <br />
                            <button onClick={this.cadastrar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar</button>
                            <button onClick={this.prepareCancelar}
                                type="button"
                                className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)