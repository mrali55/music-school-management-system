import React , {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Loader from 'react-loader-spinner'
import AddStudentComponent from "./AddStudentComponent";

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

    afterSubmit(){
        this.setState({status:'done'});
    }

    render(){
        return(
            <div>
                {this.state.status==="ready" &&
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

                {this.state.status === "done" &&
                <div className={'intro-text'}> Registered Successfully </div>
                }

            </div>
        );
    }

}



export default LoginComponent;