import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ToggleComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle >
                Show Students
            </DropdownToggle>
            <DropdownMenu>
                {props.studentsData.length ?
                props.studentsData.map((student)=>
                        <DropdownItem>{student.name}</DropdownItem>

                )
                    :
                <DropdownItem>No students yet</DropdownItem>
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default ToggleComponent;