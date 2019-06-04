import React , {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavLink} from "react-router-dom";
import home  from "../assets/css/home.css"


class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('RRRRRRRRRRRRRRRR')
        return (
            <Container>
                <Row>
                    <Col className=" ">
                        <div className="App">
                            <div className="intro-text">
                                WELCOME!
                            </div>
                            <Container className="title">
                                MUSIC SCHOOL
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Container>
                        <Row>
                            <NavLink className={home.menuItem + ' menu-item'} exact to="/">
                                 <Col > Home </Col>
                            </NavLink>

                            <NavLink className={home.menuItem + ' menu-item'}  to="/users">
                                <Col >Users</Col>
                            </NavLink>

                            <NavLink className={home.menuItem + ' menu-item'}  to="/signup">
                                <Col >Sign Up </Col>
                            </NavLink>
                            <NavLink className={home.menuItem + ' menu-item'}  to="/add-course">
                                <Col >Add Course </Col>
                            </NavLink>
                        </Row>
                    </Container>
                </Row>
            </Container>


        );
    }

}



export default HomeComponent;