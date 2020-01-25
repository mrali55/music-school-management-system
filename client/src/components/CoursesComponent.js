import React , {Component} from 'react';
import style from "../assets/css/courses.module.css"
import deviderStyles  from "../assets/css/deviders.scss"
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import styles from "../assets/css/home.css";
import Row from "react-bootstrap/Row";


class CoursesComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            courses:[]
        }

    }

    showCourse=()=>{

    };

    async componentDidMount() {
        this.courses= await this.props.getCourses();
        this.setState({courses:this.courses});
    }

    handleCourseInfo(course){
        console.log('WORKING | course: ',course);
        this.props.setCurrentCourseInfo(course);
    }


    render() {
        let self = this;
        return (
            <div className={style.main}>
                {this.state.courses.map((course)=>
                    <div>
                    <div className={style.courseContainer}>
                        <div>
                            <img className={style.img} src={'https://musicplayers.com/wp-content/uploads/2019/07/G_Series_Ad-620x420.jpg'}/>
                        </div>
                        <div className={style.lines}>
                            <h2> { course.name}</h2>
                            <p>Level: { course.level}</p>
                            <p>instrument: { course.instrument}</p>
                            <p>Teacher: { course.teacher.name}</p>
                        </div>
                        <div onClick={()=>this.handleCourseInfo(course)} className={style.button}>
                            <NavLink className={style.link} exact to="/courseInfo" href="home">Details</NavLink>
                        </div>
                    </div>
                        <h2 className="divider line one-line" contentEditable/>
                    </div>
                )}

            </div>
        )
    }

}



export default CoursesComponent;