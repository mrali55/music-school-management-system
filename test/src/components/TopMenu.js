import React , {Component} from 'react';


class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: ''
        };


    }



    render() {
        let self = this;
        let {context}=this.props;
        return (
            <div>
                <div className={self.props.mystyle}>{context}</div>
            </div>
        )
    }

}



export default TopMenu;