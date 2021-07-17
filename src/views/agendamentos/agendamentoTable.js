import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.agendamentos.map(agendamento => {
        return (
            <tr key={agendamento.id}>
                <td>{agendamento.idagendamento}</td>
                <td>{agendamento.dataagendamento}</td>
                <td>{currencyFormatter.format(agendamento.valor, { locale: 'pt-BR' })}</td>

                <td>
                    <button type="button"
                        className="btn btn-primary" title="Editar"
                        onClick={e => props.editAction(agendamento.idagendamento)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"
                        className="btn btn-danger" title="Excluir"
                        onClick={e => props.deleteAction(agendamento)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Data</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}