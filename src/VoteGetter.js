import React, {Component} from 'react';

class VoteGetter extends Component {


    render (){
        return (
            <div className="voteGetter clearfix">
                <button className="left" onClick={() => { this.props.handlePickPicture('no')} }>No</button>
                <button className="right" onClick={() => { this.props.handlePickPicture('yes')} }>Yes</button>
            </div>
        )
    }
}



export default VoteGetter;