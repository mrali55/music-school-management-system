import React , {Component} from 'react';
import '../App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Loader from "react-loader-spinner";
import Button from "react-bootstrap/Button";


class CourseInfoComponent extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {


    }


    render() {
        return (
            <div>
                <Container>
                    <div>
                        New Guitar Course is opening
                    </div>
                    <div>
                        <Table striped bordered hover variant="dark">
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
                                <td>Notes</td>
                            </tr>
                            <tr>
                                <td>Guitar Class 2019</td>
                                <td>Guitar</td>
                                <td>2500</td>
                                <td>20.09.2019</td>
                                <td>20.10.2019</td>
                                <td>Tom Hanx</td>
                                <td>Dont forget to bring your guitar</td>
                            </tr>
                            </tbody>
                        </Table>}
                    </div>
                </Container>
            </div>
        )
    }

}



export default CourseInfoComponent;