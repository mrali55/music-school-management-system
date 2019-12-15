import React, {Component} from 'react';
import TopMenu from './components/TopMenu';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter, Route} from 'react-router-dom';
import HomeComponent from "./components/HomeComponent";
import UsersComponent from "./components/UsersComponent";
import FormComponent from "./components/FormComponent";
import axios from "axios";
import AddCourseComponent from "./components/AddCourseComponent";
import LoginComponent from "./components/LoginComponent";
import CourseInfoComponent from "./components/CourseInfoComponent";
import CoursesComponent from "./components/CoursesComponent";
import TeachersComponent from "./components/TeachersComponent";
import ProfileComponent from "./components/ProfileComponent";
import FooterComponent from "./components/FooterComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
        currentUser: null,
        color:'default' ,
        active:"home",
        items:[{title:'Home' , location:"home"},{title:'Teacher' , location:"teacher"}, {title:'Students' , location:"users"}]
    };
    this.users=[{name:'Mustafa Ali', inst:'Guitar'},{name:'Cristiano Ronaldo', inst:'Violin'},{name:'Bob Marley', inst:'Guitar'}];
    this.switchPage.bind(this);
    this.getUsers=this.getUsers.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
    this.getCourses=this.getCourses.bind(this);
    this.getTeachers=this.getTeachers.bind(this);
    this.getStudents=this.getStudents.bind(this);

  }

    componentDidMount() {
      console.log('app - did mount')
        this.isLoggedIn();
      let sticky=false;
        window.addEventListener('scroll', function(){
            if(document.querySelector('.top-menu-holder').className.indexOf("shrink")===-1 && window.scrollY >80 ){
                document.querySelector('.top-menu-holder').className += " shrink ";
                sticky=true;
            }
            if(window.scrollY <=80 && sticky && document.querySelector('.top-menu-holder')){
                document.querySelector('.top-menu-holder').classList.remove("shrink");
            }
        });
    };





  isLoggedIn=()=>{
      axios.get("/api/users/check-login")
          .then((res)=>{
              console.log('is logged in res:', res);
              this.setState({currentUser:res.data});
          })
          .catch(error=> console.log('Error happened! | isloggedin '+error));
  };

  login=(user , callback)=>{
      let self=this;
      console.log('USER DATA => ',user);
      axios.post("/api/users/login", user)
          .then((res)=>{
              self.setState({currentUser:res.data});
              return callback()
          })
          .catch(error=> console.log('Error happened ! '+error));
  };

    getCurrentUser=()=>{
        axios.get("/api/users/current-user")
            .then((res)=>{
                console.log('is logged in res:', res);
                this.setState({currentUser:res.data});
            })
            .catch(error=> console.log('Error happened! | isloggedin '+error));
    };

    addStudent = (student,callback) => {
        let self=this;
        axios.post("/api/users/students", student)
            .then((res)=>{
                setTimeout(self.isLoggedIn,500);
                callback()})
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

    async getStudents(){
        return this.state.currentUser.students;
        //return await this.getData('/api/students');
    }

    async getTeachers(){
        let teachers=await this.getData('/api/users/teachers');
        return teachers;
    }

    addTeacher = (user,callback) => {
        user.role='teacher';
        axios.post("/api/users", user)
            .then(()=>callback())
            .catch(error=> console.log('Error happened ! '+error));
    };

    async getData(url){
        return await axios.get(url)
            .then((res)=>res.data);
    }

    addCourse = (course,callback) => {
        axios.post("/api/courses/add", course)
            .then(()=>callback())
            .catch(error=> console.log('Error happened ! '+error));
    };

    async getCourses(){
        let courses=await this.getData('/api/courses');
        return courses;
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
    console.log('app rendered | state: ',this.state);
    return (

        <div className="main-container">

            <div>
            <div className={'panel container'}>
            <BrowserRouter>
                <div className="top-menu-holder fixed-top">
                    <Container>
                        <Row>
                            <Col>
                                <TopMenu  mystyle={this.state.color} context={'HELLO WORLD!'} color={'red'} checkLogin={this.isLoggedIn} currentUser={this.state.currentUser}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="content-container">
                    <Route exact path="/" render={() => <HomeComponent getTeachers={this.getTeachers}/>}  />
                    <Route  path="/users"  render={() => <UsersComponent getUsers={this.getUsers} deleteUser={this.deleteUser}/>}  />
                    <Route  path="/teachers"  render={() => <TeachersComponent getTeachers={this.getTeachers} deleteTeacher={this.deleteUser}/>}  />
                    <Route  path="/signup"  render={() => <FormComponent handleAddStudent={this.addStudent} handleAddUser={this.addUser}/>} />
                    <Route  path="/add-teacher"  render={() => <FormComponent handleAddUser={this.addTeacher}/>} />
                    <Route  path="/add-course"  render={() => <AddCourseComponent getTeachers={this.getTeachers} addCourse={this.addCourse}/>} />
                    <Route  path="/login"  render={() => <LoginComponent handleLogin={this.login}/>} />
                    <Route  path="/CourseInfo"  render={() => <CourseInfoComponent/>} />
                    <Route  path="/courses"  render={() => <CoursesComponent getCourses={this.getCourses} />} />
                    <Route  path="/profile"  render={() => <ProfileComponent getStudents={this.isLoggedIn} handleAddStudent={this.addStudent} currentUser={this.state.currentUser}/>} />
                </div>
            </BrowserRouter>
                <h2 style={{marginTop:'15vh'}} className="divider line donotcross" contentEditable/>
                <Row>
                    <FooterComponent/>
                </Row>
            </div>
            </div>
        </div>



    );
  }
}

export default App;
