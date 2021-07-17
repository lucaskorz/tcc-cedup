import React from 'react'

export default props => {

    const rows = props.jogadoresAAssociar.map(jogador => {

        return (
            <tr key={jogador.id}>
                <td>{jogador.nome}</td>
                <td>
                    <button className="btn btn-success" title="Associar"
                        onClick={e => props.handleAssociar(jogador)}
                        type="button">
                        <i className="pi pi-arrow-left">Associar</i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}