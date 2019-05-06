import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import Changer from './components/Changer';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter , Route , NavLink } from 'react-router-dom';
import HomeComponent from "./components/HomeComponent";
import UsersComponent from "./components/UsersComponent";
import FormComponent from "./components/FormComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.state={color:'default' ,
        active:"home",
        items:[{title:'Home' , location:"home"},{title:'Teacher' , location:"teacher"}, {title:'Students' , location:"users"}]
    };
    this.users=[{name:'Mustafa Ali', inst:'Guitar'},{name:'Cristiano Ronaldo', inst:'Violin'},{name:'Bob Marley', inst:'Guitar'}];
    this.switchPage.bind(this);
    this.locMap={home:HomeComponent,users:UsersComponent};
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

    };





  change(col){
    console.log(col)
    this.setState({color:col});
  }

  switchPage(location){
        console.log(location)
        this.setState({active:location});
  }

  render() {
    let self=this;
    const triggerPage = this.triggerPage;
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
            <div>
                sdfsdf
            <div className={'panel container'}>
            <BrowserRouter>
                <Route exact path="/" component={HomeComponent} />
                <Route exact path="/users" component={UsersComponent} />
                <Route exact path="/signup" component={FormComponent} />
            </BrowserRouter>
            </div>
            </div>
        </div>



    );
  }
}

export default App;
