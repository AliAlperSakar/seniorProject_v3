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
import '../../css/admin/manageTournament.css'
import axios from "axios";
import { Link } from "react-router-dom";
import deneme from '../../images/fotos/course.jpg';




const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]
const campusoptions = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' },
]
export default class manageAnnouncement extends Component {
    constructor() {
        super()
        this.state = {
            id:'',
            teamquota: '',
            campus: '',
            name: '',
            date: '',
            title: '',
            content: '',
            startdate: '',
            enddate: '',
            regdate: '',
            add: false,
            edit: true,
            delete: false,
            tournaments: [],
            isEdit: false,
            isEdt: true
        }
        this.btnClicked = this.btnClicked.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.btnAdd = this.btnAdd.bind(this)
        this.btnEdt = this.btnEdt.bind(this)



    }

    componentDidMount() {
        axios.get("http://localhost:8082/tournaments")
            .then(response => this.setState({
                tournaments: response.data
            }))

    }

    componentDidUpdate() {
        if (!this.state.isEdt) {
            axios.get("http://localhost:8082/tournaments")
                .then(response => this.setState({
                    tournaments: response.data,
                    isEdt:true
                }))
        }
        console.log("Re-rendered");
        console.log(this.state.isEdt)
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

    btnDelete = (x) => {
        axios.delete("http://localhost:8082/tournaments", { data: { id: x.id } })
            .then(response => {
                if (response.status == 200)
                    alert(x.name + "tournament is deleted");
            }
            )
            this.setState({
                isEdt:false
            })
    }

    btnEdit = (x) => {
        this.setState({
            name: x.name,
            campus: x.campus.toLowerCase(),
            teamquota: x.teamquota,
            isEdit: true,
            id:x.id
        })
    }

    btnAdd = () => {
        axios.post("http://localhost:8082/tournaments", { name: this.state.name, teamquota: this.state.teamquota, campus: this.state.campus })
            .then(response => {
                if (response.status == 200)
                    alert(this.state.name + "tournament is added");
            }
            )
            this.setState({
                isEdt:false
            })
            // this.forceUpdate()
    }

    btnEdt = () => {
        console.log("EDIT");
        axios.put("http://localhost:8082/tournaments", {id:this.state.id, name: this.state.name, teamquota: this.state.teamquota, campus: this.state.campus} )
            .then(response => {
                if (response.status == 200)
                    alert(this.state.name + "tournament is edited");
            }
            )
            let edit = this.state.isEdt
            this.setState({
                isEdt:!edit
            })
    }

    render() {
        const add = this.state;
        // this.componentRendered()
        const href = '/announcement/manage/';
        const { tournaments } = this.state;
        const { match } = this.props
        console.log(this.state);
        return (
            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px", backgroundColor: "white", padding: "5%", borderRadius: "1%" }}>
                <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Manage Tournaments</h2>
                    <div style={{ float: "right" }}>
                    </div>
                </header>
                <Divider />
                <MainLayout />
                {
                    this.state.edit ?
                        <div>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Name' name='name' value={this.state.name} placeholder='Enter tournament name' onChange={this.handleChange} />
                                    <Form.Input fluid label='Quota' name='teamquota' placeholder='Enter tournament quota' value={this.state.teamquota} onChange={this.handleChange} />
                                    <Form.Select fluid label='Campus' name='campus' placeholder='Choose a campus' value={this.state.campus} onChange={this.handleChange}
                                        options={campusoptions} />
                                </Form.Group>
                                <Form.Group>
                                    
                                    <div style={{ float: "right", width: "100%", marginLeft: "50px" }}>

                                    </div>
                                </Form.Group>
                                {
                                    this.state.isEdit ?
                                        <Button primary size="big" id="edit" value={this.state.edit} onClick={this.btnEdt}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" />
                                        </Button> : <Button primary size="big" id="add" value={this.state.add} onClick={this.btnAdd}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                }

                            </Form>
                            <Divider style={{ marginTop: "100px" }} />
                            <div>
                                <table className="table17" borderWidth="0">
                                    {tournaments.map((x) =>
                                        <tr>
                                            <td><br></br> Tournament : {x.name}<br></br> Campus : {x.campus} <br></br> Team Quota: {x.teamquota}<br></br></td>
                                            <td><Button primary size="medium" id="delete" onClick={() => this.btnDelete(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>
                                            <td><Button primary size="medium" id="delete" onClick={() => this.btnEdit(x)}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>

                                        </tr>
                                    )}

                                </table>

                            </div>
                            <div className="general">
                                {/* {announcements.map((x, index) =>
                                    <div className='mngannspecial' key={x.id} onClick={console.log("SADAS")} >
                                        <div style={{ position: "absolute" }}><Link to={href + `${x.id}`}><span onChange={this.componentRendered}><Icon size="large" name="edit" style={{ marginLeft: "5px", marginTop: "5px", color: "#1678C2" }} /></span></Link></div>
                                        <figure ><img src={deneme} style={{ width: "80%" }} /></figure>
                                        <h3 style={{ margin: "0px" }}>{x.text}</h3>
                                        <p style={{ marginTop: "5px", padding: "2%" }}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. </p>
                                    </div>)
                                } */}
                            </div>
                        </div> : null
                }
                {/* {this.state.delete ? <div className="general">
                    {announcements.map((x, index) =>
                        <div className='mngannspecial' key={x.id} onClick={console.log("SADAS")} >
                            <div style={{ position: "absolute" }} onClick={this.getIndex}><Link to={href + `${x.id}`}><Icon id={x.id} size="big" name="delete" /></Link></div>
                            <figure ><img src={deneme} style={{ width: "80%" }} /></figure>
                            <h3 style={{ margin: "0px" }}>{x.text}</h3>
                            <p style={{ marginTop: "5px", padding: "2%" }}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. </p>
                        </div>)
                    }
                </div> : <div></div>

                } */}


            </div>
        )
    }
}

