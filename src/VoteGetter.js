import React, {Component} from 'react';

class VoteGetter extends Component {


    render (){
        return (
            <div className="voteGetter clearfix">
                <button className="left" onClick={() => { this.props.handlePickPicture('no')} }>Pass</button>
                <button className="right" onClick={() => { this.props.handlePickPicture('yes')} }>Vote</button>
            </div>
        )
    }
}



export default VoteGetter;