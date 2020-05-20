import React, { Component } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form, Divider, Button, Icon } from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
import FileUpload from '../FileUpload';
import '../../css/admin/manageAnnouncement.css';
import axios from "axios";
import { Link } from "react-router-dom";
import deneme from '../../images/fotos/course.jpg';



const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

var photoOptions=[]

export default class manageAnnouncement extends Component {
    constructor() {
        super()
        this.state = {
            id:'',
            date: '',
            title: '',
            text: '',
            startdate: '',
            enddate: '',
            regdate: '',
            add: false,
            edit: true,
            delete: false,
            announcements: [],
            announcement:"",
            deleted:"",
            photos: [],
            selectedFile: null
            
        }
        this.btnClicked = this.btnClicked.bind();
        this.getIndex = this.getIndex.bind();
        this.handleInput = this.handleInput.bind(this); 
        this.handleArea = this.handleArea.bind(this); 
        this.handlePhoto = this.handlePhoto.bind(this);
   
    }

    componentDidMount() {
        axios.get("http://localhost:8082/announcements")
            .then(response => this.setState({
                announcements: response.data
            }))
            console.log("Re-rendered");
        axios.get("http://localhost:8082/files")
        .then(response => this.setState({
            photos: response.data
        }))
            
    }

    handleChange = (event, {name, value}) => { 
        console.log(event.target.value);  
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleInput = (event, {name, value}) => {  
        console.log(event);
        this.setState({ title: value });
    }

    handleArea = (event, {name, value}) => {  
        console.log(event);
        this.setState({ text: value });
    }

    handlePhoto = (event, {name, value}) => {  
        console.log(value);
        this.setState({ photoname: value });
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


    editBtn = (x) => {
        this.setState({
            id: x.id,
            title: x.title,
            startdate: x.startdate,
            enddate: x.enddate,
            text:x.text
        });
    }

    fillPicker(){
        const { photos } = this.state;
        {photos.map((x, index) => {
            photoOptions.push({ key : x.name, text : x.name, value : x.name});
        })}

    }

    postAnnouncement = () => {
        axios.post("http://localhost:8081/announcements", {
            title: this.state.title,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            text: this.state.text,
            photoname: this.state.photoname
        })
        .then(response => {
            console.log(response);            
        });       
    }


    deleteAnnouncement = () => {
        axios.delete("http://localhost:8081/announcements",{ data: { id: this.state.id } });          
    }

    getIndex = (e) => {
        console.log(e.target.id)
        if(this.state.add){
            //ADD
        }else if(this.state.edit){
            //EDIT
            axios.get("http://localhost:8081/announcements/"+  e.target.id)
            .then(response => this.setState({
                announcement: response.data
            }))
        }else if(this.state.delete){
            //DELETE
            console.log("DELETE")
            axios.delete("http://localhost:8081/announcements/"+ e.target.id)
            .then(response => {
                console.log(response.data);
            })
        }
        const { match } = this.props
        var str  = match.url.split('/');
        var index = parseInt(str[3]);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    } 

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name);
        axios.post("http://localhost:8081/upload/",fd)
        .then(response => {
            console.log(response);
        })
    }

