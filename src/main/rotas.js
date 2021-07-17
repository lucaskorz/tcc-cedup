import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import Home2 from '../views/home2'
import CadastroUsuario from '../views/cadastroUsuario'
import CadastroUsuario2 from '../views/cadastroUsuario2'
import Configuracoes from '../views/configuracoes'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import { AuthConsumer } from '../main/provedorAutenticacao'
import DetalhesAgendamento from '../views/agendamentos/detalhesagendamento'
import DetalhesJogadores from '../views/patotas/detalhesjogadores'
import CadastroAgendamento from '../views/agendamentos/cadastroagendamento'
import CadastroPatota from '../views/patotas/cadastropatota'
import consultapatota from '../views/patotas/consultapatota'
import AtribuicaoNota from '../views/notas-jogadores/atribuicaoNota'
import ConsultaNotas from '../views/notas-jogadores/consultanotas'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import detalhesjogadores from '../views/patotas/detalhesjogadores'
import consultaagendamento from '../views/agendamentos/consultaagendamento'

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
                
            } 
            else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/cadastro-usuarios2" component={CadastroUsuario2} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/homeJogador" component={Home2} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/detalhes-agendamento/:id?" component={DetalhesAgendamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-agendamentos" component={CadastroAgendamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-patota/:id?" component={CadastroPatota} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-patota" component={consultapatota} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-agendamento" component={consultaagendamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/patota-jogadores" component={DetalhesJogadores} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/minha-conta" component={Configuracoes} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/notas" component={AtribuicaoNota} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-notas" component={ConsultaNotas} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
)