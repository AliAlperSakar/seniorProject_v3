import React, { Component } from 'react'
import MainLayout from '../layouts/MainLayout'
import '../css/reservation.css'
import { Form, Divider, Button, Icon, Select } from 'semantic-ui-react'
import { SocialMediaIconsReact } from 'social-media-icons-react';
import axios from "axios";
import store from 'store';
const initialState = {
    data: [],
    restype: '',
    campusFiltered: [],
    sportFiltered: [],
    campus: '',
    selectedSport: '',
    firstoptions: [],
    secondoptions: [],
    thirdoptions: [],
    sportCourts: []
};
const resType = [
    { key: 'a', text: 'Appointment', value: 'appointment' },
    { key: 's', text: 'Sport Court', value: 'sportcourt' },
    { key: 't', text: 'Tournaments', value: 'tournament' },
    { key: 'p', text: 'Pool', value: 'pool' },

]
const campusoptions = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' },
]

const sportcourts = [
    { key: 't', text: 'Tennis', value: 'tennis' },
    { key: 's', text: 'Squash', value: 'squash' },
]

const appointmentplaces = [
    { key: 'main', text: 'Main Sports Hall', value: 'Main Sports Hall' },
    { key: 'dormitory', text: 'Dormitories Sports Hall', value: 'Dormitories Sports Hall' }
]

const lanes = [
    { key: '1', text: 'Lane 1', value: 'Lane 1' },
    { key: '2', text: 'Lane 2', value: 'Lane 2' },
    { key: '3', text: 'Lane 3', value: 'Lane 3' },
    { key: '4', text: 'Lane 4', value: 'Lane 4' },
    { key: '5', text: 'Lane 5', value: 'Lane 5' },
    { key: '6', text: 'Lane 6', value: 'Lane 6' }
]

const sportoptions = [
    { key: 'b', text: 'Basketball', value: 'basketball' },
    { key: 'f', text: 'Football', value: 'football' },
    { key: 'v', text: 'Volleyball', value: 'volleyball' },
    { key: 't', text: 'Tennis', value: 'tennis' },
    { key: 'b', text: 'Badminton', value: 'badminton' },
    { key: 'r', text: 'Tennis', value: 'tennis' },
    { key: 'r', text: 'Table Tennis', value: 'tabletennis' }
]


