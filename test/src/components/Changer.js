import React , {Component} from 'react';

class Changer extends Component{
    applyChange(col){
        console.log(col)
        this.props.colorChange('green')
    }


    render() {
        let self=this;
        return (
            <div>
                <div>
                </div>
                <div>
                    <button onClick={() =>{this.props.colorChange('green')} }>Green</button>
                    <button onClick={() =>{this.props.colorChange('default')} }>Green</button>
                    <button onClick={() =>{this.props.colorChange('purple')} }>Green</button>

                </div>
            </div>

        )
    }
}

export default Changer;