    render() {
        const add = this.state;
        // this.componentRendered()
        const href = '/announcement/manage/';
        const { announcements } = this.state;
        const { photos } = this.state;
        if(photos){
            console.log("ok");
            this.fillPicker();
        }
        return (
            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px", backgroundColor: "white", padding: "5%", borderRadius: "1%" }}>
                <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Manage Announcements</h2>
                    <div style={{ float: "right" }}>
                        <Button primary size="big" id="add" value={this.state.add} onClick={this.btnClicked}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                        <Button primary size="big" id="edit" value={this.state.edit} onClick={this.btnClicked}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                        <Button primary size="big" id="delete" value={this.state.delete} onClick={this.deleteAnnouncement}>DELETE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="delete" /></Button>
                    </div>
                </header>
                <Divider />
                <MainLayout />
                {this.state.add ? <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Title' key="title" value={this.state.title} placeholder='Enter announcement title' onChange={this.handleInput} />
                        <DateInput
                            label="Start Date"
                            name="startdate"
                            placeholder="Date"
                            value={this.state.startdate}
                            iconPosition="left"
                            onChange={this.handleChange}
                        />
                        <DateInput
                            label="End Date"
                            name="enddate"
                            placeholder="Date"
                            value={this.state.enddate}
                            iconPosition="left"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div style={{ float: "left", marginTop: "20px" }}>
                            <span>Upload New Photo</span>
                            <input type="file" name="file" onChange={this.fileSelectedHandler}/>                           
                        </div>
                        <div>
                        <Button primary size="big" id="upload"  onClick={this.fileUploadHandler}>Upload&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>

                        </div>
                        <div style={{ float: "right", width: "100%", marginLeft: "50px" }}>
                            <Form.TextArea type="text" value ={this.state.text} onChange={this.handleArea} style={{ height: "400px" }} label='Content' placeholder='Announcement Content' />
                        </div>
                    </Form.Group>
                        <Form.Select fluid label ='Photo' value={this.state.photoname}  placeholder='Choose a photo' onChange={this.handlePhoto}
                        options={photoOptions}/>;                  
                    
                    <Form.Button color="blue" onClick={this.postAnnouncement} size="large" style={{ float: "right" }}>Submit</Form.Button>
                    <Divider style={{ marginTop: "100px" }} />
                </Form> : null}
                {
                    this.state.edit ?
                        <div>
                            <Form>
                                <Form.Group widths='equal'>
                                <Form.Input fluid label='Title' key="title" value={this.state.title} placeholder='Enter announcement title' onChange={this.handleInput} />
                                    <DateInput
                                        label="Start Date"
                                        name="startdate"
                                        placeholder="Date"
                                        value={this.state.startdate}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                    />
                                    <DateInput
                                        label="End Date"
                                        name="enddate"
                                        placeholder="Date"
                                        value={this.state.enddate}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <div style={{ float: "left", marginTop: "20px" }}>
                                        <span>Upload New Photo</span>
                                        <input type="file" name="file" onChange={this.fileSelectedHandler}/>                           
                                    </div>
                                    <div>
                                    <Button primary size="big" id="upload"  onClick={this.fileUploadHandler}>Upload&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>

                        </div>
                                    <div style={{ float: "right", width: "100%", marginLeft: "50px" }}>
                                        <Form.TextArea style={{ height: "400px" }} value={this.state.text} onChange={this.handleArea} label='Content' placeholder='Announcement Content' />
                                    </div>
                                </Form.Group>
                               
                        <Form.Select fluid label ='Photo' value={this.state.photoname}  placeholder='Choose a photo' onChange={this.handlePhoto}
                        options={photoOptions}/>
                    
                                <Form.Button color="blue" onClick={this.postAnnouncement} size="large" style={{ float: "right", marginBottom: "50px" }}>Submit</Form.Button>
                            </Form>
                            <Divider style={{ marginTop: "100px" }} />
                            <div className="general">                             
                                {announcements.map((x, index) =>
                                {
                                let str = "data:image/jpeg;base64," + x.base64.toString();
                                console.log(str);
                                return(<div className='mngannspecial' key={x.id} onClick={console.log("SADAS")} >
                                <div style={{position:"absolute"}}><Link to={href + `${x.id}`}><span onChange={this.componentRendered}>
                                    <Icon size="large" name="edit" onClick={() => this.editBtn(x)} style={{marginLeft:"5px",marginTop:"5px",color:"#1678C2"}}/></span></Link></div>
                                <figure ><img src={str} style={{ width: "80%" }} /></figure>
                                <h3 style={{margin:"0px"}}>{x.title}</h3>
                                <p style={{marginTop:"5px" ,padding:"2%"}}>{x.text}</p>
                            </div>
                                )
                                }
                            
                            )}
                            </div>
                        </div> : null
                }
                { this.state.delete ? <div className="general">
                {announcements.map((x, index) =>
                                {
                                let str = "data:image/jpeg;base64," + x.base64.toString();
                                console.log(str);
                                return(<div className='mngannspecial' key={x.id} onClick={console.log("SADAS")} >
                                <div style={{position:"absolute"}}><Link to={href + `${x.id}`}><span onChange={this.componentRendered}>
                                <Icon size="large" name="edit" onClick={() => this.editBtn(x)} style={{marginLeft:"5px",marginTop:"5px",color:"#1678C2"}}/></span></Link></div>
                                <figure ><img src={str} style={{ width: "80%" }} /></figure>
                                <h3 style={{margin:"0px"}}>{x.title}</h3>
                                <p style={{marginTop:"5px" ,padding:"2%"}}>{x.text}</p>
                            </div>
                                )
                                }
                            
                            )}
                            </div> : <div></div>
                
                }


            </div>
        )
    }
}

