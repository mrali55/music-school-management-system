import React , {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopMenu from "./TopMenu";
import Changer from "./Changer";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";


class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            items:[{title:'Home' , location:"home"},{title:'Teacher' , location:"teacher"}, {title:'Students' , location:"users"}]
        };
        this.name='home';
        this.triggerPage.bind(this);


    }

    triggerPage(location) {
        console.log(location)
        this.props.switchHandler(location);
    }


    render() {
        console.log('RRRRRRRRRRRRRRRR')
        let self=this;
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


                        </Row>
                        <Row>
                            <Col className="menu-item">
                                <NavLink exact to="/">Home</NavLink>

                            </Col>
                            <Col className="menu-item">
                                <NavLink  to="/users">Users</NavLink>
                            </Col>
                            <Col className="menu-item">
                                <NavLink  to="/signup">Sign Up</NavLink>
                            </Col>
                        </Row>

                    </Container>
                </Row>
            </Container>


        );
    }

}



export default HomeComponent;