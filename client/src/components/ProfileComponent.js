import React , {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import {BrowserRouter, NavLink} from "react-router-dom";
import style from "../assets/css/profile.css"
import Modal from 'react-modal';
import AddStudentComponent from "./AddStudentComponent";
import ToggleComponent from "./subComponents/toggleComponent";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

Modal.setAppElement('#root');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            currentUser:{}
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSendMessage=this.handleSendMessage.bind(this);
    }

     componentDidMount() {
    }

    openModal(mode,course) {
        this.setState({
            modalIsOpen: true,
            mode,
            course
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
       // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSendMessage(){
        console.log('messageInput: ', this.messageInput);
        let message = this.messageInput.value;
        console.log('this.state.course._id,message: ', this.state.course._id,message);

        this.props.postMessage(this.state.course._id,message);

    }



    render() {
        let self = this;
        console.log('profile: this.props.currentUser.courses: ', this.props.currentUser);
        if(!this.props.currentUser){
            return(<div>Loading...</div>)
        }
        return (
            <div className={style.container}>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {this.state.mode==="addStudent" &&
                        <div>
                            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                            <button onClick={this.closeModal}>close</button>
                            <AddStudentComponent handleAddStudent={this.props.handleAddStudent}/>
                        </div>
                    }
                    {this.state.mode === "sendMessage" &&
                    <div>
                        <Form.Group as={Row} >
                            <Form.Label column sm={2}>
                                Message
                            </Form.Label>
                            <Col sm={12}>
                                <Form.Control ref={(messageInput)=>this.messageInput=messageInput} name="note" as="textarea" rows="3" />
                            </Col>
                        </Form.Group>
                        <Button variant="success" onClick={this.handleSendMessage}>Send</Button>
                    </div>
                    }

                    {this.state.mode === "viewMessages" &&
                    <div>
                        <Table className={style.students_table} striped bordered hover variant="dark">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Message</td>
                                <td>Date</td>
                            </tr>
                            {this.state.course.messages.map((message)=>
                                <tr>
                                    <td>{message.name}</td>
                                    <td>{message.date}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                    }

                        </Modal>


                <div className={style.header}>
                    <img src={'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}/>
                    <h1>{this.props.currentUser.name}</h1>
                </div>
                {this.props.currentUser.role==="student" &&
                    <div>
                        <div className={style.content}>
                            <h4>Students</h4>
                            <div className={style.studentsContainer}>
                                {this.props.currentUser.students.map((student)=>
                                    <div className={style.student}>
                                        <p className={style.name}>{student && student.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={style.content}>
                            <Button onClick={()=>this.openModal("addStudent")}> Add Student</Button>
                        </div>

                        <div className={style.content}>

                        </div>


                    </div>
                }
                {this.props.currentUser.role === "teacher" &&
                <div className={style.content}>
                    <h4>Courses</h4>
                    <div className={style.studentsContainer}>
                        {this.props.currentUser.courses.map((course)=>
                            <Table className={style.students_table} striped bordered hover variant="dark">
                                <thead>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Instrument</td>
                                    <td>Price</td>
                                    <td>Starting Date</td>
                                    <td>End Date</td>
                                    <td>Teacher</td>
                                    <td>Students</td>
                                    <td>Notes</td>
                                    <td>Message</td>
                                    <td>View Messages</td>

                                </tr>
                                <tr>
                                    <td>{course.name}</td>
                                    <td>{course.instrument}</td>
                                    <td>2500</td>
                                    <td>20.09.2019</td>
                                    <td>20.10.2019</td>
                                    <td>{course.teacher.name}</td>
                                    <td>
                                        <span>Total of {course.students && course.students.length}</span>
                                         <ToggleComponent studentsData={course.studentsData || [1,2]}/>
                                    </td>
                                    <td>{course.note}</td>
                                    <td><Button variant="success" onClick={()=>this.openModal('sendMessage',course)}>Send</Button></td>
                                    <td><Button variant="success" onClick={()=>this.openModal('viewMessages',course)}>View previous Messages</Button></td>



                                </tr>
                                </tbody>
                            </Table>
                        )}
                    </div>
                </div>
                }
                    </div>
        )
    }

}



export default ProfileComponent;