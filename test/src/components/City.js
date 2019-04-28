import React , {Component} from 'react';

class City extends Component{
    constructor(name,weather){
        super(name,weather);
        this.state={
            name:name,
            weather:weather
        }
    }


    render() {
        let self=this;
        return (
            <div>
                <div>
                    <span></span>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>

        )
    }
}

export default Changer;