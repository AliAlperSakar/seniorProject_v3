import React, { Component } from 'react'
import axios from "axios";
import MainLayout from '../../layouts/MainLayout'
import '../../css/volleyball.css';
import fotoVolleyball from '../../images/fotos/fotovolleyball.jpg'
import { Form, Divider, Button, Icon } from 'semantic-ui-react'


const campusvolleyball = [
    { key: 'm', text: 'Main Campus', value: 'mainvt' },
    { key: 'e', text: 'East Campus', value: 'eastvt' },
   

]


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
                    <div className="volleyballcontentt">
                    <div className="formvolleyball">
            <Form.Select fluid label=' Choose a Campus' placeholder='Choose a Campus' onChange={this.handleChange}
                        options={campusvolleyball} className="formvolleyballt" />
                        <div className="vtenrollbutton">
                         <Button primary size="20px" id="ftenroll" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button></div>
            </div>
        
        <table className="table15" borderWidth="0">
        
                <tr>
                    <td><b>Tournament Name</b><br></br><hr class="solid" width="80%"></hr></td>
                    <td><b>Tournament Campus</b><br></br><hr class="solid" width="80%"></hr></td>
                    <td><b>Tournament Quota</b><br></br><hr class="solid" width="80%"></hr></td>
                    
                </tr>
                
                <tr>
                    <td>{this.state.volleyball.map((x)=>
            <p> {x.name} Tournament </p>
        )}</td>
                    <td>{this.state.volleyball.map((x)=>
            <p>{x.campus} Campus</p>)}</td>
                    <td>{this.state.volleyball.map((x)=>
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
