import React, { Component } from 'react';
import MainLayout from '../layouts/MainLayout';
import "../css/tournaments.css";
import basketbol from '../images/sporticons/basketball.png'
import futbol from '../images/sporticons/soccer.png'
import voleybol from '../images/sporticons/volleyball.png'
import racket from '../images/sporticons/tennis.png'
import tournamentmin from '../images/fotos/tournament1.jpg'
import { Link } from "react-router-dom";

import { SocialMediaIconsReact } from 'social-media-icons-react';
const images = [
    {
        photo: basketbol,
      
    },
    {
        photo: futbol,
     

    },
    {
        photo: voleybol,
      
    },
    {
        photo: racket,
       
    }
];

class Tournament extends Component {
    render() {
        return (
            <div>
                <MainLayout />
                <div className="coursemain">
                  <div className="maintext">Tournaments</div>
                </div>
             
                <div className="tourmain">
                   

                    {/* <img className='basketbol' src={basketbol} />
                    <img className='futbol' src={futbol} />
                    <img className='voleybol' src={voleybol} />
                    <img className='racket' src={racket} /> */}
                <div className="imgbackground">
            <div className="tournamentbg">
                <div className="contenttournament1">
               <a href="/tournaments/basketball"> <img className='basketbol' src={basketbol} />
                 <br></br> Basketball Tournament</a>
                

                </div>

                <div className="contenttournament2">
                
                 <a href="/tournaments/football"><img className='futbol' src={futbol} />
                <br></br> Football Tournament</a>
                </div>

                <div className="contenttournament3">
                <a href="/tournaments/volleyball"><img className='voleybol' src={voleybol} />
                <br></br>Volleyball Tournament</a>

                </div>

                <div className="contenttournament4">
               <Link to ="/tournaments/racketsports"> <img className='racket' src={racket} />
                <br></br>   Racket Sports Tournament</Link>
</div>
                </div>
                </div>
                <div className="page1"> </div>
                <div className="page2"></div>
               
               
            </div>
            <img className='tournament1' src={tournamentmin} />
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
        );
    }
}

export default Tournament;