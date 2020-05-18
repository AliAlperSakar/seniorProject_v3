import React, { Component } from 'react'
import MainLayout from '../layouts/MainLayout'
import annoucementlogo from '../images/fotos/announcement.png'
import axios from "axios";
import "../css/events.css";
import { Link } from "react-router-dom";
import deneme from '../images/fotos/Bbuilding.jpg';
import store from 'store';
import { SocialMediaIconsReact } from 'social-media-icons-react';


export default class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            announcement: [],
            bool: false
        }
        this.getAnnouncement = this.getAnnouncement.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8081/announcements")
            .then(response => this.setState({
                announcements: response.data
            }))

    }

    // componentDidUpdate(prevState){
    //     if (prevState.bool) {
    //         axios.get("http://localhost:8081/announcements/" + this.props.location.pathname.split("/")[2])
    //             .then(response => this.setState({
    //                 announcement: response.data
    //             }))
    //         console.log(this.state.announcement);

    //     }
    // }

    getAnnouncement() {
        this.setState({
            bool: true
        });
    }

    render() {
        const status = store.get("status");
        const { announcements } = this.state;
        const href = "/announcement/";
        console.log(status);
        if (status == "admin") {
            return (
                <div>
                    <MainLayout />
                    <div className="coursemain">
                  <div className="maintext">Events</div>
                </div>
                    <div className="announcement">
                        
                        {/* <div className="announce" >
                        <img className='announcementlogo' src={annoucementlogo} />
                    </div > */}
                        <div className="announceTable">
                            {/* <table className='table'>
                            <tbody>
                                <tr> */}
                            {/* <th>Image</th> <th> Content </th> <th > Date </th > </tr > */}
                            {announcements.map((x, index) =>
                                <div className='specialtr' style={{display:"inline-table"}} key={index} onClick={console.log("SADAS")} >
                                    <figure className="figuree"><img src={deneme} /></figure>
                                    <h3 className="h3announce"><Link to={href + index}>{x.text}</Link></h3>
                                    <p className="contentannounce">Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. </p>
                                </div>
                            )
                            }
                            {/* </tbody> */}
                            {/* </table > */}
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
        } else {



            return (
                <div>
                    <MainLayout />
                   
                    <div className="announcement">
                        {/* <div className="announce" >
                        <img className='announcementlogo' src={annoucementlogo} />
                    </div > */}
                        <div className="announceTable">
                            {/* <table className='table'>
                            <tbody>
                                <tr> */}
                            {/* <th>Image</th> <th> Content </th> <th > Date </th > </tr > */}
                            {announcements.map((x, index) =>
                                <div className='specialtr' key={index} onClick={console.log("SADAS")} >
                                    <figure className="figuree"><img src={deneme} /></figure>
                                    <h3><Link to={href + index}>{x.text}</Link></h3>
                                    <p>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. </p>
                                </div>
                            )
                            }
                            {/* </tbody> */}
                            {/* </table > */}
                        </div>

                    </div>
                    

                    
                </div>
                
                
            )
        }
    }
}
