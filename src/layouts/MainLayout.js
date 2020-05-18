import React, { Component, Fragment } from "react";
import '../css/mainLayout.css';
import bilkentuniversity from '../images/fotos/bilkentuniversity.png'
import 'react-awesome-slider/dist/styles.css';
import bilkentImage from '../images/bilkentImage.png';
import { Link } from "react-router-dom";
import { Icon, Button } from 'semantic-ui-react';
import store from "store";
import { Menu, Dropdown } from "semantic-ui-react";


function ElementList(props) {
    const element = props.elements;
    const listItems = element.map((element) =>
        <li key={element.toLowerCase()}>
            <Link to={"/" +element.toLowerCase()=="home" ?"homepage":element.toLowerCase() } className="a">{element}</Link>
            {
                element.toLowerCase() == "tournaments" ?
                    // <Icon name="angle down" /> +
                    <div className="dropdiv">{dropdown}</div> : ""
            }
        </li>
    );
    return (
        <ul className="menu">{listItems}</ul>
    );
}

const options = [
    { key: 1, text: 'This is a super long item', value: 1 },
    { key: 2, text: 'Dropdown direction can help', value: 2 },
    { key: 3, text: 'Items are kept within view', value: 3 },
]

const dropdown = (
    <ul className="dropdown">
        <li>
            {/* <Icon name="futbol" /> */}
            <a href="/Tournaments/Football">Football Tournament</a>
        </li>
        <li>
            {/* <Icon name="basketball ball" />  */}
            <a href="/tournaments/football">Basketball Tournament</a>

        </li>
        <li>
            {/* <Icon name="volleyball ball" /> */}
            <a href="/tournaments/football">Volleyball Tournament</a>
        </li>
        <li>
            {/* <Icon name="volleyball ball" /> */}
            <a href="/tournaments/football">Racket Sports Tournament</a>
        </li>


    </ul>);

const elements = ["Homepage","Courses", "Reservations", "Tournaments", "Announcements","Events"];

class MainLayout extends Component {
    constructor() {
        super();
        this.state = {
            status: "",
            tag: "",
            isOn:false
        }
        this.click=this.click.bind(this)
    }

    componentDidMount() {
        const status = store.get("status");
        this.setState({
            status: status,
            tag: status
        })
    }

    click(){
        const is=this.state.isOn
        console.log("calisti")
        this.setState({isOn:!is})
    }
    render() {
        const { status, tag } = this.state;
        console.log(this.state.isOn)
        return (
            <div>
                <div className="megamenu">
                    <div className="container">
                        {/* <img className="site-logo2" src={bilkentuniversity} /> */}
                        
                        <ElementList elements={elements} />
                        <Button onClick={this.click} className="myAccount">{tag}</Button>
                       {this.state.isOn == true ?
                            <div className="adminPanel">
                                <ul>
                                    <Link to="/announcement/manage"><li>Manage Announcements</li></Link>
                                    <Link to="/event/manage"> <li>Manage Events</li></Link>
                                    <Link to="/reservation/manage"><li>Manage Reservations</li></Link>
                                    <Link to="/tournament/manage"><li>Manage Tournaments</li></Link>
                                    <Link to="/account/manage"><li>Manage Accounts</li></Link>
                                    <Link to="/appointment/manage"> <li>Manage Appointment</li></Link>
                                    <Link to="/authorize/staff"><li>Authorize Staff</li></Link>
                                </ul>
                            </div> :<div></div> }
                        
                    </div>

                </div>

            </div>
        )
    }
}

export default MainLayout;