import React, { Component } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form, Divider, Button, Icon, Select } from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
import FileUpload from '../FileUpload';
import '../../css/admin/manageAppointment.css'
import axios from "axios";
import { Link } from "react-router-dom";
import deneme from '../../images/fotos/course.jpg';


const sportoptions = [
    { key: 'b', text: 'Basketball', value: 'basketball' },
    { key: 'f', text: 'Football', value: 'football' },
    { key: 'v', text: 'Volleyball', value: 'volleyball' },
    { key: 'r', text: 'Racket Sports', value: 'racket' },

]

const campusoption = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' },
]

const traineroptions= [
    { key: 'a', text: 'Ahmet Sezer', value: 'Ahmet Sezer' },
    { key: 'b', text: 'Mehmet Sezmez', value: 'Mehmet Sezmez' },
    { key: 'c', text: 'Ceyda Kaya', value: 'Ceyda Kaya' },
    { key: 'd', text: 'Deniz Alan', value: 'Deniz Alan' },
    { key: 'e', text: 'Elif Emre', value: 'Elif Emre' },
    { key: 'f', text: 'Fırat Sezer', value: 'Fırat Sezer' },
    { key: 'g', text: 'Gaye Taylan', value: 'Gaye Taylan' },
    { key: 'h', text: 'Hakkı Sezer', value: 'Hakkı Sezer' },


]
const placeoption = [
    { key: 'm', text: 'Main Sports Hall', value: 'Main Sports Hall' },
    { key: 'e', text: 'East Sports Hall', value: 'East Sports Hall' },
]
const timeoption = [
    { key: '1', text: '10:30 / 12:30', value: '10:30 / 12:30' },
    { key: '2', text: '12:30 / 14:30', value: '12:30 / 14:30' },
    { key: '3', text: '14:30 / 16:30', value: '14:30 / 16:30' },
    { key: '4', text: '16:30 / 18:30', value: '16:30 / 18:30' },
    { key: '5', text: '18:30 / 20:30', value: '18:30 / 20:30' },
    { key: '6', text: '20:30 / 22:30', value: '20:30 / 22:30' },
    
]

export default class manageAppointment extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            place: '',
            time: '',
            add: false,
            edit: true,
            delete: false,
            appointments: [],
            takenAppointments: [],
            appointment: "",
            deleted: ""

        }
        this.btnClicked = this.btnClicked.bind();
        this.getIndex = this.getIndex.bind();
    }

    componentDidMount() {
        axios.get("http://localhost:8082/appointments")
            .then(response => this.setState({
                appointments: response.data
            }))
            axios.get("http://localhost:8082/makeAppointment")
            .then(response => this.setState({
                takenAppointments: response.data
            }))
        console.log("Re-rendered");

    }


    // componentDidUpdate(){
    //     axios.get("http://localhost:8081/appointments")
    //     .then(response => this.setState({
    //         appointments: response.data
        
    //     }))
    // }


    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleName = (event, { name, value }) => {
        console.log(event);
        this.setState({ name: value });
    }

    handlePlace = (event, { name, value }) => {
        console.log(event);
        this.setState({ place: value });
    }

    handleTime = (event, { name, value }) => {
        console.log(event);
        this.setState({ time: value });
    }


    btnClicked = (e) => {
        if (e.target.id == "add") {
            this.setState({ add: true, edit: false, delete: false })
        } else if (e.target.id == "edit") {
            this.setState({ add: false, edit: true, delete: false })
        } else {
            this.setState({ add: false, edit: false, delete: true })
        }
    }


    deleteAppointment = (x) => {
        console.log(x);
        axios.delete("http://localhost:8082/appointments",{ data: { id: x.id } }).then(resolve(10)).catch(reject(-1));
          
    }

    getIndex = (e) => {
        console.log(e.target.id)
        if (this.state.add) {
            //ADD
        } else if (this.state.edit) {
            //EDIT
            axios.get("http://localhost:8082/announcements/" + e.target.id)
                .then(response => this.setState({
                    announcement: response.data
                }))
        } else if (this.state.delete) {
            //DELETE
            console.log("DELETE")
            axios.delete("http://localhost:8082/announcements/" + e.target.id)
                .then(response => {
                    console.log(response.data);
                })
        }
        const { match } = this.props
        var str = match.url.split('/');
        var index = parseInt(str[3]);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    }

    addAppointment = () => {
        axios.post("http://localhost:8082/appointments", {
            name: this.state.name,
            place: this.state.place,
            time: this.state.time
        })
        .then(response => {
            console.log(response);            
        });       
    }




    render() {
        const add = this.state;
        // this.componentRendered()
        const href = '/appointments/manage/';
        const { appointments } = this.state;
        const { takenAppointments } = this.state;
        const { match } = this.props
        console.log(this.state);
        return (
            <div>
                <MainLayout />
                <div style={{ marginTop: "100px", marginRight: "5%", marginLeft: "5%", backgroundColor: "white", padding: "5%", borderRadius: "20px", position: "absolute", width: "90%", justifyContent: "center" }}>
                    <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Manage Appointment</h2></header>
                    <Divider />
                    <div className="contentmanapp1">
                        <div className="manappfields">
                            <div className="manappselector1">
                                <Form.Select fluid label='Trainer' value={this.state.name} placeholder='Choose an Trainer' onChange={this.handleName}
                                    options={traineroptions} className="formmanapp" />
                            </div>
                            
                            <div className="manappselector3">
                                <Form.Select fluid label='Place' value={this.state.place} placeholder='Choose a Place' onChange={this.handlePlace}
                                    options={placeoption} className="formmanrescampus" />
                            </div>
                            <div className="manappselector4">
                            <Form.Select fluid label='Time Slot' value={this.state.time} placeholder='Choose a TimeSlot' onChange={this.handleTime}
                                    options={timeoption} className="formmanrescampus" />
                            </div>

                        </div>

                        <div className="manappbuttons">
                            <Button primary size="medium" id="add" onClick={this.addAppointment}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                            
                        </div>
                    </div>
                    <div className="contentmanapp12">
                    <div className="contentmanapp">
                        <table className="table17" borderWidth="0">
                        {appointments.map((x, index) =>
									{
										
										return (
                                            <tr>
                                <td>{x.name} <br></br> {x.time} <br></br>{x.place}</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={() => this.deleteAppointment(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
											
										)}									
								)
								}        
                            
                            <tr>
                                <td></td>
                            </tr>





                        </table>

                    </div>
                    </div>
                    <header style={{ marginBottom: "100px",marginTop:"50px"}}><h2 style={{ float: "left" }}>Appointments</h2></header>
                    <Divider />
                    <div className="contentmanapp">
                        <table className="table17" borderWidth="0">

                        {takenAppointments.map((x2, index) =>
									{
										
										return (
                                            <tr>
                                <td>{x2.bilkentId} <br></br>{x2.name}<br></br>{x2.time} <br></br>{x2.place}</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.deleteAppointment}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>

                            </tr>
											
										)}									
								)
								}        


                            
                            {/* <tr>
                            <td>Id:1<br></br> Name : Berkay <br></br>Surname : Kara <br></br>TimeSlot : 15:30 / 16:30 <br></br>Instructor : Ahmet Sezer</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br> Name : Berkay <br></br>Surname : Kara <br></br>TimeSlot : 15:30 / 16:30 <br></br>Instructor : Ahmet Sezer</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr> */}
                            <tr>
                                <td></td>
                            </tr>





                        </table>

                    </div>
                

                </div>


            </div>
        )
    }
}

