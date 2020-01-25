import React ,{Component} from 'react'
import StudentsToEnroll from "./subComponents/StudentsToEnroll";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import style from '../assets/css/EnrollCourse.module.css';
import ListGroup from "react-bootstrap/ListGroup";


class EnrollCourseComponent extends Component{
    constructor(props) {
        super(props);
        this.state={
            step:1
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let form=document.querySelector('#enroll');
        console.log('Students to enroll | handleSubmit ',studentsToEnroll);

        let checkedItems=Array.prototype.filter.call(form.elements.checkbox.length ? form.elements.checkbox : [form.elements.checkbox],(el)=> {
            if(el.checked){
                return el.name
            }
            return false;
        });
        checkedItems=Array.prototype.map.call(checkedItems,(el)=> el && el.name);
        let studentsToEnroll= Array.prototype.filter.call(this.props.currentUser.students,(el)=>checkedItems.indexOf(el._id)>-1)
        console.log('Students to enroll: ',studentsToEnroll);
        if(checkedItems.length){
            this.setState({
                step:2,
                studentsToEnroll
            })}
    };

    handleEnroll=()=>{
        this.props.enrollCourse(this.props.currentCourse._id,Array.prototype.map.call(this.state.studentsToEnroll,(el)=>el._id));
        this.setState({step:3});
    };



    render() {
        return (
            <Container className="masthead ">
                <div className={style.main_container}>
                    {this.state.step===1 &&
                        <div className={style.students_list}>
                            <span className={'sub-title'}>Select Students You Want To Enroll To This Course:</span>
                            <Form onSubmit={this.handleSubmit} id="enroll">
                                <Form.Group  controlId="checkbox">
                                {this.props.currentUser.students.map((student)=>
                                    <div >
                                        <Form.Check className={style.name} inline name={student && student._id} label={student && student.name} type={'checkbox'} />
                                    </div>
                                )}
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button id="btn_submit" type="submit">Next</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    }
                    {this.state.step === 2 &&
                     <div className={style.students_list}>
                         <span className={'s-title'}>
                             You have selected the following students:
                         </span>
                         <ListGroup>
                         {this.state.studentsToEnroll.map((student,index)=>
                             <ListGroup.Item variant="dark">{index+1}. {student.name}</ListGroup.Item>
                         )}
                         </ListGroup>

                         <div>
                             <span>
                                 Total amount would be:
                             </span>
                         </div>
                         <Button variant={'success'} onClick={this.handleEnroll}>Enroll</Button>
                      </div>
                     }
                    {this.state.step === 3 &&
                    <div className={'sub-title'}>
                        Course Enrolled successfully! We will contact you soon!
                    </div>
                    }
                </div>
            </Container>
        );
    }

}

export default EnrollCourseComponent;
