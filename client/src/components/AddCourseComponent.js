import React , {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Loader from 'react-loader-spinner';
import DatePicker, {CalendarContainer} from 'react-datepicker';

class AddCourseComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            status:'ready',
            startDate:new Date(),
            endDate:new Date()
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.afterSubmit=this.afterSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleSubmit(event){
        this.setState({status:'loading'});
        event.preventDefault();
        let form=document.querySelector('#sign-up');
        let checkedItems=Array.prototype.filter.call(form.elements.checkbox,(el)=> {
            if(el.checked){
                return el.name
            }
            return false;
        });
        checkedItems=Array.prototype.map.call(checkedItems,(el)=> el && el.name);
        const data = {
            name:form.elements.name.value,
            email:form.elements.email.value,
            phone:form.elements.phone.value,
            password:form.elements.password.value,
            instruments: checkedItems
        }
        this.props.handleAddUser(data,this.afterSubmit);

    }

    afterSubmit(){
        this.setState({status:'done'});
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }



    render(){
        console.log(this)
        return(
            <div>
                {this.state.status==="ready" &&
                <Form id="add-course" onSubmit={this.handleSubmit}>
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
                            <Form.Control as="select">
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>















                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button id="btn_submit" type="submit">Sign Up</Button>
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



export default AddCourseComponent;