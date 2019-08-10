import React , {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import {BrowserRouter, NavLink} from "react-router-dom";
import style from "../assets/css/profile.css"

class ProfileComponent extends Component {

    constructor(props) {
        super(props);

    }



    render() {
        let self = this;
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <img src={'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}/>
                    <h1>Name</h1>
                </div>
                <div className={style.content}>
                    <h4>Students</h4>
                    <div className={style.studentsContainer}>
                    {[{name:'Mustafa'}].map((student)=>
                        <div className={style.student}>
                            <p className={style.name}>{student.name}</p>
                        </div>
                    )}
                    </div>
                </div>

                <div>
                    <Button> Add Student</Button>
                </div>
            </div>
        )
    }

}



export default ProfileComponent;