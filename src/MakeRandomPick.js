import React, {Fragment, Component} from 'react';
import axios from 'axios';
import VoteGetter from './VoteGetter.js';
import VotesRemainingDisplay from './VotesRemainingDisplay.js';
import firebase from 'firebase';
const hash = require('hash.js');



class MakeRandomPick extends Component {
    constructor() {
        super();
        this.state = {
            currentPictureURL: '',
            // start counting the votes the
            // visitor has left before exiting
            // the vote system
            votesRemaining: 3
        }
    }

    getNewPicture = () => {
        axios({
            url: this.props.url
        }).then(response => {
            response = response.data[0].url;
            console.log(response);
            this.setState({
                currentPictureURL: response
            });
        })
    }
    
    pushVoteToDB = (pictureURL, user=null) => {
        
        // generate picture id by hashing url
        const hashedURL = hash.sha256().update(pictureURL).digest('hex');
        // check if current picture id exists in database


        //===
        // push new vote into database

        //===
        // collect data for timestamp, user id and picture id.

        //===
        // create new 'vote' entry

        //===


    }

    votePicture() {
        // get the url of the state.currentPicture
        const pictureForDB = this.state.currentPictureURL;
        
        // update votes remaining for this session
        const newVotesRemaining = this.state.votesRemaining - 1;
        // clear state.currentPicture to prevent double-voting and 
        // prepare for next Picture
        this.setState({
            currentPicture: { url: '' },
            votesRemaining: newVotesRemaining
        });
        console.log('votes remaining: ', this.state.votesRemaining)
        // check if votes are used up for this visitor
        if (this.state.votesRemaining === 1) {
            // call parent to close the picture chooser and move
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
                <img src={this.state.currentPictureURL} alt='a picture you might like' />
                <VoteGetter pickPicture={this.pickPicture} />
                <VotesRemainingDisplay votes={this.state.votesRemaining} />
            </Fragment>
        )
    }
}

export default MakeRandomPick;