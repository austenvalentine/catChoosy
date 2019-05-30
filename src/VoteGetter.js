import React, {Fragment, Component} from 'react';

class VoteGetter extends Component {


    render (){
        return (
            <Fragment>
                <img src={this.props.imageURL} alt="" />
                <button onClick={() => { this.props.handlePickPicture('no')} }>No</button>
                <button onClick={() => { this.props.handlePickPicture('yes')} }>Yes</button>
            </Fragment>
        )
    }
}



export default VoteGetter;