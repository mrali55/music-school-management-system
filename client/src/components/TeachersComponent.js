import React , {Component} from 'react';
import '../App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Loader from "react-loader-spinner";
import Button from "react-bootstrap/Button";


class TeachersComponent extends Component {

    constructor(props) {
        super(props);
        this.state={users:null};
        this.handleDeleteTeacher=this.handleDeleteTeacher.bind(this);
        this.deleteTeacherCallback=this.deleteTeacherCallback.bind(this);
    }

    async componentDidMount() {
        let data=await this.props.getTeachers().then((res)=> {
            if(res.user==="unauthorized"){
                this.setState({users:'error'});
                console.log('unauthorized')
            }
            else{
                this.setState({users:res});
                console.log('data set | data:', res);
            }
        });


    }

    handleDeleteTeacher= (data,i)=>{
        console.log('User COMP ',data);
        this.props.deleteUTeacher(data,this.deleteTeacherCallback,i);
    };

    deleteTeacherCallback=(i)=>{
        let oldUsers=this.state.users;
        this.setState({users:oldUsers.slice(0,i).concat(oldUsers.slice(i+1,oldUsers.length))});

    };

    render() {
        console.log('stateeee ',this.state.users);
        return (
            <div>
                <div className={'center'}>
                    <span className={'sub-title'}> All The users in the database are shown below</span>
                </div>
                <Container className="masthead ">
                    {this.state.users!=='error' && <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>{}
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Instruments</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.users!=null && this.state.users.map && this.state.users.map((user,i)=>
                            <tr>
                                <td>{i}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.instruments.map((el=><span> {el} </span>))}</td>
                                <td> <Button variant="danger" onClick={()=>(this.handleDeleteUser(user._id,i))}>Delete</Button></td>
                            </tr>
                        )}

                        {this.state.users==null &&
                        <div className={"loader"}>
                            <Loader
                                className='intro-text'
                                type="Plane"
                                color="#00BFFF"
                                height="200"
                                width="200"
                            />
                        </div>
                        }



                        </tbody>
                    </Table>}
                    {this.state.users==='error' &&
                    <div className={"error"}>
                        Error Occurred !
                    </div>
                    }
                </Container>
            </div>
        )
    }

}



export default TeachersComponent;