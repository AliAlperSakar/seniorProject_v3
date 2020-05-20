import React, { Component } from 'react'
import axios from "axios";
import MainLayout from '../../layouts/MainLayout'
import '../../css/volleyball.css';
import fotoVolleyball from '../../images/fotos/fotovolleyball.jpg'
import { Form, Divider, Button, Icon } from 'semantic-ui-react'


const campusvolleyball = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' }
]


export default class Volleyball extends Component {
    constructor() {
        super();
        this.state = {
            tournaments: [],
            selectedCampus: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8082/tournaments")
            .then(response =>
                this.setState({
                    tournaments: response.data
                }))

    }

    filter = () => {
        const { tournaments } = this.state;
        let arr = []
        tournaments.map((x) => {
            if (x.name == 'Volleyball') {
                arr.push(x);
                console.log(x);
            }
        })
        return arr
    }

    handleChange = (e, data) => {
        console.log(data.value);
        const { tournaments, selectedCampus } = this.state;
        let arr = [];
        tournaments.map((x) => {
            if (x.name == 'Volleyball' && x.campus.toLowerCase() == data.value) {
                arr.push(x);
            }
        })
        this.setState({
            selectedCampus: arr
        })
    }

    render() {
        const { tournaments, selectedCampus } = this.state;
        let arr = this.filter();
        console.log(this.state);
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
                
                {selectedCampus.length == 0 ? arr.map((x)=>
                                <tr>
                                    <td><p> {x.name} Tournament </p></td>
                                    <td><p> {x.campus} Campus </p></td>
                                    <td><p> {x.teamquota}</p></td>
                                </tr>

                                ) : selectedCampus.map((x)=>
                                <tr>
                                    <td><p> {x.name} Tournament </p></td>
                                    <td><p> {x.campus} Campus </p></td>
                                    <td><p> {x.teamquota}</p></td>
                                </tr>

                                )
                                }
            
               
           
            </table>  
            </div>

                </div>
            </div>
        )
    }
}
