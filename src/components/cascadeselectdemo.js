import React, { Component } from 'react';



export class CascadeSelectDemo extends Component {

    constructor(props) {
        super(props);

        this.countries = [
            {
                name: 'Com Churrasco',
                states: [
                    {
                        name: '1 hora',
                        cities: [
                            {cnome: 120}
                                
                        ]
                    },
                    
                    {
                        name: '2 horas',
                        cities: [
                            {cnome: 200}
                        ]
                    },

                ]
            },
            {
                name: 'Sem Churrasco',
                states: [
                    {
                        name: '1 hora',
                        cities: [
                            {cnome: 80}
                        ]
                    },
                    {
                        name: '2 horas',
                        cities: [
                            {cnome: 170}
                        ]
                    },
                    
                ]
                
            }
            
        ];
        parseFloat(this.cname);
    }
}