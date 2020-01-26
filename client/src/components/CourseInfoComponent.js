import React , {Component} from 'react';
import '../App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Loader from "react-loader-spinner";
import Button from "react-bootstrap/Button";
import ToggleComponent from './subComponents/toggleComponent';
import style from '../assets/css/courseInfo.module.css';
import Modal from 'react-modal';
import AddStudentComponent from "./AddStudentComponent";
import UsersComponent from "./UsersComponent";
import EditCourse from "./EditCourse";
import StudentsToEnroll from "./subComponents/StudentsToEnroll";
import EnrollCourseComponent from "./EnrollCourseComponent";
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

class CourseInfoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(mode) {
        this.setState({
            modalIsOpen: true,
            mode
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }



    async getCourse(id){
        let course= await this.props.getCourseById(id);
        this.setState({
            course,
            modalIsOpen: false
        });
    }



    render() {
        let course=this.state.course || this.props.currentCourse;
        //let course={"studentsData":[],"time":[],"students":["5d11b7fb5042863274bd7588"],"_id":"5d11bad9c80c0b38f413aac3","name":"guitar 1","instrument":"Guitar","level":"1","room":"2","__v":0};
        let isAdmin=this.props.currentUser && this.props.currentUser.role==='admin';
        console.log('course: ', course);

        console.log('this.state.mode: ', this.state.mode);
        return (
            <div>
                <Container>
                    {course &&
                    <div>
                    <div>
                        All the available courses are shown below
                    </div>
                    <div>
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
                                {isAdmin && <td>Edit</td>}
                                {isAdmin && <td>Delete</td>}
                                {!isAdmin && <td>Actions</td>}

                            </tr>
                            <tr>
                                <td>{course.name}</td>
                                <td>{course.instrument}</td>
                                <td>2500</td>
                                <td>20.09.2019</td>
                                <td>20.10.2019</td>
                                <td>{course.teacher && course.teacher.name}</td>
                                <td>
                                    <span>Total of {course.students && course.students.length}</span>
                                    {isAdmin && <ToggleComponent studentsData={course.studentsData || [1,2]}/>}
                                </td>
                                <td>{course.note}</td>
                                {isAdmin && <td><Button onClick={()=>this.openModal('edit')}>Edit</Button></td>}
                                {isAdmin && <td><Button variant="danger">Delete</Button></td>}
                                {this.props.currentUser && !isAdmin && <td><Button variant="success" onClick={()=>this.openModal('enroll')}>Enroll</Button></td>}

                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    </div>}
                    {!course &&
                        <div>
                            Something went wrong. Try Again!
                        </div>

                    }


                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <button onClick={()=>this.getCourse(course._id)}>close</button>
                        {this.state.mode==='edit' && <EditCourse
                            course={course}
                            editCourse={this.props.editCourse}
                            getTeachers={this.props.getTeachers}
                        />}
                        {this.props.currentUser && this.state.mode==='enroll' && <EnrollCourseComponent enrollCourse={this.props.enrollCourse} currentCourse={course} currentUser={this.props.currentUser}/>}
                    </Modal>
                </Container>
            </div>
        )
    }

}



export default CourseInfoComponent;