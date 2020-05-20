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
import '../../css/admin/manageReservation.css'
import axios from "axios";
import { Link } from "react-router-dom";
import deneme from '../../images/fotos/course.jpg';

const initialState = {
    date: '',
    title: '',
    content: '',
    startdate: '',
    enddate: '',
    regdate: '',
    add: false,
    edit: true,
    delete: false,
    data: [],
    announcement: "",
    deleted: "",
    sporttype:'',
    isEdt:true,
    second:'',
    timeslot:'',
    isEdit:false,
    id:''
}

const sportoptions = [
    { key: 't', text: 'Tennis', value: 'tennis' },
    { key: 'f', text: 'Football', value: 'football' },
    { key: 's', text: 'Squash', value: 'squash' },
    { key: 'r', text: 'Pool', value: 'pool' },

]

const campusoption = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' },
]


export default class manageReservation extends Component {
    constructor() {
        super()
        this.state = initialState
       
        this.sportPicker = this.sportPicker.bind(this);
        this.btnDelete = this.btnDelete.bind(this);
        

    }

    reset() {
        this.setState(initialState);
    }

    componentDidMount() {
        axios.get("http://localhost:8082/tennis")
            .then(response => this.setState({
                data: response.data
            }))
        console.log("Re-rendered");
    }

    componentDidUpdate() {
        if (!this.state.isEdt) {
            axios.get("http://localhost:8082/"+this.state.sporttype)
                .then(response => this.setState({
                    tournaments: response.data,
                    isEdt:true
                }))
        }
        console.log("Re-rendered");
        console.log(this.state.isEdt)
    }

    sportPicker = (event, { name, value }) => {
        this.reset()
        console.log(value);
        axios.get("http://localhost:8082/"+value)
            .then(response => this.setState({
                data: response.data,
                sporttype:value
            }))
        // if (this.state.hasOwnProperty(name)) {
        //     this.setState({ [name]: value });
        // }
    }

    btnDelete = (x) =>{
        const {sporttype} = this.state;
        let url = '';
        let obj = {}
        let tag = ''
        console.log(x);
        if(sporttype == 'tennis'){
            url = sporttype
            obj= {id: x.id, courtNo:x.courtNo, available: x.available, time:x.time }
            tag = x.courtNo
        }else if(sporttype == 'football'){
            url = sporttype
            obj= x
            tag = x.field
        }else if(sporttype == 'squash'){
            url = sporttype
            obj= x
            tag = x.courtNo
        }else if(sporttype == "pool"){
            url = sporttype
            obj= x
            tag = x.lane
        }
        console.log(obj);
        axios.delete("http://localhost:8082/"+url, { data: { id: x.id }})
            .then(response => {
                if (response.status == 200)
                    alert(tag + " reservation is deleted");
            }
            )
        this.setState({
            isEdt:false
        })
    }

    btnAdd = () => {
        const {sporttype} = this.state;
        let obj = {}
        if(sporttype == 'tennis'){
            obj = {courtNo: this.state.second, time: this.state.timeslot, available:1 }
        }else if (sporttype == 'football'){
            obj = {field: this.state.second, time: this.state.timeslot, available:1 }
        }else if (sporttype == 'squash') {
            obj = {courtNo: this.state.second, time: this.state.timeslot, available:1 }
        }else if (sporttype == 'pool') {
            obj = {lane: this.state.second, time: this.state.timeslot, quota:this.state.quota }
        }
        axios.post("http://localhost:8082/"+sporttype, obj)
            .then(response => {
                if (response.status == 200)
                    alert(this.state.sporttype + "reservation is added");
            }
            )
    }

    btnEdt = () => {
        const {sporttype} = this.state;
        let obj = {};
        if(sporttype == 'tennis'){
            obj = {id:this.state.id, courtNo: this.state.second, time: this.state.timeslot, available:1 }
            
        }else if(sporttype == 'football'){
            obj = {id:this.state.id, field: this.state.second, time: this.state.timeslot, available:1 }
        }else if(sporttype == 'squash') {
            obj = {id: this.state.id, courtNo: this.state.second, time: this.state.timeslot, available:1 }
        }else if(sporttype == 'pool') {
            obj = {id:this.state.id, lane: this.state.second, time: this.state.timeslot, quota:this.state.quota }
        }
        axios.put("http://localhost:8082/"+sporttype, obj )
            .then(response => {
                if (response.status == 200)
                    alert(this.state.sporttype + "reservation is edited");
            }
            )
        
            let edit = this.state.isEdt
            this.setState({
                isEdt:!edit
            })
    }

    handleChange = (e,{name,value}) =>{
        console.log(name,value);
        this.setState({
            [event.target.name]:value 
        })
    }

