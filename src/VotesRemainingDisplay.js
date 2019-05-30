import React, {Component, Fragment} from 'react';

class VotesRemainingDisplay extends Component {
    render () {
        return (
            <Fragment>
                <p>Votes remaining: {this.props.votes}</p>
            </Fragment>
        )
    }
}

export default VotesRemainingDisplay;