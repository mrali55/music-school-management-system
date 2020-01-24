import style from "../../assets/css/profile.module.css";
import React from "react";
import Form from "react-bootstrap/Form";


export default function StudentsToEnroll(props){
    return(
        <div className={style.content}>
            <h4>Students</h4>
            <div className={style.studentsContainer}>
                <Form>
                {[{name:'aaaa'},{name:'bbbb'}].map((student)=>
                    <div>
                        <Form.Check className={style.name} inline label={student && student.name} type={'checkbox'} />

                    </div>
                )}
                </Form>

            </div>

        </div>
    )
}