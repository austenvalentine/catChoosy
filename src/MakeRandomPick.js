import React, {Fragment, Component} from 'react';
import axios from 'axios';
import VoteGetter from './VoteGetter.js';
import VotesRemainingDisplay from './VotesRemainingDisplay.js';
import firebase from './firebase.js';
const hash = require('hash.js');



class MakeRandomPick extends Component {
    constructor() {
        super();
        this.state = {
            currentPictureURL: '',
            // part of user authentication implementation
            currentUser: null,
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
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // pushVoteToFirebase BEGINS
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    pushVoteToFirebase = (pictureURL) => {
        // reference database
        const dbRef = firebase.database().ref();
        //=============================
        // collect data for timestamp, user id and picture id.
        //=============================
        // refer to database timestamp placeholder; timestamp will be generated serverside
        const timestamp = firebase.database.ServerValue.TIMESTAMP;

        // generate picture id by hashing url
        const hashedURL = hash.sha256().update(pictureURL).digest('hex');
        // check if current picture id exists in database
        dbRef.on('value', response => {
            console.log(response);
        })
        // firebase.database().push()        
        //===
        // push new vote into database
        
        // create new 'vote' entry
        
        //===
        
        
    }
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // pushVoteToFirebase ENDS
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // votePicture BEGINS
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    votePicture() {
        // get the url of the state.currentPictureURL
        const pictureURL = this.state.currentPictureURL;
        this.pushVoteToFirebase(pictureURL);
        // decrement votes remaining for this session
        const newVotesRemaining = this.state.votesRemaining - 1;
        // clear state.currentPicture to prevent double-voting and 
        // prepare for next Picture
        this.setState({
            currentPicture: { url: '' },
            votesRemaining: newVotesRemaining
        });
        // check if votes are used up for this visitor
        if (this.state.votesRemaining === 1) {
            // call parent to close the picture chooser and move
            // on to the gallery
            this.props.finishRandomPicking();
        } else {
            this.getNewPicture();
        }
    }
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // votePicture ENDS
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // handlePickPicture BEGINS
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    handlePickPicture = (choice) => {
        if (choice === "yes") {
            this.votePicture();
        } else {
            this.getNewPicture();
        }
    }
    componentDidMount() {
        this.getNewPicture();
    }
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // handlePickPicture ENDS
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    

    render () {
        return (
            <Fragment>
                {/* is there a way to get suitable alt text for this image?*/}
                <img src={this.state.currentPictureURL} alt='a thing you might like' />
                <VoteGetter handlePickPicture={this.handlePickPicture} />
                <VotesRemainingDisplay votes={this.state.votesRemaining} />
            </Fragment>
        )
    }
}

export default MakeRandomPick;