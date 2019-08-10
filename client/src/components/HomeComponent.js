import React , {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavLink} from "react-router-dom";
import styles  from "../assets/css/home.css"
import deviderStyles  from "../assets/css/deviders.scss"
import FooterComponent from "./FooterComponent";


class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            teachers:[]
        };
        this.a={ test:{'backgroundColor':'red'}};
    }

    async componentDidMount() {
        let teachers= await this.props.getTeachers();
        this.setState({teachers:teachers.slice(0,2)});
    }


    render() {
        console.log('styles : ', styles.menuItem)
        return (
            <Container>
                <Row>
                    <Col className={styles.mastheadMain}>
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
                            <NavLink className={styles.menuItem} exact to="/">
                                 <Col > Home </Col>
                            </NavLink>

                            <NavLink className={styles.menuItem}  to="/users">
                                <Col >Users</Col>
                            </NavLink>

                            <NavLink className={styles.menuItem }  to="/signup">
                                <Col >Sign Up </Col>
                            </NavLink>
                            <NavLink className={styles.menuItem}  to="/add-course">
                                <Col >Add Course </Col>
                            </NavLink>
                            <NavLink className={styles.menuItem}  to="/add-teacher">
                            <Col >Add Teacher </Col>
                        </NavLink>
                            <NavLink className={styles.menuItem}  to="/teachers">
                                <Col >Teachers </Col>
                            </NavLink>
                        </Row>
                    </Container>
                </Row>

                <h2 className="divider line glow" contentEditable>Special Offer</h2>
                <Row>
                    <NavLink className={styles.mastheadOffer} to="/CourseInfo">

                    </NavLink>
                </Row>

                <h2 className="divider line glow" contentEditable>About</h2>
                <Row>
                    <Container className="title">
                        About The School
                    </Container>
                    <div className={styles.infoText}>
                        The school was founded in 2015, with on teacher only and a few students learning to play some music an the teachers house, now, 4 years later we have 4 teachers and tens of students.
                        the Lessons now takes place in the Matnas building.
                        We are now building a web application to manage our system and almost all the process we have in order to make it more easy for us and for our participants to join and to track there progress, all from the web app!
                    </div>
                </Row>

                <h2 className="divider line glow" contentEditable>Our Teacher</h2>

                <Row>
                    <Container className="title">
                        Meet Our Teachers
                    </Container>
                    <div className={styles.infoInline}>
                        {this.state.teachers.map((teacher)=>
                            <div className={styles.infoItem}>
                                <img className={styles.iconImg} src={'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}/>
                                <h4>{teacher.name}</h4>
                                {teacher.instruments.map((inst)=>
                                    <h8>{inst} </h8>
                                )}
                            </div>
                        )}


                    </div>
                </Row>


            </Container>



        );
    }

}



export default HomeComponent;