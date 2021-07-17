import React from 'react'

export default props => {

    const rows = props.jogadores.map(jogador => {

        let valorNotas = '';
        function handleNotas(e) {
            valorNotas = e.target.value
        }

        return (
            <tr>
                <td>{jogador[0]}</td>
                <td>{jogador[1]}</td>
                <td>{jogador[2]}</td>
                <td>{jogador[3]}</td>
                <td>{jogador[4]}</td>
                <td>
                    <input type="text"
                        id="nota"
                        onChange={(e) => handleNotas(e)} />
                </td>
                <td>
                    <button className="btn btn-success" title="Confirmar"

                        onClick={e => props.confirmarDados(valorNotas, jogador[3], jogador[1])}
                        type="button">
                        <i className="pi pi-check"> Confirmar</i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID Agendamento</th>
                    <th scope="col">ID Patota</th>
                    <th scope="col">Patota</th>
                    <th scope="col">ID Jogador</th>
                    <th scope="col">Nome Jogador</th>
                    <th scope="col">Nota</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}