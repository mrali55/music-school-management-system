import React , {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Loader from 'react-loader-spinner'
import AddStudentComponent from "./AddStudentComponent";
import { Redirect } from "react-router-dom";
import loginStyle from '../assets/css/login.module.css';
import MessageComponent from "./subComponents/messageComponent";

class LoginComponent extends Component{
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
        let form=document.querySelector('#login');
        const data = {
            email:form.elements.email.value,
            password:form.elements.password.value
        };
        this.props.handleLogin(data,this.afterSubmit);

    }

    afterSubmit(status){
        this.setState({status:status});
    }

    render(){
        console.log('style ', loginStyle.main_container);
        if (this.state.status==='done' || this.props.currentUser) {
            return <Redirect to='/'/>;
        }
        return(
            <div className={loginStyle.main_container}>
                {this.state.status === "error" &&
                <MessageComponent
                    title={'Incorrect Information, Try Again!'}
                />
                }

                {(this.state.status==="ready" || this.state.status==="error") &&
                <Form id="login" onSubmit={this.handleSubmit}>


                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="email" type="email" placeholder="Email" />
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



                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button id="btn_submit" type="submit">Log In</Button>
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






            </div>
        );
    }

}



export default LoginComponent;