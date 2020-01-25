import React , {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Loader from 'react-loader-spinner'
import AddStudentComponent from "./AddStudentComponent";
import style from '../assets/css/signup.module.css'
import MessageComponent from "./subComponents/messageComponent";

class SignUpComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            status:'ready',
            showAddStudent:true
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.afterSubmit=this.afterSubmit.bind(this);
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
            instruments: checkedItems,
            role:"student"
        };
        this.props.handleAddUser(data,this.afterSubmit);

    }

    afterSubmit(status){
        this.setState({status:status});
    }

    render(){
        return(
            <div>

                {this.state.status==="ready" &&
                    <div>
                        <div className={style.title}>
                            <span>Sign Up</span>
                            <div>Enter Your Details To Sign Up As A User</div>
                        </div>
                        <Form id="sign-up" onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="name" type="name" placeholder="Name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Email
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="email" type="email" placeholder="Email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPhone">
                                <Form.Label column sm={2}>
                                    Phone
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="phone" type="phone" placeholder="Phone" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Password
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="password" type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="checkbox">
                                <Form.Label column sm={2}>
                                    Instruments
                                </Form.Label>
                                <Col className={'bordered'}>
                                    <Form.Check inline  column sm={6} type="checkbox" name="Guitar" label="Guitar" />
                                    <img src={require('../assets/css/images/guitar.png')}/>
                                </Col>
                                <Col className={'bordered'}>
                                    <Form.Check inline column sm={6} type="checkbox" name="Oud" label="Oud" />
                                    <img src={require('../assets/css/images/banjo.png')}/>
                                </Col>
                                <Col className={'bordered'}>
                                    <Form.Check inline column sm={6} type="checkbox" name="Violin" label="Violin" />
                                    <img src={require('../assets/css/images/cello.png')}/>
                                </Col>
                                <Col className={'bordered'}>
                                    <Form.Check inline column sm={6} type="checkbox" name="Darbuka" label="Darbuka" />
                                    <img src={require('../assets/css/images/tabla.png')}/>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button id="btn_submit" type="submit">Sign Up</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
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
                <MessageComponent
                    title={'Registered Successfully'}
                    home={true}
                />
                }

                {this.state.status === "error" &&
                <MessageComponent
                    title={'Something Went Wrong, Try Again!'}
                    home={true}
                />
                }


            </div>
        );
    }

}



export default SignUpComponent;