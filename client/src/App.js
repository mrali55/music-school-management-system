import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter , Route , withRouter } from 'react-router-dom';
import HomeComponent from "./components/HomeComponent";
import UsersComponent from "./components/UsersComponent";
import FormComponent from "./components/FormComponent";
import axios from "axios";
import AddCourseComponent from "./components/AddCourseComponent";
import LoginComponent from "./components/LoginComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.state={color:'default' ,
        active:"home",
        items:[{title:'Home' , location:"home"},{title:'Teacher' , location:"teacher"}, {title:'Students' , location:"users"}]
    };
    this.users=[{name:'Mustafa Ali', inst:'Guitar'},{name:'Cristiano Ronaldo', inst:'Violin'},{name:'Bob Marley', inst:'Guitar'}];
    this.switchPage.bind(this);
    this.getUsers=this.getUsers.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
  }

    componentDidMount=function() {
      let sticky=false;
        window.addEventListener('scroll', function(){
            if(window.scrollY >80) {
                document.querySelector('.top-menu-holder').className += " shrink ";
                sticky=true;
            }
            else if(sticky && document.querySelector('.top-menu-holder')){
                document.querySelector('.top-menu-holder').classList.remove("shrink");
            }
        });

    };

  login=(user , callback)=>{
      console.log('USER DATA => ',user);
      axios.post("/api/users/login", user)
          .then(()=>callback())
          .catch(error=> console.log('Error happened ! '+error));
  };

    addStudent = (student,callback) => {

        axios.post("/api/student", student)
            .then(()=>callback())
            .catch(error=> console.log('Error happened ! '+error));
    };

    addUser = (user,callback) => {
        axios.post("/api/users", user)
            .then(()=>callback())
            .catch(error=> console.log('Error happened ! '+error));
    };

    deleteUser = (id,callback,i) => {
        axios
            .delete(`/api/users/${id}`)
            .then(res =>
                callback(i)
            )
            .catch(error=> console.log('Error happened ! '+error));
    };




    async getUsers(){
        let users=await this.getData('/api/users');
        return users;
    }

    async getData(url){
        return await axios.get(url)
            .then((res)=> {
                return res.data});
    }




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

            <div>
                sdfsdf
            <div className={'panel container'}>
            <BrowserRouter>
                <div className="top-menu-holder fixed-top">
                    <Container>
                        <Row>
                            <Col>
                                <TopMenu  mystyle={this.state.color} context={'HELLO WORLD!'} color={'red'}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Route exact path="/" component={HomeComponent} />
                <Route  path="/users"  render={() => <UsersComponent getUsers={this.getUsers} deleteUser={this.deleteUser}/>}  />
                <Route  path="/signup"  render={() => <FormComponent handleAddStudent={this.addStudent} handleAddUser={this.addUser}/>} />
                <Route  path="/add-course"  render={() => <AddCourseComponent/>} />
                <Route  path="/login"  render={() => <LoginComponent handleLogin={this.login}/>} />
            </BrowserRouter>
            </div>
            </div>
        </div>



    );
  }
}

export default App;