    editBtn = (x) => {
        console.log(x);
        this.setState({
            second:x.courtNo || x.field || x.lane,
            timeslot: x.time ,
            isEdit:true,
            id:x.id,
            quota:x.quota || 0
        })
    }

    render() {
        const add = this.state;
        // this.componentRendered()
        const href = '/announcement/manage/';
        const { data, sporttype, isEdit} = this.state;
        const { match } = this.props
        console.log(this.state);
        return (
            <div>
                <MainLayout />
                <div style={{ marginTop: "100px", marginRight: "5%", marginLeft: "5%", backgroundColor: "white", padding: "5%", borderRadius: "20px", position: "absolute", width: "90%", justifyContent: "center" }}>
                    <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Manage Reservation</h2></header>
                    <Divider />
                    <div className="contentmanres1">
                        <div className="manresfields">
                            <div className="manresselector1">
                                <Form.Select fluid label= 'Sports' placeholder='Choose a Sport' onChange={this.sportPicker}
                                    options={sportoptions} className="formmanres" />
                            </div>
                            <div className="manresselector2">
                                <Form.Input fluid label={sporttype == 'tennis' ? 'Court' : (sporttype == 'pool' ? 'Lane' : (sporttype == 'squash' ? 'Court' : 'Field'))} placeholder={'Enter ' + sporttype == 'tennis' ? 'Court' : (sporttype == 'pool' ? 'Lane' : (sporttype == 'squash' ? 'Court' : 'Field'))} name='second' onChange={this.handleChange} value={this.state.second} className="formmanrestext" />
                            </div>
                           {/* <div className="manresselector3">
                                <Form.Select fluid label='Campus' placeholder='Choose a Campus' onChange={this.handleChange}
                                    options={campusoption} className="formmanrescampus" />
                            </div>} */}
                            <div className="manresselector4">
                                <Form.Input fluid label='Time Slot' placeholder='Enter Time Slot' name='timeslot' value={this.state.timeslot} onChange={this.handleChange} className="formmanrestime" />
                            </div>
                            {
                                sporttype == 'pool' ? <div className="manresselector4">
                                <Form.Input fluid label='Quota' placeholder='Enter Quota' name='quota' value={this.state.quota} onChange={this.handleChange} className="formmanrestime" />
                            </div>: null}

                        </div>

                        <div className="manresbuttons">
                            {
                                !isEdit ? <Button primary size="medium" id="add" value={this.state.add} onClick={this.btnAdd}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button> :
                            <Button primary size="medium" id="edit" value={this.state.edit} onClick={this.btnEdt}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                            }
                        </div>
                    </div>
                    <div classname="manres1">
                        <Form.Select fluid label='Sports' placeholder='Choose a Sport' onChange={this.sportPicker}
                            options={sportoptions} className="formres" />
                    </div>
                    <div className="contentmanres">
                        <table className="table16" borderWidth="0">
                        {
                            sporttype == 'tennis' ? data.map((x)=>
                            <tr>
                                <td>Id: {x.id}<br></br> Court No : {x.courtNo} <br></br>Availability : {x.available} <br></br>Time Slot : {x.time}</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={() => this.editBtn(x)}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={() => this.btnDelete(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>
                            </tr> ) : <tr></tr>
                        }
                        {
                            sporttype == 'football' ? data.map((x)=>
                            <tr>
                                <td>Id: {x.id}<br></br> Field : {x.field} <br></br>Availability : {x.available} <br></br>Time Slot : {x.time}</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={() => this.editBtn(x)}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={() => this.btnDelete(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>
                            </tr> ) : <tr></tr>
                        }
                        {
                            sporttype == 'squash' ? data.map((x)=>
                            <tr>
                                <td>Id: {x.id}<br></br> Court No : {x.courtNo} <br></br>Availability : {x.available} <br></br>Time Slot: {x.time}</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={() => this.editBtn(x)}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={() => this.btnDelete(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>
                            </tr> ) : <tr></tr>
                        }
                        {
                            sporttype == 'pool' ? data.map((x)=>
                            <tr>
                                <td>Id: {x.id}<br></br> Lane : {x.lane} <br></br>Quota : {x.quota} <br></br>Time Slot: {x.time}</td>
                                <td><Button primary size="medium" id="edit" value={this.state.edit} onClick={() => this.editBtn(x)}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                    <Button primary size="medium" id="delete" value={this.state.delete} onClick={() => this.btnDelete(x)}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button></td>
                            </tr> ) : <tr></tr>
                        }
                        {
                            sporttype == '' ? data.map((x)=>
                            <tr>
                                <td>Id: {x.id}<br></br> Court No : {x.courtNo} <br></br>Availability : {x.available} <br></br>Time Slot : {x.time}</td>
                               
                            </tr> ) : <tr></tr>
                        }
                         
                            





                        </table>

                    </div>
                

                </div>


            </div>
        )
    }
}

