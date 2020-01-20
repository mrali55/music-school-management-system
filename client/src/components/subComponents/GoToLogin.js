import React from "react";
import loginStyle from "../../assets/css/login.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Loader from "react-loader-spinner";
import {NavLink} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function(){
    return(
        <div className={loginStyle.go_to_login}>
            <span>You Have To Login To Access This page!</span>
            <div>
                    <NavLink className={loginStyle.primary_link+' '+loginStyle.link} exact to="/login" href="home">Log In</NavLink>
                     or
                    <NavLink className={loginStyle.secondry_link+' '+loginStyle.link}  exact to="/signup" href="home">Sign Up</NavLink>
               {/* <a className={loginStyle.primary_link}>Log In</a> or <a className={loginStyle.secondry_link}>Sign Up</a>*/}
            </div>
        </div>
    );
}