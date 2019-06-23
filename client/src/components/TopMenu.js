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
               <>
                   <Navbar bg="dark" variant="dark">
                       <Navbar.Brand href="/">Home</Navbar.Brand>
                       <Nav className="mr-auto">
                           <NavLink  exact to="/users" href="home">Users</NavLink><Sep/>
                           <NavLink  exact to="/login" href="home">Log in</NavLink><Sep/>
                           <NavLink  exact to="/signup" href="home">Sign Up</NavLink><Sep/>
                       </Nav>
                   </Navbar>
                   <br />
               </>;
           </div>
        )
    }

}



export default TopMenu;