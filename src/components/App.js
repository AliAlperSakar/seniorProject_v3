import React, { Component } from "react";
import HomePage from "../components/HomePage";
import {Button} from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Announcement from "./Announcement";
import Register from "./Register";
import Login from "./Login";
import Tournament from "./Tournament";
import Reservation from "./Reservation";
import Course from "./Course";
import Registered from "./Registered";
import FileUpload from "./FileUpload";
import '../css/app.css';
import manageAnnouncement from "./admin/manageAnnouncement";
import Football from "./Tournaments/Football";
import Basketball from "./Tournaments/Basketball";
import Volleyball from "./Tournaments/Volleyball";
import RacketSports from "./Tournaments/RacketSports";
import manageTournament from "./admin/manageTournaments";
import manageAccount from "./admin/manageAccount";
import manageReservation from "./admin/manageReservation";
import manageEvent from "./admin/manageEvent";
import Events from "./Events";
import Gallery from "./Gallery";
import About from "./About";
import manageAppointment from "./admin/manageAppointment";
import authorizeStaff from "./admin/authorizeStaff";


class App extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Reservation}/>
                        <Route path="/registered" component={Registered}/>
                        <Route path="/homepage" component={HomePage}/>
                        <Route path="/courses" component={Course}/>
                        <Route path="/tournaments" component={Tournament}/>
                        <Route path="/reservations" component={Reservation}/>
                        <Route path="/announcements" component={Announcement}/>
                        <Route path="/events" component={Events}/>
                        <Route path="/about" component={About}/>
                        <Route path="/gallery" component={Gallery}/>
                        <Route path="/announcement/manage" exact component={manageAnnouncement}/>
                        <Route path="/event/manage" exact component={manageEvent}/>
                        <Route path="/appointment/manage" exact component={manageAppointment}/>
                        <Route path="/announcement/manage/:id" component={manageAnnouncement}/>
                        <Route path="/account/manage" exact component={manageAccount}/>
                        <Route path="/tournament/manage" exact component={manageTournament}/>
                        <Route path="/reservation/manage" exact component={manageReservation}/>
                        <Route path="/authorize/staff" exact component={authorizeStaff}/>
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/homepage" exact component={HomePage} />
                        <Route path="/tournaments/football" exact component={Football} />
                        <Route path="/tournaments/basketball" exact component={Basketball} />
                        <Route path="/tournaments/volleyball" exact component={Volleyball} />
                        <Route path="/tournaments/racketsports" exact component={RacketSports} />
                        
                    </Switch>
                    {/* <MainLayout /> */}
                    {/* <Login /> */}
                </div>
            </Router>
        )
    }
}

const Home = () => (
    <div className="home">
        <h1>Home Page</h1>
        <Link to="/login"><Button primary size='huge'>Login</Button></Link>
        <Link to="/homepage"><Button primary size='huge'>Home Page</Button></Link>

    </div>
);

export default App;