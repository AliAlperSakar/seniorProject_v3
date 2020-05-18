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
    { key: 'a', text: 'Ahmet Sezer', value: 'ahmet' },
    { key: 'b', text: 'Mehmet Sezmez', value: 'mehmet' },
]
const placeoption = [
    { key: 'm', text: 'Main Sports Hall', value: 'mainsh' },
    { key: 'e', text: 'East Sports Hall', value: 'eastsh' },
]
const timeoption = [
    { key: '1', text: '15:30 / 16:30', value: '115' },
    { key: '2', text: '16:40 / 17:30', value: '116' },
]

export default class manageAppointment extends Component {
    constructor() {
        super()
        this.state = {
            date: '',
            title: '',
            content: '',
            startdate: '',
            enddate: '',
            regdate: '',
            add: false,
            edit: true,
            delete: false,
            announcements: [],
            announcement: "",
            deleted: ""

        }
        this.btnClicked = this.btnClicked.bind();
        this.getIndex = this.getIndex.bind();
    }

    componentDidMount() {
        axios.get("http://localhost:8081/announcements")
            .then(response => this.setState({
                announcements: response.data
            }))
        console.log("Re-rendered");

    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
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

    getIndex = (e) => {
        console.log(e.target.id)
        if (this.state.add) {
            //ADD
        } else if (this.state.edit) {
            //EDIT
            axios.get("http://localhost:8081/announcements/" + e.target.id)
                .then(response => this.setState({
                    announcement: response.data
                }))
        } else if (this.state.delete) {
            //DELETE
            console.log("DELETE")
            axios.delete("http://localhost:8081/announcements/" + e.target.id)
                .then(response => {
                    console.log(response.data);
                })
        }
        const { match } = this.props
        var str = match.url.split('/');
        var index = parseInt(str[3]);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    }

    render() {
        const add = this.state;
        // this.componentRendered()
        const href = '/announcement/manage/';
        const { announcements } = this.state;
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
                                <Form.Select fluid label='Trainer' placeholder='Choose an Trainer' onChange={this.handleChange}
                                    options={traineroptions} className="formmanapp" />
                            </div>
                            
                            <div className="manappselector3">
                                <Form.Select fluid label='Campus' placeholder='Choose a Place' onChange={this.handleChange}
                                    options={placeoption} className="formmanrescampus" />
                            </div>
                            <div className="manappselector4">
                            <Form.Select fluid label='Time Slot' placeholder='Choose a TimeSlot' onChange={this.handleChange}
                                    options={timeoption} className="formmanrescampus" />
                            </div>

                        </div>

                        <div className="manappbuttons">
                            <Button primary size="medium" id="add" value={this.state.add} onClick={this.btnClicked}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                            
                        </div>
                    </div>
                    <div className="contentmanapp12">
                    <div className="contentmanapp">
                        <table className="table17" borderWidth="0">

                            <tr>
                                <td>Id:1<br></br> Trainer Name : Ahmet <br></br>Surname : Sezer <br></br> TimeSlot : 15:30 / 16:30 <br></br>Place :  Main Sports Hall</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Id:2<br></br> Trainer Name : Mehmet <br></br>Surname : Sezmez <br></br> TimeSlot : 15:30 / 16:30 <br></br>Place :  East Sports Hall</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br> Trainer Name : Ahmet <br></br>Surname : Sezer <br></br> TimeSlot : 15:30 / 16:30 <br></br>Place :  Main Sports Hall</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            
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

                            <tr>
                                <td>Id:1<br></br> Name : Berkay <br></br>Surname : Kara <br></br>TimeSlot : 15:30 / 16:30 <br></br>Instructor : Ahmet Sezer</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br> Name : Berkay <br></br>Surname : Kara <br></br>TimeSlot : 15:30 / 16:30 <br></br>Instructor : Ahmet Sezer</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br> Name : Berkay <br></br>Surname : Kara <br></br>TimeSlot : 15:30 / 16:30 <br></br>Instructor : Ahmet Sezer</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
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

