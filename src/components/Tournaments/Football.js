import React, { Component } from 'react'
import MainLayout from '../../layouts/MainLayout'
import '../../css/football.css';
import fotoFootball from '../../images/fotos/fotofootball.jpg'
import axios from "axios";
import { Form, Divider, Button, Icon } from 'semantic-ui-react'
const campusfootball = [
    { key: 'm', text: 'Main Campus', value: 'mainft' },
    { key: 'e', text: 'East Campus', value: 'eastft' },
   

]
export default class Football extends Component {




    constructor(){
        super();
        this.state={
            football:[]
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8081/tournaments/football")
            .then(response => this.setState({
                football: response.data
            }))

    }

    render() {
        console.log(this.state.football);
        const {football} = this.state
        return (
            <div>
               <MainLayout/>
               <div className="mainFootball">
            <p style={{fontSize:"20px",fontWeight:"bold",paddingTop:"1%"}}>Football Tournament</p>
            
            <div className="fotoFootball">
            <img className='fotofootball' src={fotoFootball} />

            </div>
            
                
          
            
         <div className="footballcontentt">
        <div className="formfootball">
            <Form.Select fluid label=' Choose a Campus' placeholder='Choose a Campus' onChange={this.handleChange}
                        options={campusfootball} className="formfootballt" />
                        <div className="ftenrollbutton">
                         <Button primary size="20px" id="ftenroll" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button></div>
            </div>
            <table className="table13" borderWidth="0">
            
                    <tr>
                        <td><b>Tournament Name</b><br></br><hr class="solid" width="80%"></hr></td>
                        <td><b>Tournament Campus</b><br></br><hr class="solid" width="80%"></hr></td>
                        <td><b>Tournament Quota</b><br></br><hr class="solid" width="80%"></hr></td>
                        
                    </tr>
                    
                    <tr>
                        <td>{this.state.football.map((x)=>
                <p> {x.name} Tournament </p>
            )}</td>
                        <td>{this.state.football.map((x)=>
                <p>{x.campus} Campus</p>)}</td>
                        <td>{this.state.football.map((x)=>
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
