import React , {Component} from 'react';
import '../App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";


class UsersComponent extends Component {

    constructor(props) {
        super(props);
        this.name='users';
        this.users=[{name:'Mustafa Ali', inst:'Guitar'},{name:'Cristiano Ronaldo', inst:'Violin'},{name:'Bob Marley', inst:'Guitar'}];
    }




    render() {
        let self = this;
        let {context}=this.props;
        return (
            <div>
                <Container className="masthead ">
                    <div>FFFFFFFFFFFFFFFFFFFFFFFFFFF</div>


                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Instrument</th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.users.map((user,i)=>
                            <tr>
                                <td>{i}</td>
                                <td>{user.name}</td>
                                <td>{user.inst}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }

}



export default UsersComponent;