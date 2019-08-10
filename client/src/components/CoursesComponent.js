import React , {Component} from 'react';
import style from "../assets/css/courses.css"
import deviderStyles  from "../assets/css/deviders.scss"

class CoursesComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            courses:[]
        }

    }

    async componentDidMount() {
        this.courses= await this.props.getCourses();
        this.setState({courses:this.courses});
    }


    render() {
        let self = this;
        return (
            <div>
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