export default class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.firstPicker = this.firstPicker.bind(this);
        this.secondPicker = this.secondPicker.bind(this);
        this.thirdPicker = this.thirdPicker.bind(this);
        this.onClick = this.onClick.bind(this);
        // filterCamp

    }

    reset() {
        this.setState(initialState);
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        console.log(this.state.restype);
        // axios.get("http://localhost:8082/"+this.state.restype)
        //         .then(response => this.setState({
        //             data: response.data
        //         }))
    }

    firstPicker = (e, data) => {
        this.reset();
        let restype = data.value;
        let secPicker = [];
        let thirdPicker = [];

        if (data.value == "tournament") {
            axios.get("http://localhost:8082/tournaments")
                .then(response => this.setState({
                    data: response.data
                }))
            secPicker = campusoptions
            thirdPicker = sportoptions
        } else if (data.value == "sportcourt") {
            thirdPicker = sportcourts
        } else if (data.value == "appointment") {
            axios.get("http://localhost:8082/appointments")
                .then(response => this.setState({
                    data: response.data
                }))
            secPicker = appointmentplaces
        } else if (data.value == "pool") {
            let slots = [];
            axios.get("http://localhost:8082/pool")
                .then(response => {
                    response.data.map((x) => {
                        let obj = { key:'',text:'',value:''}
                        obj.key = x.time
                        obj.text = x.time
                        obj.value = x.time
                        slots.push(obj)
                    })
                    this.setState({
                    data: response.data
                })
            })
            secPicker = lanes
            thirdPicker = slots
        }
        this.setState({
            restype: restype,
            secondoptions: secPicker,
            thirdoptions: thirdPicker
        })

    }

    filterCamp = (arr, camp, time) => {
        const { restype } = this.state;
        let newArr = []
        if (restype == 'tournament') {
            arr.map((x) => {
                if (x.campus.toLowerCase() == camp) {
                    newArr.push(x)
                }
            })
        } else if (restype == 'appointment') {
            console.log(camp);
            arr.map((x) => {
                if (x.place == camp) {
                    newArr.push(x)
                    console.log(x.place);
                }
            })
        } else if (restype == 'pool') {
            arr.map((x) => {
                if (x.lane == camp) {
                    newArr.push(x)
                }
            })
        }
        return newArr;
    }

    filterLanes = (arr, time) =>{
        let array = [];
        arr.map((x)=>{
            if(x.time == time){
                console.log(x);
                array.push(x)
            }
        })
        return array
    }

    secondPicker = (e, dat) => {
        const { restype, data } = this.state;
        let camp = dat.value;
        let campFiltered = [];
        if (restype == 'tournament') {
            campFiltered = this.filterCamp(data, camp);
        } else if (restype == 'appointment') {
            campFiltered = this.filterCamp(data, dat.value);
            console.log(campFiltered);
        } else if (restype == 'pool') {
            campFiltered = this.filterCamp(data, dat.value);
        }
        this.setState({
            campus: camp,
            campusFiltered: campFiltered
        })
    }

    thirdPicker = (e, dat) => {
        const { restype, selectedSport, campusFiltered, data, campus } = this.state;
        let sport = dat.value;
        let sportFiltered = [];
        if (restype == 'tournament') {
            let arr = this.filterCamp(data, campus);
            if (sport != 'racketsports') {
                arr.map((x) => {
                    if (x.name.toLowerCase() == sport) {
                        sportFiltered.push(x)
                    }
                })
            } else {
                arr.map((x) => {
                    if (x.name.toLowerCase() == sport) {
                        sportFiltered.push(x)
                    }
                })
            }
        } else if (restype == 'sportcourt') {
            axios.get("http://localhost:8082/" + sport)
                .then(response => this.setState({
                    data: response.data
                }))
        } else if (restype == 'pool'){
            let arr = this.filterLanes(campusFiltered, sport);
            console.log(arr);
            sportFiltered = arr;

        }
        this.setState({
            selectedSport: sport,
            campusFiltered: sportFiltered
        })
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    onClick = (x) => {
        const user = store.get("user")
        console.log(user);
        let obj = {}
        const { restype } = this.state;
        if (restype == "tournament") {
            obj = {
                name: x.name,
                campus: x.campus,
                teamquota: x.teamquota,
                team: "Agri",
                bilkentId: user.id,
                email: user.email,
                ge: true
            }
            axios.post("http://192.168.1.30:8082/enrollTournament", obj)
                .then(res => {
                    if (res.status == 200) {
                        alert(res.data);
                    }
                    else {
                        alert("You have already reserved that slot");
                    }
                }).catch(err => {
                    alert(err);
                });
        } else if (restype == "appointment") {
            alert("APPOINTMENT");
            obj = {
                'bilkentId': parseInt(user.id),
                'appointmentId': x.id,
                'name': x.name,
                'place': x.place,
                'time': x.time
            };
            axios.post("http://192.168.1.30:8082/makeAppointment", obj)
                .then(res => {
                    if (res.status == 200) {
                        alert("You have reserved that slot");
                    }
                    else {
                        alert(res.data)
                    }
                }).catch(err => {
                    alert(err);
                });
        } else if (restype == "pool") {
            obj = {
                'bilkentId': parseInt(user.id),
                'poolId': x.id,
            };
            axios.post("http://192.168.1.30:8082/reservePool", obj)
                .then(res => {
                    if (res.status == 200) {
                        alert("You have reserved lane " + x.lane);
                    }
                    else {
                        alert(res.data)
                    }
                }).catch(err => {
                    alert(err);
                });
        }

    }

    render() {
        console.log(this.state);
        const { data, restype, campusFiltered, secondoptions, thirdoptions } = this.state;
        return (
            <div>
                <MainLayout />
                <div className="coursemain">
                    <div className="maintext">Reservation</div>
                </div>
                <div className="options">
                    <div className="resoptions">
                        <Form.Select fluid label='Reservation Type' placeholder='Choose a Type' onChange={this.firstPicker}
                            options={resType} className="formres" />
                    </div>
                    {restype != 'sportcourt' ? <div className="resoptions">
                        <Form.Select fluid label={restype != 'pool' ? (restype == 'appointment' ? 'Place' : 'Campus') : 'Lane'} placeholder='Choose a Campus' onChange={this.secondPicker}
                            options={secondoptions} className="formres" />
                    </div> : <div></div>}
                    {restype != 'appointment' ? <div className="resoptions">
                        <Form.Select fluid label='Sports' placeholder='Choose a Sport' onChange={this.thirdPicker}
                            options={thirdoptions} className="formres" />
                    </div> : <div></div>}
                </div>
                <div className="layout">
                    <div className="rescontent1">
                        {
                            restype == 'tournament' ? (campusFiltered.length == 0 ? (<table className="table19" borderWidth="0">
                                {data.map((x) => {
                                    return (<tr>
                                        <td>{x.name} {this.Capitalize(restype)} <br></br>Campus : {x.campus}  <br></br> Team Quota : {x.teamquota}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>ENROLL&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                            ) : (<table className="table19" borderWidth="0">
                                {campusFiltered.map((x) => {
                                    return (<tr>
                                        <td>{x.name} {this.Capitalize(restype)} <br></br>Campus : {x.campus}  <br></br> Team Quota : {x.teamquota}</td>


                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>ENROLL&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                                )) : <div></div>
                        }
                        {
                            restype == 'appointment' ? (campusFiltered.length == 0 ? (<table className="table19" borderWidth="0">
                                {data.map((x) => {
                                    return (<tr>
                                        <td>{x.name}<br></br>Place : {x.place}  <br></br> Time : {x.time}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>RESERVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                            ) : (<table className="table19" borderWidth="0">
                                {campusFiltered.map((x) => {
                                    return (<tr>
                                        <td>{x.name}<br></br>Place : {x.place}  <br></br> Time : {x.time}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>RESERVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                                )) : <div></div>
                        }
                        {
                            restype == 'sportcourt' ? (campusFiltered.length == 0 ? (<table className="table19" borderWidth="0">
                                {data.map((x) => {
                                    return (<tr>
                                        <td>{x.name}<br></br>{x.courtNo}  <br></br> Time : {x.time}</td>
                                        <td>Availability : {x.available}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>RESERVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                            ) : (<table className="table19" borderWidth="0">
                                {campusFiltered.map((x) => {
                                    return (<tr>
                                        <td>{x.name}<br></br>Place : {x.place}  <br></br> Time : {x.time}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>RESERVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                                )) : <div></div>
                        }
                        {
                            restype == 'pool' ? (campusFiltered.length == 0 ? (<table className="table19" borderWidth="0">
                                {data.map((x) => {
                                    return (<tr>
                                        <td>{x.lane}<br></br>{x.quota}  <br></br> Time : {x.time}</td>
                                        <td>Availability : {x.available}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>RESERVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                            ) : (<table className="table19" borderWidth="0">
                                {campusFiltered.map((x) => {
                                    return (<tr>
                                        <td>{x.lane}<br></br>Quota: {x.quota}  <br></br> Time : {x.time}</td>
                                        <td>
                                            <Button primary size="20px" id="add" onClick={() => this.onClick(x)}>RESERVE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                                )) : <div></div>
                        }
                    </div>




                </div>
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
