import React, { Component } from 'react'
import axios from "axios";
import MainLayout from '../../layouts/MainLayout'
import '../../css/racketsports.css';
import fotoRacketSports from '../../images/fotos/fotoracketsports.jpg'
import { Form, Divider, Button, Icon } from 'semantic-ui-react'


const initialState = {
    selectedCampus:[],
    selectedSport:[]
};

const sportoptions = [
    { key: 't', text: 'Tennis', value: 'tennis' },
    { key: 'b', text: 'Badminton', value: 'badminton' },
    { key: 'r', text: 'Table Tennis', value: 'tabletennis' }

]

const campusracket = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' }
]


export default class RacketSports extends Component {
    constructor(){
        super();
        this.state = {
            tournaments:[],
            sport:'',
            initialState:initialState
        }
        this.handleChange = this.handleChange.bind(this);
        this.secondHandleChange = this.secondHandleChange.bind(this);

    }

    reset() {
        this.setState({initialStat:initialState});
    }

    
    componentDidMount() {
        axios.get("http://localhost:8082/tournaments")
            .then(response => this.setState({
                tournaments: response.data
            }))
    }


    

    handleChange = (e, data) => {
        console.log(data.value);
        const { tournaments, initialState} = this.state;
        let arr = [];
        tournaments.map((x)=>{
            if(x.name.toLowerCase() == data.value){
                arr.push(x)
            }
        })
        this.setState({
            initialState:{selectedSport:arr},
            sport: data.value
        })
        
    }

    
    secondHandleChange = (e, data) => {
        console.log(data.value);
        const { tournaments, sport, initialState } = this.state;
        const { selectedSport, selectedCampus} = initialState
        let arr = [];
        selectedSport.map((x) => {
            if (x.campus.toLowerCase() == data.value && x.name.toLowerCase() == sport) {
                arr.push(x);
                console.log(x);
            }
        })
        this.setState({
            selectedCampus:arr
        })

    }

    // filter = () => {
    //     let arr = [];
    //     const { tournaments } = this.state;
    //     tournaments.map((x) => {
    //         if (x.name == 'Football') {
    //             arr.push(x);
    //             console.log(x);
    //         }
    //     })
    //     return arr
    // }

    render() {
        const { tournaments, initialState } = this.state;
        const { selectedCampus, selectedSport } = initialState;
        let arr = []
        // this.filter();    
        console.log(this.state);
        return (
            <div>
            <MainLayout/>
            <div className="mainRacketSports">
         <p style={{fontSize:"20px",fontWeight:"bold",paddingTop:"1%"}}>Racket Sports Tournament</p>
         
         <div className="fotoRacketSports">
         <img className='fotoRacketSports' src={fotoRacketSports} />

         </div>

         
         <div className="contentRacketSports">
                        <div className="formracket">
                        
                            <div><Form.Select fluid label=' Choose a Sport' placeholder='Choose a Sport' onChange={this.handleChange}
                                options={sportoptions} className="formrackett" /></div>
                                <div><Form.Select fluid label=' Choose a Campus' placeholder='Choose a Campus' onChange={this.secondHandleChange}
                                options={campusracket} className="formracket1" /></div>
                            <div className="btenrollbutton">
                                <Button primary size="20px" id="ftenroll" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button></div>
                        </div>
                        <table className="table20" borderWidth="0">

                            <tr>
                                <td><b>Tournament Name</b><br></br><hr class="solid" width="80%"></hr></td>
                                <td><b>Tournament Campus</b><br></br><hr class="solid" width="80%"></hr></td>
                                <td><b>Tournament Quota</b><br></br><hr class="solid" width="80%"></hr></td>

                            </tr>
            
                            
                                {selectedSport.length == 0 ? tournaments.map((x)=>
                                <tr>
                                    <td><p> {x.name} Tournament </p></td>
                                    <td><p> {x.campus} Campus </p></td>
                                    <td><p> {x.teamquota}</p></td>
                                </tr>

                                ) : selectedSport.map((x)=>
                                <tr>
                                    <td><p> {x.name} Tournament </p></td>
                                    <td><p> {x.campus} Campus </p></td>
                                    <td><p> {x.teamquota}</p></td>
                                </tr>

                                )
                                }

                                {/* <td>{arr.map((x) =>
                                    <p> {x.name} Tournament </p>
                                )}</td>
                                <td>{arr.map((x) =>
                                    <p>{x.campus} Campus</p>)}</td>
                                <td>{arr.map((x) =>
                                    <p> {x.teamquota} </p>

                                )}  </td> */}




                        </table>
                    </div>

            </div>
         </div>
        )
    }
}
