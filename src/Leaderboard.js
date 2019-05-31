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
            console.log(sortedPictures)
            this.setState({
                pictures: sortedPictures
            })
        })
    }

    render() {
        return(
                <ul>
                    {
                        this.state.pictures.map((picture, i) => {
                            return  <li key={i}>
                                        <img src={picture.url} />
                                        <p>Votes: {picture.votes}</p>
                                    </li>
                        })
                    }
                </ul>
        );
    }
}


export default Leaderboard;