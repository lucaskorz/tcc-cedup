import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.jogadoresAssociados.map(jogador => {
        return (
            <tr key={jogador.id}>
                <td>{jogador.nome}</td>
                <td>
                    <button className="btn btn-success" title="Confirmar"
                        onClick={e => props.confirmarDados(jogador.id)}
                        disabled={jogador.clicked}
                        type="button">
                        <i className="pi pi-check"> Confirmar</i>
                    </button>
                    <button className="btn btn-danger" title="Voltar"
                        onClick={e => props.desassociar(jogador)}
                        disabled={jogador.clicked}
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
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}