import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';
import { CascadeSelect } from 'primereact/cascadeselect';

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import AgendamentoService from '../../app/service/agendamentoservice'
import LocalStorageService from '../../app/service/localstorageService'
import { CascadeSelectDemo } from '../../components/cascadeselectdemo';

class CadastroAgendamento extends React.Component {

    state = {
        id: null,
        dataagendamento: '',
        valor: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new AgendamentoService();
        this.comp = new CascadeSelectDemo();

    }

    componentDidMount() {
        const params = this.props.match.params

        if (params.id) {
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true, id: params.id })
                }).catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { dataagendamento, valor } = this.state;
        const agendamento = { dataagendamento, valor: parseInt(valor.cnome), usuario: usuarioLogado.id };

        try {
            this.service.validar(agendamento)
        } catch (erros) {
            const mensagens = erros.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }
        this.service
            .salvar(agendamento, agendamento.valor, agendamento.usuario)
            .then(response => {
                this.props.history.push(`/detalhes-agendamento/`);
                messages.mensagemSucesso('Agendamento cadastrado com sucesso!')
            }).catch(error => {
                this.props.history.push(`/detalhes-agendamento/`);
                messages.mensagemSucesso('Agendamento cadastrado com sucesso!')
            })
    }

    atualizar = () => {
        const { dataagendamento, valor, usuario, id } = this.state;
        const agendamento = { dataagendamento, valor, usuario, id: parseInt(id) };

        try {
            this.service.validar(agendamento)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .atualizar(agendamento)
            .then(response => {
                console.log('entrou')
                this.props.history.push('/consulta-agendamentos')
                messages.mensagemSucesso('Agendamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    handleDate = (e) => {
        const formatDate = new Date(e.value)
        const finalFormatDate = formatDate.getDate() + '-' + formatDate.getMonth().toString().padStart(2, 0) + '-' + formatDate.getFullYear() + ' ' + 
            formatDate.getHours() + ':' + formatDate.getMinutes().toString().padStart(2, 0) + ':' + formatDate.getSeconds().toString().padStart(2, 0)
        this.setState({ dataagendamento: finalFormatDate })
    }

    render() {

        return (
            <div className="col-md-5" style={{ position: 'relative', left: '400px' }}>
                <br /><br /><br />
                <Card title={this.state.atualizando ? 'Atualização de Agendamento' : 'Cadastro de Agendamento'}>
                    <div className="row" style={{ position: 'relative', left: '140px' }}>
                        <div className="col-md-5" >
                            <label htmlFor="time24">Data do Agendamento: </label>
                            <br />
                            <Calendar id="time24" placeholder="Informe a data..." value={this.state.dataagendamento} onChange={(e) => this.handleDate(e)} showTime showSeconds />
                        </div>
                    </div>
                    <div className="row">
                    </div>
                    <br />
                    <div className="row" style={{ position: 'relative', left: '140px' }}>
                        <div className="col-md-5">
                            <label htmlFor="inputValor">Valor do Agendamento: </label>
                            <CascadeSelect id="inputValor" placeholder={"Selecione o valor"} value={this.state.valor} options={this.comp.countries}
                                optionLabel={"cnome"} optionGroupLabel={"name"} optionGroupChildren={['states', 'cities']}
                                style={{ minWidth: '12rem' }} onChange={(e) => this.setState({ valor: e.value })} />
                        </div>
                    </div>
                    <br />
                    <div className="row" style={{ position: 'relative', left: '140px' }}>
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
                            <button onClick={e => this.props.history.push('/consulta-agendamento')}
                                className="btn btn-danger"><i
                                    className="pi pi-times"></i> Cancelar</button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(CadastroAgendamento)
