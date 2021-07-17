import React from 'react'

export default props => {

    const rows = props.patotas.map(patota => {


        return (
            <tr>
                <td>{patota[0]}</td>
                <td>{patota[1]}</td>
                <td>{patota[2]}</td>
                <td>{patota[3]}</td>
                <td>{patota[4]}</td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID Patota</th>
                    <th scope="col">Patota</th>
                    <th scope="col">ID Jogador</th>
                    <th scope="col">Nome Jogador</th>
                    <th scope="col">Última Nota</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}