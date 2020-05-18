import React, { Component } from 'react'
import axios from "axios";
import MainLayout from '../../layouts/MainLayout'
import '../../css/basketball.css';
import fotoBasketball from '../../images/fotos/fotobasketball.jpg'
import { Form, Divider, Button, Icon } from 'semantic-ui-react'


const campusbasketball = [
    { key: 'm', text: 'Main Campus', value: 'mainbt' },
    { key: 'e', text: 'East Campus', value: 'eastbt' },
   

]

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
         <div className="basketballcontentt">
         <div className="formbasketball">
            <Form.Select fluid label=' Choose a Campus' placeholder='Choose a Campus' onChange={this.handleChange}
                        options={campusbasketball} className="formbasketballt" />
                        <div className="btenrollbutton">
                         <Button primary size="20px" id="ftenroll" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button></div>
            </div>
        <table className="table14" borderWidth="0">
        
                <tr>
                    <td><b>Tournament Name</b><br></br><hr class="solid" width="80%"></hr></td>
                    <td><b>Tournament Campus</b><br></br><hr class="solid" width="80%"></hr></td>
                    <td><b>Tournament Quota</b><br></br><hr class="solid" width="80%"></hr></td>
                    
                </tr>
                
                <tr>
                    <td>{this.state.basketball.map((x)=>
            <p> {x.name} Tournament </p>
        )}</td>
                    <td>{this.state.basketball.map((x)=>
            <p>{x.campus} Campus</p>)}</td>
                    <td>{this.state.basketball.map((x)=>
            <p> {x.teamquota} </p>

            )}  </td>
            
                </tr>
            
               
           
            </table>  
            </div>

            </div>
         </div>
        )
    }
}
