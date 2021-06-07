import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'

class Home extends React.Component {


    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    deletar = (id) => {
        this.usuarioService.deletar(id).then(response => {
            LocalStorageService.obterItem('_usuario_logado', response.data)
            mensagemSucesso("Usuário excluído com sucesso!")
            this.props.history.push('/')
        }).catch(erro => {
            mensagemErro('Sinto muito! Não é possível excluir esse usuário pois ele já está vinculado a outras tarefas dentro do sistema.')
        })
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(error => {
                console.error(error.response)
            });
    }

    render() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        return (
            <div className="jumbotron">
                <h5 className="display-4">Painel de Controle - Usuário</h5>
                <p className="lead"></p>
                <p className="lead">Aqui você pode gerenciar sua conta dentro do Joga Bem como preferir!</p>
                <hr className="my-4" />
                <p>Vamos lá, o que deseja fazer?</p>
                <br></br>
                <button onClick={() => this.deletar(usuarioLogado.id)} className="btn btn-danger btn-lg"><i className="pi pi-trash"></i> Excluir Usuário</button>

            </div>
        )
    }
}

export default Home