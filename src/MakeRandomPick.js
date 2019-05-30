import React, {Fragment, Component} from 'react';
import VoteGetter from './VoteGetter.js';
import VotesRemainingDisplay from './VotesRemainingDisplay.js';
import axios from 'axios';
import firebase from 'firebase';

class MakeRandomPick extends Component {
    constructor() {
        super();
        this.state = {
            currentPicture: {
                url: ' '
            },
            // start 
            votesRemaining: 5
        }
    }

    getNewPicture = () => {
        axios({
            url: this.props.url
        }).then(response => {
            response = response.data[0].url;
            console.log(response);
            this.setState({
                currentPicture: { url: response }
            });
        })
    }

    votePicture() {
        // get the url of the state.currentPicture
        const pictureToDB = this.state.currentPicture;
        // update votes remaining for this session
        const newVotesRemaining = this.state.votesRemaining - 1;
        // clear state.currentPicture to prevent double-voting and 
        // prepare for next Picture
        this.setState({
            currentPicture: { url: '' },
            votesRemaining: newVotesRemaining
        });
        console.log('votes remaining: ', this.state.votesRemaining)
        // update the database
        if (this.state.votesRemaining === 1) {
            // close the catChooser
            // call parent to close the catChooser and move
            // on to the gallery
            this.props.finishRandomPicking();
        } else {
            this.getNewPicture();
        }
    }

    componentDidMount() {
        this.getNewPicture();
    }

    pickPicture = (choice) => {
        if (choice === "yes") {
            this.votePicture();
        } else {
            this.getNewPicture();
        }
    }

    render () {
        return (
            <Fragment>
                {/* is there a way to get suitable alt text for this image?*/}
                <img src={this.state.currentPicture.url} alt='a cat' />
                <VoteGetter pickPicture={this.pickPicture} />
                <VotesRemainingDisplay votes={this.state.votesRemaining} />
            </Fragment>
        )
    }
}

export default MakeRandomPick;