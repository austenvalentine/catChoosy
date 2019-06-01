import React, {Component} from 'react';
import firebase from './firebase.js';

class Leaderboard extends Component {
    constructor () {
        super();
        this.state = {
            pictures: []
        }
    }

    componentDidMount (){
        const picturesRef = firebase.database().ref('pictures');
        picturesRef.on('value', snapshot => {
            const unsortedPictures = [];
            for (let picture in snapshot.val()) {
                unsortedPictures.push(snapshot.val()[picture]);
            }

            const sortedPictures = unsortedPictures.sort((a,b) => {
                // if number of votes are the same, order by
                // most recent vote first
                if (a.votes === b.votes) {
                    return a.timestamp < b.timestamp
                }
                // order by most votes
                return a.votes < b.votes;
            })
            this.setState({
                pictures: sortedPictures
            })
        })
    }

    render() {
        return(
            <div className="leaderboard contentWrapper">
                <h1>CatChoosy</h1>
                <h2>Leaderboard</h2>
                <ol>
                    {
                        this.state.pictures.map((picture, i) => {
                            return <li key={i}>
                                <div className="imageBox">
                                    <img src={picture.url} />
                                </div>
                                <p>Votes: {picture.votes}</p>
                            </li>
                        })
                    }
                </ol>
            </div>
                
        );
    }
}


export default Leaderboard;