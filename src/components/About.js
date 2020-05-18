import React, { Component } from 'react'
import MainLayout from '../layouts/MainLayout'
import "../css/about.css";
import tournamentmin from '../images/fotos/spor1-min.jpg'
import tournamentmin1 from '../images/fotos/spor10-min.jpg'
import tournamentmin2 from '../images/fotos/spor4-min.jpg'
import { SocialMediaIconsReact } from 'social-media-icons-react';




export default class About extends Component {
    render() {
        return (
            <div>
            <MainLayout/>
                <div className="coursemain">
                  <div className="maintext">About</div>
                </div>
                <div className="maindivabout" >
                <div>
                <div className="aboutmain">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our Mission is to provide the Bilkent University students with
                 quality physical education, sports and fitness programs and an environment in which they can 
                 participate in variety of activities, team and individual sports and games while getting in shape and staying active all year long.
               
             
                
                 </div> 
                
                <div className="imgabout">
                <img className='imgabout1' src={tournamentmin} />
                <img className='imgabout1' src={tournamentmin1} />
                <img className='imgabout1' src={tournamentmin2} />
                </div>
                </div>
                
                <div className="centerpersonnel">
                    Center Personnel
                </div>
                <hr class="solid" width="90%"></hr>
                 <div className="center1" align="center">
               
                <table className="table12" borderWidth="0">
                    <tr>
                        <td><b>Ahsen Küçükdurmaz</b></td>
                        <td>Director</td>
                        <td><a href="mailto:ahsen@bilkent.edu.tr">ahsen@bilkent.edu.tr</a></td>
                    </tr>
                    <tr>
                        <td><b>K. Koray Şeşenoğlu</b></td>
                        <td>Sports Facilities and Swimming Pool Technical Supervisor</td>
                        <td><a href="mailto:kkoray@bilkent.edu.tr">kkoray@bilkent.edu.tr</a></td>
                    </tr>
                    <tr>
                        <td><b>Orhan Saffetoğlu</b></td>
                        <td>Main Sports Hall Facilities Supervisor</td>
                        <td><a href="mailto:orhans@bilkent.edu.tr">orhans@bilkent.edu.tr</a></td>
                    </tr>
                    <tr>
                        <td><b>Ercan Turgut</b></td>
                        <td>East Sports Hall Facilities Supervisor</td>
                        <td><a href="mailto:tercan@bilkent.edu.tr">tercan@bilkent.edu.tr</a></td>
                    </tr>
                    <tr>
                        <td><b>Meral Erol</b></td>
                        <td>Administrative Assistant</td>
                        <td><a href="mailto:meralerol@bilkent.edu.tr">meralerol@bilkent.edu.tr</a></td>
                    </tr>
                    <tr>
                        <td><b>Fırat Bingöl</b></td>
                        <td>Fitness Trainer</td>
                        <td><a href="mailto:firatbi@bilkent.edu.tr">firatbi@bilkent.edu.tr</a></td>
                    </tr>
                    <tr>
                        <td><b>Elif İçke</b></td>
                        <td>Receptionist</td>
                        <td><a href="mailto:elificke@bilkent.edu.tr">elificke@bilkent.edu.tr</a></td>
                    </tr>
                </table>
                
                <div className="abouttext1">
                Part-time Sports Instructors: Qualified part-time sports instructors also work in the areas of aerobic/step, fitness/conditioning, martial arts and racket sports.
                </div>
                <div className="universityteam">
                    University Sports Teams
                </div>
                <hr class="solid" width="100%"></hr>
                <div className="uniteamtext">
                You may join the University Sports teams and compete in the Intercollegiate Championships.<br></br><br></br>

This is an opportunity to make friends, share the happiness of success and improve your health. 
Moreover, you may contribute to the image of Bilkent University by being an excellent and exemplary sportsperson.
                </div>
                <div className="uniteamlist">
                    <ul>   
    <li>American Football (Men)</li>
   <li>Archery (Women & Men)</li> 
   <li>Badminton (Women & Men)</li>
    <li>Basketball (Women & Men)</li>
    <li>Fencing (Women & Men)</li>
   <li>Football (Women & Men)</li>
    <li>Frisbee (Women & Men)</li>
    <li>Futsal (Women & Men)</li>
    <li>Handball (Men)</li>
    <li>Orienteering (Women & Men)</li>
    <li>Squash (Women & Men)</li>
    <li>Swimming (Women & Men)</li>
   <li>Table Tennis (Women & Men)</li> 
    <li>Taekwondo (Women & Men)</li>
   <li>Tennis (Women & Men)</li> 
    <li>Volleyball (Women & Men)</li>
    <li>Water Polo (Men)</li>

                    </ul>
                </div>
                <div className="hoursabout">
                 Hours of Operation for Facilities
                 </div>
                 <hr class="solid" width="100%"></hr>
                 <div className="hoursoperationabout">
                 Sports Center (Dormitories Sports Hall)<br></br>
Weekdays: 07:30 a.m. – 11:00 p.m.<br></br>
Weekends: 09:00 a.m. – 11:00 p.m.<br></br><br></br>

Swimming Pool (Monday closed)<br></br>
Weekdays: 08:00 a.m. – 10:15 p.m.<br></br>
Weekends: 09:00 a.m. – 10:15 p.m.<br></br><br></br>

Main Sports Hall<br></br>
Everyday: 08:30 a.m. – 10:00 p.m.<br></br><br></br>

East Sports Hall<br></br>
Everyday: 08:30 a.m. – 10:00 p.m.<br></br><br></br>

Outdoor Tennis Courts (Main / East)<br></br>
Everyday: 10:00 a.m. – 10:00 p.m.<br></br><br></br>

Indoor Tennis Courts (Main)<br></br>
Everyday: 10:00 a.m. – 10:00 p.m.<br></br><br></br>

Mini Football Fields (Main / East)<br></br>
Everyday: 10:00 a.m. – 11:00 p.m.<br></br><br></br>
                 </div>
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
