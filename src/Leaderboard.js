import React, {Component} from 'react';
import firebase from './firebase.js';

class Leaderboard extends Component {
    constructor () {
        super();
        this.state = {
            pictures: [],
            loadedPictures: []
        }
        document.addEventListener('scroll', this.lazyLoader);
    }

    lazyLoader = () => {
        // ================== LAZY LOADING =========================
        // loadZone is the vertical portion of the page that will not trigger
        // adding more list items to the pictures array
        const loadedZone = .8 * document.body.clientHeight;
        const bottomOfScreen = window.pageYOffset + window.innerHeight;
        if (bottomOfScreen > loadedZone) {
            const newLength = this.state.loadedPictures.length + 1;
            const newLoadedPictures = this.state.pictures.slice(0, newLength);
            this.setState({
                loadedPictures: newLoadedPictures
            })
        }

    }

    componentDidMount (){
        // const picturesRef = firebase.database().ref('pictures');
        
        // picturesRef.on('value', snapshot => {
        //     console.log('hello?')
        //     const unsortedPictures = [];
        //     for (let picture in snapshot.val()) {
        //         console.log(picture)
        //         unsortedPictures.push(snapshot.val()[picture]);
        //     }

        //     const sortedPictures = unsortedPictures.sort((a,b) => {
        //         // if number of votes are the same, order by
        //         // most recent vote first
        //         if (a.votes === b.votes) {
        //             return b.timestamp - a.timestamp;
        //         }
        //         // order by most votes
        //         return b.votes - a.votes;
        //     })
        //     this.setState({
        //         pictures: sortedPictures
        //     })
        // })
        //========================
        const dummyPic = {
            id: "77u", 
            url: "https://cdn2.thecatapi.com/images/77u.jpg", 
            timestamp: '192384743',
            votes: 2
        }
        const newPictures = [];
        for (let i=0; i<100; i++) {
            newPictures.push(dummyPic);
        }
        
        
        //========================
        this.setState({
            pictures: newPictures
        })
        console.log(newPictures);
        if (newPictures.length > 0) {
            this.setState({
                loadedPictures: newPictures.slice(0, 1)
            })
        }
    }

    render() {
        
        return(
            <div className="leaderboard contentWrapper">
                <h1>CatChoosy</h1>
                <h2>Leaderboard</h2>
                <ol>
                    {
                        this.state.loadedPictures.map((picture, i) => {
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