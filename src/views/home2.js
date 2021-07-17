import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'
import Card from '../components/card'

class Home extends React.Component {


    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado

        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(error => {
                console.error(error.response)
            });
    }

    render() {
        return (
            <Card>
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo Peladeiro!</h1>
                    <p className="lead">Aqui você poderá controlar seu(s) time(s) e agendamentos.</p>
                    <hr className="my-4" />
                    <p>Utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg"
                            href="#/cadastro-usuarios2"
                            role="button"><i className="pi pi-users"></i>  Cadastrar Jogador</a>
                        <a className="btn btn-danger btn-lg"
                            href="#/cadastro-agendamentos"
                            role="button"><i className="pi pi-pencil"></i>  Cadastrar Agendamento</a>
                        <a className="btn btn-danger btn-lg"
                            href="#/cadastro-patota"
                            role="button"><i className="pi pi-pencil"></i>  Cadastrar Patota</a>
                        <a className="btn btn-danger btn-lg"
                            href="#/consulta-notas"
                            role="button"><i className="pi pi-search-plus"></i>  Consultar Notas</a>
                    </p>
                </div>
            </Card>
        )
    }
}

Home.contextType = AuthContext;

export default Home