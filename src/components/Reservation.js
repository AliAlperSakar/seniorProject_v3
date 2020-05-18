import React, { Component } from 'react'
import MainLayout from '../layouts/MainLayout'
import '../css/reservation.css'
import { Form, Divider, Button, Icon, Select } from 'semantic-ui-react'
import { SocialMediaIconsReact } from 'social-media-icons-react';
const restype = [
    { key: 'a', text: 'Appointment', value: 'appointment' },
    { key: 's', text: 'Sport Court', value: 'sport' },
    { key: 't', text: 'Tournaments', value: 'tournament' },
    { key: 'p', text: 'Pool', value: 'pool' },

]
const campusoptions = [
    { key: 'm', text: 'Main Campus', value: 'main' },
    { key: 'e', text: 'East Campus', value: 'east' },
   

]
const sportoptions = [
    { key: 'b', text: 'Basketball', value: 'basketball' },
    { key: 'f', text: 'Football', value: 'football' },
    { key: 'v', text: 'Volleyball', value: 'volleyball' },
    { key: 'r', text: 'Racket Sports', value: 'racket' },

]

export default class Reservation extends Component {
    render() {
        return (
            <div>
                <MainLayout />
                <div className="coursemain">
                    <div className="maintext">Reservation</div>
                </div>
                <div className="options">
                <div className="resoptions">

                    <Form.Select fluid label='Reservation Type' placeholder='Choose a Type' onChange={this.handleChange}
                        options={restype} className="formres" />

                </div>
                <div className="resoptions">

                    <Form.Select fluid label='Campus' placeholder='Choose a Campus' onChange={this.handleChange}
                        options={campusoptions} className="formres" />

                </div>
                <div className="resoptions">

                    <Form.Select fluid label='Sports' placeholder='Choose a Sport' onChange={this.handleChange}
                        options={sportoptions} className="formres" />

                </div>
           </div>
            <div className="layout">

            <div className="rescontent1">
                        <table className="table19" borderWidth="0">
<tr>
    <td></td>
</tr>
                            <tr>
                                <td>Id:1<br></br> Reservation Type: Appointment <br></br>Campus : Main  <br></br> Time Slot : 19:30 / 20:30</td>
                                <td><Button primary size="medium" id="edit" >UPDATE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                <Button primary size="20px" id="add" >ENROLL&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                </td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br> Reservation Type: Sport Court <br></br>Campus : East <br></br>Field : Football <br></br> Time Slot : 19:30 / 20:30</td>
                                <td><Button primary size="medium" id="edit" >UPDATE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                <Button primary size="20px" id="add" >ENROLL&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                </td>


                            </tr>
                            <tr>
                            <td>Id:1<br></br> Reservation Type: Pool <br></br>Campus : Main <br></br>Lane : 1 <br></br> Time Slot : 19:30 / 20:30</td>
                                <td><Button primary size="medium" id="edit" >UPDATE&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="edit outline" /></Button>
                                <Button primary size="20px" id="add" >ENROLL&nbsp;&nbsp;&nbsp;&nbsp;<Icon style={{ margin: "0px" }} name="plus" /></Button>
                                </td>


                            </tr>
                            <tr>
                                <td></td>
                            </tr>





                        </table>

                    </div>

      


            </div>
            <div className="footer">
            <footer style={{  textAlign:"center",width: "100%", paddingTop: "30px", paddingBottom: "30px", marginBottom: "50px", marginTop: "30px", backgroundColor: "#dadce8" }}>
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,186,223,1)" iconSize="5" roundness="50%" url="https://twitter.com/BilkentUniv" size="30" />&nbsp;&nbsp;&nbsp;
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,90,223,1)" iconSize="5" roundness="50%" url="https://tr-tr.facebook.com/pages/Bilkent-Yurtlar-Spor-Salonu/277203525641805" size="30" />&nbsp;&nbsp;&nbsp;
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="youtube" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(251,31,0,1)" iconSize="5" roundness="50%" url="https://www.youtube.com/user/BilkentUniversitesi" size="30" />&nbsp;&nbsp;&nbsp;
							<SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="instagram" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(248,87,0,1)" iconSize="5" roundness="50%" url="http://instagram.com/bilkentuniv" size="30" />
						</footer>
						<p class="copyright" style={{marginBottom:"50px",textAlign:"center"}}>Copyright ©  Bilkent University. All Rights Reserved</p>
            </div>
             </div>
        )
    }
}
