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
import '../../css/admin/authorizeStaff.css'
import axios from "axios";
import { Link } from "react-router-dom";
import deneme from '../../images/fotos/course.jpg';




const staffoptions= [
    { key: 'a', text: 'Ahmet Sezer', value: 'ahmet' },
    { key: 'b', text: 'Mehmet Sezmez', value: 'mehmet' },
    { key: 'c', text: 'Ceylan Sezici', value: 'mehmet' },
    { key: 'd', text: 'Deniz Sezdi', value: 'mehmet' },
    
]
const roleoptions = [
    { key: 'a', text: 'Admin', value: 'admin' },
    { key: 's', text: 'Staff', value: 'staff' },
]


export default class authorizeStaff extends Component {
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
            staffs: [],
            announcement: "",
            deleted: ""

        }
        this.btnClicked = this.btnClicked.bind();
        this.getIndex = this.getIndex.bind();
    }

    componentDidMount() {
        axios.get("http://localhost:8082/authorize")
            .then(response => this.setState({
                staffs: response.data
            }))
        console.log("Re-rendered");

    }


    makeAdmin= (x) => {
        axios.put("http://localhost:8082/authorize", {
            bilkentId: x.bilkentId,
            email: x.email,
            status: x.status
        })
        .then(response => {
            console.log(response);            
        });

        axios.get("http://localhost:8082/authorize")
            .then(response => this.setState({
                register: response.data
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
        const { staffs } = this.state;
        const { match } = this.props
        console.log(this.state);
        return (
            <div>
                <MainLayout />
                <div style={{ marginTop: "100px", marginRight: "5%", marginLeft: "5%", backgroundColor: "white", padding: "5%", borderRadius: "20px", position: "absolute", width: "90%", justifyContent: "center" }}>
                    <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Authorize Staff</h2></header>
                    <Divider />
                    <div className="contentmanstaff1">
                        <div className="manappfields">
                            <div className="manappselector1">
                                <Form.Select fluid label='Staff' placeholder='Choose an Staff' onChange={this.handleChange}
                                    options={staffoptions} className="formmanapp" />
                            </div>
                            
                            <div className="manappselector3">
                                <Form.Select fluid label='Role' placeholder='Choose a Role' onChange={this.handleChange}
                                    options={roleoptions} className="formmanrescampus" />
                            </div>
                          

                        </div>

                        <div className="manautbuttons">
                            <Button primary size="medium" id="add" value={this.state.add} onClick={this.btnClicked}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                            
                        </div>
                    </div>
                   
                    <header style={{ marginBottom: "100px",marginTop:"50px"}}><h2 style={{ float: "left" }}>Staff List</h2></header>
                    <Divider />
                   
                        {staffs.map((x, index) =>
									{
										
										return (
                                            <div className="contentmanstaff">
                                            <table className="table18" borderWidth="0">
                                            <tr>
                                            <td>Bilkent ID: {x.bilkentId}<br></br>Name: {x.name}<br></br>Surname: {x.surname}<br></br>Status: {x.status}</td>
                                            <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={() => this.makeAdmin(x)}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                                <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>

                                            </tr>
                                            <tr>
                                <td></td>
                            </tr>





                        </table>

                    </div>
                
											
										)}									
								)
								}        
                            
                            {/* <tr>
                            <td>Id:1<br></br>Staff Name : Ahmet <br></br>Staff Surname : Sezer <br></br>Role : Admin</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br>Staff Name : Ahmet <br></br>Staff Surname : Sezer <br></br>Role : Admin</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr> */}
                            

                </div>


            </div>
        )
    }
}

