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

    handleLogout=()=>{
        this.props.logout();
    };



    render() {
        console.log('this.props.currentUser', this.props.currentUser);
        const Sep = () => <span className={style.navSep}> | </span>;
        let self = this;
        return (
           <div>
               <Navbar bg="dark" variant="dark">
                       <Navbar.Brand href="/">Home</Navbar.Brand>
                       <Nav className="mr-auto">
                           {this.props.currentUser && (this.props.currentUser.role==="admin" || this.props.currentUser.role==="admin") && <NavLink  exact to="/users" href="home">Users</NavLink>}
                           {!this.props.currentUser && <Sep/>}
                           {this.props.currentUser && <NavLink  exact to="/profile" href="profile">welcome {this.props.currentUser && this.props.currentUser.name}</NavLink> }<Sep/>
                           <NavLink  exact to="/courses" href="home">Courses</NavLink> <Sep/>
                           <NavLink  exact to="/teachers" href="home">Teachers</NavLink> <Sep/>
                           {!this.props.currentUser && <NavLink  exact to="/login" href="home">Log in</NavLink> }
                           {!this.props.currentUser && <Sep/>}
                           {!this.props.currentUser && <NavLink  exact to="/signup" href="home">Sign Up</NavLink> }
                           {this.props.currentUser && <a onClick={this.handleLogout}>Log Out</a>}
                       </Nav>
                   </Navbar>
                   <br />
           </div>
        )
    }

}



export default TopMenu;