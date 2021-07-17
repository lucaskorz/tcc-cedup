import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.patotasAssociadas.map(patota => {
        return (
            <tr key={patota.idpatota}>
                <td>{patota.nomepatota}
                </td>
                <td>
                    <button className="btn btn-success" title="Associar"
                        onClick={e => props.confirmarDados(patota.idpatota)}
                        disabled={patota.clicked}
                        type="button">
                        <i className="pi pi-check"> Confirmar</i>
                    </button>
                    <button className="btn btn-danger" title="Associar"
                        onClick={e => props.desassociar(patota)}
                        disabled={patota.clicked}
                        type="button">
                        <i className="pi pi-arrow-right"> Voltar</i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col-md-9">Nome</th>
                    <th scope="col-md-1">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}