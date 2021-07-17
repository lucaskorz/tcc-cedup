import React from 'react'

import NavbarItem from './navbarItem'
import { AuthConsumer } from '../main/provedorAutenticacao'

function Navbar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/homeJogador" className="navbar-brand">Joga Bem ®</a>
                <button className="navbar-toggler" type="button" 
                        data-toggle="collapse" data-target="#navbarResponsive" 
                        aria-controls="navbarResponsive" aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/homeJogador" label="Home" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-agendamento" label="Agendamentos" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-patota" label="Patotas" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/notas" label="Notas" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/minha-conta" label="Minha Conta" />
                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)