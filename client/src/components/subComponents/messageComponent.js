import React from "react";
import style from "../../assets/css/message.module.css";
import {NavLink} from "react-router-dom";

export default function(props){
    return(
        <div className={style.main_container}>
            <span>{props.title}</span>
            <div>
                {props.login &&
                <NavLink className={style.primary_link + ' ' + style.link} exact to="/login" href="home">Log
                    In</NavLink>
                }
                {props.signup &&
                <NavLink className={style.secondry_link + ' ' + style.link} exact to="/signup" href="home">Sign
                    Up</NavLink>
                }
                {props.home &&
                <NavLink className={style.secondry_link + ' ' + style.link} exact to="/" href="home">Go To Home Page</NavLink>
                }
            </div>
        </div>
    );
}