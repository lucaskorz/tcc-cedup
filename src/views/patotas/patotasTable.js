import React from 'react'

export default props => {

    const rows = props.patotas.map(patota => {
        return (
            <tr key={patota.idPatota}>
                <td>{patota.nomepatota}</td>
                <td>
                    <button type="button"
                        className="btn btn-primary" title="Editar"
                        onClick={e => props.editAction(patota.idpatota)}>
                        <i className="pi pi-pencil"> Editar</i>
                    </button>
                    <button type="button"
                        className="btn btn-danger" title="Excluir"
                        onClick={e => props.deleteAction(patota)}>
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
                    <th scope="col">Nome Patota</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}