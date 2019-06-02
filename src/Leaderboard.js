import React, {Component} from 'react';
import firebase from './firebase.js';

class Leaderboard extends Component {
    constructor () {
        super();
        this.state = {
            pictures: [],
            picturesDisplayed: []
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
                    return b.timestamp - a.timestamp;
                }
                // order by most votes
                return b.votes - a.votes;
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
                            return <li className="" key={i}>
                                <div className="imageBox">
                                    <a href={picture.url} target="_blank" rel="noopener noreferrer"><img src={picture.url} alt="A notice to visitors using assistive technology: The photographs featured on CatChoosy are hosted by The Cat API. Unfortunately, The Cat API database does not yet include descriptive captions." /></a>
                                    <p className="votesTab"> <span className="rank">#{i + 1} </span> {picture.votes} vote{picture.votes > 1 ? 's' : ''}</p>
                                </div>
                            </li>
                        })
                    }
                </ol>
            </div>
                
        );
    }
}


export default Leaderboard;