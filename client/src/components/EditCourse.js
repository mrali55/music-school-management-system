import React , {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Loader from 'react-loader-spinner';
import DatePicker, {CalendarContainer} from 'react-datepicker';
import style from '../assets/css/editCourse.module.css';



class EditCourse extends Component{
    constructor(props){
        super(props);
        this.state={
            status:'ready',
            startDate:new Date(),
            endDate:new Date(),
            teachers:[]
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.afterSubmit=this.afterSubmit.bind(this);
        this.handleChangeEnd=this.handleChangeEnd.bind(this);
        this.handleChangeStart=this.handleChangeStart.bind(this);
        this.fillForm=this.fillForm.bind(this);

        this.course=this.props.course; //{"time":[],"students":["5d11b7fb5042863274bd7588"],"_id":"5d11bad9c80c0b38f413aac3","name":"guitar 1","instrument":"Guitar","level":"1","room":"2","__v":0};
        console.log('this.props.course: ', this.props.course);
        this.instrumentDefaultValue=this.course.instrument;
        this.teacherDefaultValue=this.course.teacher;



    }

    async componentDidMount() {
        let data=await this.props.getTeachers().then((res)=> {
            if(res.user==="unauthorized"){
                this.setState({status:'error'});
                console.log('unauthorized')
            }
            else{
                this.setState({teachers:res});
                console.log('data set | data:', res);
            }
        });
        this.fillForm(this.course);

    }

    fillForm(course){
        let form=document.querySelector('#edit-course');
        form.elements.name.value=course.name;
        form.elements.level.value=course.level;
        form.elements.room.value=course.room;
        //form.elements.startDate.value=course.startDate;
        //form.elements.endDate.value=course.endDate;
        form.elements.instrument=course.instrument;
        form.elements.teacher=course.teacher;

    }



    handleSubmit(event){
        this.setState({status:'loading'});
        event.preventDefault();
        let form=document.querySelector('#edit-course');
        const data = {
            _id:this.course._id,
            name:form.elements.name.value,
            level:form.elements.level.value,
            room:form.elements.room.value,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            instrument: form.elements.instrument.value || this.instrumentDefaultValue,
            note:form.elements.note.value
            //teacher: form.elements.teacher.value || this.teacherDefaultValue
        };
        console.log('data: ',data);
        this.props.editCourse(data,this.afterSubmit);


    }

    afterSubmit(){
        this.setState({status:'done'});
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }



    render(){
        console.log(this)
        return(
            <div className={style.edit_container}>
                {this.state.status==="ready" &&
                <Form id="edit-course" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="name" type="name" placeholder="Name" />
                        </Col>
                    </Form.Group>



                    <Form.Group as={Row} controlId="formHorizontalInstrument">
                        <Form.Label column sm={2}>
                            Instrument
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control  name="instrument" as="select" defaultValue={this.instrumentDefaultValue}>
                                <option>Choose...</option>
                                <option>Guitar</option>
                                <option>Violin</option>
                                <option>Oud</option>
                                <option>Darbuka</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalLevel">
                        <Form.Label column sm={2}>
                            Level
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="level" type="level" placeholder="Level" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalRoom">
                        <Form.Label column sm={2}>
                            Room
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="room" type="room" placeholder="Room" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalStart">
                        <Form.Label column sm={2}>
                            Start Date
                        </Form.Label>
                        <Col>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeStart}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEnd">
                        <Form.Label column sm={2}>
                            End Date
                        </Form.Label>
                        <Col>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleChangeEnd}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalTeacher">
                        <Form.Label column sm={2}>
                            Teacher
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control  name="teacher" as="select" defaultValue={this.teacherDefaultValue}>
                                <option>Choose...</option>
                                {this.state.teachers.map((teacher)=><option>{teacher.name}</option>)}

                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            Note
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control name="note" as="textarea" rows="3" />
                        </Col>
                    </Form.Group>














                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button id="btn_submit" type="submit">Save</Button>
                        </Col>
                    </Form.Group>
                </Form>
                }
                {this.state.status === "loading" &&
                <div className={"intro-text"}>
                    <Loader
                        className='intro-text'
                        type="Plane"
                        color="#00BFFF"
                        height="200"
                        width="200"
                    />
                </div>
                }

                {this.state.status === "done" &&
                <div className={'intro-text'}> Registered Successfully </div>
                }
            </div>
        );
    }

}



export default EditCourse;