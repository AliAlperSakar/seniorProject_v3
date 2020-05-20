import React, { Component } from 'react'
import MainLayout from '../layouts/MainLayout'
import { Form, Divider, Button, Icon, Modal } from 'semantic-ui-react'
import '../css/courses.css';
import { SocialMediaIconsReact } from 'social-media-icons-react';
import store from 'store';
import axios from "axios";


const courseoptions = [
    { key: 'c', text: 'Crunch', value: 'crunch' },
    { key: 'g', text: 'Group Exercises', value: 'groupexercises' },
    { key: 'l', text: 'Leg Workout', value: 'legworkout' },
    { key: 'n', text: 'Noon Yoga', value: 'noonyoga' },
    { key: 'p', text: 'Pilates', value: 'pilates' },
    { key: 's', text: 'Stretching', value: 'stretching' },
    { key: 'sz', text: 'Strong by Zumba', value: 'strongby' },
    { key: 'tb', text: 'Tae Bo', value: 'taebo' },
    { key: 't', text: 'Total Body Shape', value: 'totalbody' },
    { key: 'y', text: 'Yoga', value: 'yoga' },
    { key: 'z', text: 'Zumba', value: 'zumba' },
]

const timeoptions = [
    { key: '1', text: 'Monday 16:30 / 17:30', value: 'monday' },
    { key: '2', text: 'Thursday 16:30 / 17:30', value: 'thursday' },
    { key: '3', text: 'Wednesday 16:30 / 17:30', value: 'wednesday' },
]


export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            bool: false,
            isAll: true,
            selectedCourses: [],
            error:false
        }
        // this.getAnnouncement = this.getAnnouncement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8082/courses")
            .then(response => this.setState({
                courses: response.data
            }))
    }

    click = (e) =>{
        console.log("OPPSS");
    }

    // ModalExampleShorthand = () => (
    //     <Modal
    //       trigger={<Button>Show Modal</Button>}
    //       header='Reminder!'
    //       content='Call Benjamin regarding the reports.'
    //       actions={['Snooze', { key: 'done', content: 'Done', positive: true, onClose:this.click}]}
    //     />
    // )

    handleChange = (e,data) => {
        const { courses, selectedCourses } = this.state;
        const arr = []
        courses.map((x)=>{
            if(x.name.toLowerCase().replace(" ", "").replace(" ", '').toString() == data.value ){
               arr.push(x)
           }
        })
        console.log(arr);
        this.setState({
            selectedCourses: arr,
            isAll: false
        })

        console.log(arr);
    }
    
    onClick = (x) => {
        const user = store.get("user")
        if(user.status != 'student'){
            alert("You cannot register that without paying course fee")
            this.setState({
                error:true
            })
        }else{
            let obj = {
                "bilkentId": user.id,
                "courseId": x.id,
                "name": x.name,
                "instructor": x.instructor,
                "schedule": x.schedule,
                "level": x.level,
                "place": x.place,
                "quota": x.quota
            }
            axios.post("http://192.168.1.30:8082/enrollCourse", obj)
                .then(res => {
                    if (res.status == 200) {
                        alert("You have registered " + x.name);
                    }
                }).catch(err => {
                    alert("You have already registered that course");
                });
        }
    }
    render() {
        const { courses,isAll,selectedCourses,err } = this.state;
        console.log(this.state);
        return (
            <div>
                <MainLayout />
                <div className="coursemain">
                    <div className="maintext">Courses</div>
                </div>
                <div className="courseoption">

                    <Form.Select fluid label='Courses' placeholder='Choose a Course' onChange={this.handleChange}
                        options={courseoptions} className="formcourse" />

                </div>
                <div className="selectedcoursemain2">
                    {
                        isAll ? courses.map((x,key) => {
                            
                            
                            return (<div className="selectedcourse">
                                <div className="coursename">
                                    {x.name}
                                </div>
                                <div className="instructor">
                                    <b>Instructor :</b> {x.instructor}
                                </div>
                                <div className="place">
                                    <b>Place :</b> {x.campus}
                                </div>
                                <div className="level">
                                    <b>Level :</b> {x.level}
                                </div>
                                <div className="level">
                                    <b>Date :</b> {x.schedule}
                                </div>
                                {/* <div className="timeslot">
                                    <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                                        options={timeoptions} />

                                </div> */}
                                <div className="enrollbutton">
                                    <Button primary size="medium" id="add" onClick={() => this.onClick(x)}>Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                </div>
                            </div>)
                        }) : selectedCourses.map((x,key) => {
                            
                            
                            return (<div className="selectedcourse">
                                <div className="coursename">
                                    {x.name}
                                </div>
                                <div className="instructor">
                                    <b>Instructor :</b> {x.instructor}
                                </div>
                                <div className="place">
                                    <b>Place :</b> {x.campus}
                                </div>
                                <div className="level">
                                    <b>Level :</b> {x.level}
                                </div>
                                <div className="level">
                                    <b>Date :</b> {x.schedule}
                                </div>
                                {/* <div className="timeslot">
                                    <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                                        options={timeoptions} />
                                </div> */}
                                <div className="enrollbutton">
                                    <Button primary size="medium" id="add" onClick={() => this.onClick(x)}>Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                </div>
                            </div>)
                        }) 
                    }
                    
                </div>

                {/* <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>

                <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>

                <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>
                
                </div>
                <div className="selectedcoursemain">
                <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>
                <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>

                <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>

                <div className="selectedcourse">
                    <div className="coursename">
                        Zumba
            </div>
                    <div className="instructor">
                        <b>Instructor :</b> Seda bilmemne
            </div>
                    <div className="place">
                       <b>Place :</b> Main Campus
            </div>
            <div className="level">
                       <b>Level :</b> Beginner
            </div>

            <div className="timeslot">
            <Form.Select fluid label='Time Slot' placeholder='Choose a Time Slot' onChange={this.handleChange}
                        options={timeoptions} />

            </div>
            <div className="enrollbutton">
            <Button primary size="20px" id="add" >Enroll&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
            </div>
                </div>
                 */}



                <div className="footer">
                    <footer style={{ textAlign: "center", width: "100%", paddingTop: "30px", paddingBottom: "30px", marginBottom: "50px", marginTop: "30px", backgroundColor: "#dadce8" }}>
                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,186,223,1)" iconSize="5" roundness="50%" url="https://twitter.com/BilkentUniv" size="30" />&nbsp;&nbsp;&nbsp;
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,90,223,1)" iconSize="5" roundness="50%" url="https://tr-tr.facebook.com/pages/Bilkent-Yurtlar-Spor-Salonu/277203525641805" size="30" />&nbsp;&nbsp;&nbsp;
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="youtube" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(251,31,0,1)" iconSize="5" roundness="50%" url="https://www.youtube.com/user/BilkentUniversitesi" size="30" />&nbsp;&nbsp;&nbsp;
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="instagram" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(248,87,0,1)" iconSize="5" roundness="50%" url="http://instagram.com/bilkentuniv" size="30" />
                    </footer>
                    <p class="copyright" style={{ marginBottom: "50px", textAlign: "center" }}>Copyright ©  Bilkent University. All Rights Reserved</p>
                </div>
            </div>

        )
    }
}
