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
import '../../css/admin/manageAccount.css'
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


export default class manageReservation extends Component {
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
            register: [],
            announcement: "",
            deleted: ""
            
        }
        this.btnClicked = this.btnClicked.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.approveRegister = this.approveRegister.bind(this);
        this.deleteRegister = this.deleteRegister.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8082/register")
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

    approveRegister = (x) => {
        console.log(x);
        axios.post("http://localhost:8082/account", {
            name: x.name,
            surname: x.surname,
            bilkentId: x.bilkentId,
            email: x.email,
            password: x.password,
            status: x.status
        })
        .then(response => {
            console.log(response);            
        });       
    }

    deleteRegister = (x) => {
        console.log(x);
        axios.delete("http://localhost:8082/register",{ data: { id: x.bilkentId } });
       
    }

    componentDidUpdate(){
        axios.get("http://localhost:8082/register")
            .then(response => this.setState({
                register: response.data
            }))
        console.log("Re-rendered");
    }


    btnClicked = (e) => {
        if (e.target.id == "add") {
            this.setState({ add: true, edit: false, delete: false })
        } else if (e.target.id == "edit") {
            this.setState({ add: false, edit: true, delete: false });
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
        const { register } = this.state;
        const { match } = this.props
        console.log(this.state);
        return (
            <div>
                <MainLayout />
                <div style={{ marginTop: "100px", marginRight: "5%", marginLeft: "5%", backgroundColor: "white", padding: "5%", borderRadius: "20px", position: "absolute", width: "90%", justifyContent: "center" }}>
                    <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Manage Account</h2></header>
                    <Divider />
                    
                    <div className="contentmanacc">
                        <table className="table17" borderWidth="0">
                        {register.map((x, index) =>
									{
										
										return (
                                            <tr>
                                            <td>{x.bilkentId}<br></br>{x.name}<br></br>{x.surname}<br></br>{x.email}<br></br>{x.status}</td>
                                            <td>
                                                <Button primary size="medium" id="edit" value={this.state.edit} onClick={() => this.approveRegister(x)}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                                <Button primary size="medium" id="delete" value={this.state.delete} onClick={() => this.deleteRegister(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button>
                                            </td>


                                            </tr>
											
										)}									
								)
								}        
                            
                            {/* <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={this.btnClicked}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>


                            </tr>
                            <tr>
                            <td>Bilkent Id:1<br></br> Name : Berkay <br></br> Surname : Kara <br></br> E-mail : bkkaa@gmail.com<br></br> Status : Academic</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnClicked}>APPROVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="check" /></Button>
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

