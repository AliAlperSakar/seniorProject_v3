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
import '../../css/admin/manageEvents.css';
import axios from "axios";
import { Link } from "react-router-dom";
import deneme from '../../images/fotos/course.jpg';



const options = [
    
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

var photoOptions=[]

export default class manageEvent extends Component {
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
            events: [],
            event:"",
            deleted:"",
            photos: [],
            selectedFile: null,
            isEdit:false
            
        }
        this.btnClicked = this.btnClicked.bind(this);
        this.getIndex = this.getIndex.bind(this);  
        this.handleInput = this.handleInput.bind(this); 
        this.handleArea = this.handleArea.bind(this); 
        this.handlePhoto = this.handlePhoto.bind(this);

    }

    componentDidMount() {
        axios.get("http://localhost:8082/events")
            .then(response => this.setState({
                events: response.data
            }))
            console.log("Re-rendered");
        axios.get("http://localhost:8082/files")
        .then(response => this.setState({
            photos: response.data
         }))
    }

    // componentDidUpdate(){
    //     axios.get("http://localhost:8081/events")
    //         .then(response => this.setState({
    //             events: response.data
    //         }))
    //         console.log("Re-rendered");
    //     axios.get("http://localhost:8081/files")
    //     .then(response => this.setState({
    //         photos: response.data
    //      }))

    // }

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
            text:x.text,
            isEdit:true
        });
    }

    fillPicker(){
        photoOptions = []
        const { photos } = this.state;
        {photos.map((x, index) => {
            photoOptions.push({ key : x.name, text : x.name, value : x.name});
        })}``

    }

    postEvent = () => {
        axios.post("http://localhost:8082/events", {
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


    deleteEvent = (x) => {
        axios.delete("http://localhost:8082/events",{ data: { id: x.id } });          
    }


    getIndex = (e) => {
        console.log(e.target.id)
        if(this.state.add){
            //ADD
        }else if(this.state.edit){
            //EDIT
            axios.get("http://localhost:8082/events/"+  e.target.id)
            .then(response => this.setState({
                event: response.data
            }))
        }else if(this.state.delete){
            //DELETE
            console.log("DELETE")
            axios.delete("http://localhost:8082/events/"+ e.target.id)
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
        axios.post("http://localhost:8082/upload/",fd)
        .then(response => {
            console.log(response);
        })
    }

    btnEdt = () => {
        let event = {
            title: this.state.title,
            text: this.state.text,
            photoname: this.state.photoname,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
        };
        console.log(event);
        axios.put("http://localhost:8082/event", event )
        .then(response => {
            if (response.status == 200)
                alert(this.state.title + " event is edited");
        }
        )
    

    }
    render() {
        const add = this.state;
        // this.componentRendered()
        const href = '/event/manage/';
        const { events,isEdit } = this.state;
        const { photos } = this.state;
        if(photos){
            console.log("ok");
            this.fillPicker();
        }
        const { match } = this.props
        return (
            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px", backgroundColor: "white", padding: "5%", borderRadius: "1%" }}>
                <header style={{ marginBottom: "70px" }}><h2 style={{ float: "left" }}>Manage Events</h2>
                    <div style={{ float: "right" }}>
                        { !isEdit ? <Button primary size="big" id="add" value={this.state.add} onClick={this.postEvent}>ADD&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button> :
                        <Button primary size="big" id="edit" value={this.state.edit} onClick={this.btnEdt}>EDIT&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
        }
                    </div>
                </header>
                <Divider />
                <MainLayout />
                        <div>
                            <Form>
                                <Form.Group widths='equal'>
                                <Form.Input fluid label='Title' key="title" value={this.state.title} placeholder='Enter event title' onChange={this.handleInput} />
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
                                        <Form.TextArea style={{ height: "400px" }} value={this.state.text} onChange={this.handleArea} label='Content' placeholder='Event Content' />
                                    </div>
                                </Form.Group>
                               
                        <Form.Select fluid label ='Photo' value={this.state.photoname}  placeholder='Choose a photo' onChange={this.handlePhoto}
                        options={photoOptions}/>
                    
                            </Form>
                            <Divider style={{ marginTop: "100px" }} />
                            <div className="general">
                            {events.map((x, index) =>
                                {
                                let str = "data:image/jpeg;base64," + x.base64.toString();
                                return(<div className='mngannspecial' key={x.id} onClick={console.log("SADAS")} >
                                <div style={{position:"absolute"}}><span onChange={this.componentRendered}>
                                    <Icon size="large" name="edit" onClick={() => this.editBtn(x)} style={{marginLeft:"5px",marginTop:"5px",color:"#1678C2"}}/><Icon size="large" name="delete" onClick={() => this.deleteEvent(x)} style={{marginRight:"5px",marginTop:"5px",color:"#1678C2"}}/></span></div>
                                <figure ><img src={str} style={{ width: "80%" }} /></figure>
                                <h3 style={{margin:"0px"}}>{x.title}</h3>
                                <p style={{marginTop:"5px" ,padding:"2%"}}>{x.text}</p>
                            </div>
                                )
                                }
                            
                            )}


                                {/* {announcements.map((x, index) =>
                                    <div className='mngannspecial' key={x.id} onClick={console.log("SADAS")} >
                                        <div style={{position:"absolute"}}><Link to={href + `${x.id}`}><span onChange={this.componentRendered}><Icon size="large" name="edit" style={{marginLeft:"5px",marginTop:"5px",color:"#1678C2"}}/></span></Link></div>
                                        <figure ><img src={deneme} style={{ width: "80%" }} /></figure>
                                        <h3 style={{margin:"0px"}}>{x.text}</h3>
                                        <p style={{marginTop:"5px" ,padding:"2%"}}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. </p>
                                    </div>)
                                } */}
                            </div>
                        </div> 
                
                


            </div>
        )
    }
}

