import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import Changer from './components/Changer';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class App extends Component {
  constructor(props) {
    super(props);
    this.state={color:'default'}
  }

    componentDidMount=function() {
      let sticky=false;
        window.addEventListener('scroll', function(){
            if(window.scrollY >80) {
                document.querySelector('.top-menu-holder').className += " shrink ";
                sticky=true;
            }
            else if(sticky){
                document.querySelector('.top-menu-holder').classList.remove("shrink");
            }
        });
    }

  change(col){
    console.log(col)
    this.setState({color:col});
  }

  render() {
    let self=this;
    return (
        <div className="main-container">
            <div className="top-menu-holder fixed-top">
                <Container>
                    <Row>
                        <Col>
                            <TopMenu parentState={self.state} mystyle={this.state.color} context={'HELLO WORLD!'} color={'red'}></TopMenu>
                            <div>
                                <Changer colorChange={this.change.bind(this)}></Changer>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container >
              <Row>

                <Col className="masthead " >
                  <div className="App">
                    <div className="intro-text">
                        WELCOME!
                    </div>
                      <Container className="title">
                          MUSIC SCHOOL

                      </Container>
                  </div>
                </Col>

              </Row>
              <Row>
                  <Container >
                      <Row>
                          <Col className="menu-item">
                              MAIN CONTAINER
                          </Col>
                          <Col className="menu-item">
                              MAIN CONTAINER
                          </Col>
                          <Col className="menu-item">
                              MAIN CONTAINER
                          </Col>
                      </Row>
                      <Row>
                          <Col className="menu-item">
                              MAIN CONTAINER
                          </Col>
                          <Col className="menu-item">
                              MAIN CONTAINER
                          </Col>
                          <Col className="menu-item">
                              MAIN CONTAINER
                          </Col>
                      </Row>

                  </Container>
              </Row>
            </Container>
        </div>


    );
  }
}

export default App;
