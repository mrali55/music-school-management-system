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
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }



    render() {
        let self = this;
        console.log('profile: ', this);
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <img src={'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}/>
                    <h1>Name</h1>
                </div>
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

                <div>
                    <Button onClick={this.openModal}> Add Student</Button>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                   <AddStudentComponent handleAddStudent={this.props.handleAddStudent}/>
                </Modal>
            </div>
        )
    }

}



export default ProfileComponent;