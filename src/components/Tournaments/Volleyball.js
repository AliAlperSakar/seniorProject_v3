import React, { Component } from 'react'
import axios from "axios";
import MainLayout from '../../layouts/MainLayout'
import '../../css/volleyball.css';
import fotoVolleyball from '../../images/fotos/fotovolleyball.jpg'

export default class Volleyball extends Component {
    constructor() {
        super();
        this.state = {
            volleyball: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8081/tournaments/volleyball")
            .then(response => this.setState({
                volleyball: response.data
            }))

    }
    render() {
        console.log(this.state.volleyball);
        const {volleyball} = this.state
        return (
            <div>
                <MainLayout />
                <div className="mainVolleyball">
                    <p style={{ fontSize: "20px", fontWeight: "bold", paddingTop: "1%" }}>Volleyball Tournament</p>

                    <div className="fotoVolleyball">
                        <img className='fotoVolleyball' src={fotoVolleyball} />

                    </div>
                    <div className="contentVolleyball">
                        {this.state.volleyball.map((x) =>
                            <p> {x.id} {x.name} {x.campus} {x.teamquota} </p>
                        )}
                    </div>

                </div>
            </div>
        )
    }
}
