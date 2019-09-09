import React , {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import {BrowserRouter, NavLink} from "react-router-dom";
import style from "../assets/css/topMenu.module.css"


class TopMenu extends Component {

    constructor(props) {
        super(props);

    }



    render() {
        console.log(style)
        const Sep = () => <span className={style.navSep}> | </span>;
        let self = this;
        return (
           <div>
               <Navbar bg="dark" variant="dark">
                       <Navbar.Brand href="/">Home</Navbar.Brand>
                       <Nav className="mr-auto">
                           <NavLink  exact to="/users" href="home">Users</NavLink><Sep/>
                           {!this.props.currentUser && <NavLink  exact to="/login" href="home">Log in</NavLink> }
                           {!this.props.currentUser && <Sep/>}
                           {!this.props.currentUser && <NavLink  exact to="/signup" href="home">Sign Up</NavLink> }
                           {this.props.currentUser && <NavLink  exact to="/profile" href="profile">welcome {this.props.currentUser && this.props.currentUser.name}</NavLink> }<Sep/>
                           {this.props.currentUser && <div>Log Out</div>}
                       </Nav>
                   </Navbar>
                   <br />
           </div>
        )
    }

}



export default TopMenu;