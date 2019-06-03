import React, {Component} from 'react';
import axios from 'axios';
import firebase from './firebase.js';
import VoteGetter from './VoteGetter.js';


class MakeRandomPick extends Component {
    constructor() {
        super();
        this.state = {
            currentPictureURL: '',
            currentPictureID: '',
            // start counting the votes the
            // visitor has left before exiting
            // the vote system
            votesRemaining: 3
        }
    }

    getNewPicture = () => {
        axios({
            // this endpoint doesn't need additional params
            // to return a random image
            url: this.props.url
        }).then(response => {
            // create a url from the id because the url is not always
            // in the response

            this.setState({
                // the id is suitable to use as a firebase node key
                currentPictureURL: response.data[0].url,
                currentPictureID: response.data[0].id
            });
        })
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // pushVoteToFirebase BEGINS
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    pushVoteToFirebase = () => {
        
        // because the ids are from the API, we'll prefix the string with an alphanumeric
        // character just in case of a conflict with firebase
        const pictureID = this.state.currentPictureID
        const prefixedPictureID = 'A' + pictureID;
        const pictureURL  = this.state.currentPictureURL;
        if (pictureURL) {
            // reference a picture node id which may or may not exist in firebase
            const pictureRef = firebase.database().ref(`pictures/${prefixedPictureID}`);
            // get a snapshot of that node and see if it exists in the database
            let newVotes;
            pictureRef.once('value', snapshot => {
                if (snapshot.exists()) {
                    // existing picture entries get votes incremented
                    newVotes = snapshot.child('votes').val() + 1;
                } else {
                    // new pictures get a first vote and the url recorded for use in the gallery
                    newVotes = 1;
                }
                pictureRef.update({ votes: newVotes, url: pictureURL, timestamp: firebase.database.ServerValue.TIMESTAMP});
            });
            this.setState({
                currentPictureID: '',
                currentPictureURL: ''
            });
        }
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
            // clear the current picture to make way for the next random pick
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
            <div className="votingBooth contentWrapper">
                <h1>CatChoosy</h1>
                <h2>Cast <span className="votesRemaining">{this.state.votesRemaining}</span> vote{this.state.votesRemaining===1 ? '':'s'}!</h2>
                {/* is there a way to get suitable alt text for this image?*/}
                <div className="imageBox">
                    <a href={this.state.currentPictureURL} target="_blank" rel="noopener noreferrer"><img src={this.state.currentPictureURL} alt="A notice to visitors using assistive technology: The photographs featured on CatChoosy are hosted by The Cat API. Unfortunately, The Cat API database does not yet include descriptive captions." /></a>
                </div>
                <VoteGetter handlePickPicture={this.handlePickPicture} />
            </div>

        )
    }
}

export default MakeRandomPick;