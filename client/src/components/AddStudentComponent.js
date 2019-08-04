import React , {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Loader from 'react-loader-spinner'

class AddStudentComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            status:'ready'
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.afterSubmit=this.afterSubmit.bind(this);
    }

    handleSubmit(event){
        this.setState({status:'loading'});
        event.preventDefault();
        let form=document.querySelector('#add-student');
        let checkedItems=Array.prototype.filter.call(form.elements.checkbox,(el)=> {
            if(el.checked){
                return el.name
            }
            return false;
        });
        checkedItems=Array.prototype.map.call(checkedItems,(el)=> el && el.name);
        const data = {
            name:form.elements.name.value,
            instruments: checkedItems
        };
        console.log(data);
        this.props.handleAddStudent(data,this.afterSubmit);

    }

    afterSubmit(){
        this.setState({status:'done'});
    }

    render(){
        console.log(this);
        return(
            <div>
                {this.state.status==="ready" &&
                <Form id="add-student" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="name" type="name" placeholder="Name" />
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



export default AddStudentComponent;