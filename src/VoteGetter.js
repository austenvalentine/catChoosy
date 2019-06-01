import React, {Component} from 'react';

class VoteGetter extends Component {


    render (){
        return (
            <div className="voteGetter">
                <button onClick={() => { this.props.handlePickPicture('no')} }>No</button>
                <button onClick={() => { this.props.handlePickPicture('yes')} }>Yes</button>
            </div>
        )
    }
}



export default VoteGetter;