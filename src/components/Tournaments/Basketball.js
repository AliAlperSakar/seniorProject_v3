import React, { Component } from 'react'
import axios from "axios";
import MainLayout from '../../layouts/MainLayout'
import '../../css/basketball.css';
import fotoBasketball from '../../images/fotos/fotobasketball.jpg'


export default class Basketball extends Component {
    
    constructor(){
        super();
        this.state={
            basketball:[]
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8081/tournaments/basketball")
            .then(response => this.setState({
                basketball: response.data
            }))

    }

    render() {
        console.log(this.state.basketball);
        const {basketball} = this.state
        return (
            <div>
            <MainLayout/>
            <div className="mainBasketball">
         <p style={{fontSize:"20px",fontWeight:"bold",paddingTop:"1%"}}>Basketball Tournament</p>
         
         <div className="fotoBasketball">
         <img className='fotoBasketball' src={fotoBasketball} />

         </div>
         <div className="contentBasketball">
            {this.state.basketball.map((x)=>
                <p> {x.id} {x.name} {x.campus} {x.teamquota} </p>
            )}
         
         
         </div>

            </div>
         </div>
        )
    }
}
