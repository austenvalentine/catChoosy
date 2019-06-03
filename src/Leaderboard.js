import React, {Component} from 'react';
import firebase from './firebase.js';

class Leaderboard extends Component {
    constructor () {
        super();
        this.state = {
            //state.pictures stores the full dataset of image urls from the server
            pictures: [],
            //state.loadedPictures is a subset of state.pictures data which we need map to a list
            //for viewing. We only append new images which are directly beneath the viewport so
            //as not to load the entire database worth of images into the browser at once, aka
            // "lazy loading"
            loadedPictures: []
        }
        
    }

    lazyLoader = () => {
        // ================== LAZY LOADING =========================
        // bottomOfScreen is the bottom of the viewport in in relation 
        // to the document height in pixels. the loadedZone is the 
        // vertical height within which we don't need to preload and 
        // attach more content to the bottom of the page.

        // if the bottom of our viewport exceeds document's entire 
        // height (document.body.clientHeight) minus the viewport's 
        // height (window.innerHeight), add one more element to our
        // state.loadedPictures array
        const loadedZone = document.body.clientHeight - window.innerHeight;
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
            if (sortedPictures.length > 0) {
                this.setState({
                    loadedPictures: sortedPictures.slice(0, 1)
                })
            }

        })
        //========================
        // document scrolling triggers lazy loading
        document.addEventListener('scroll', this.lazyLoader);
        
    }

    componentWillUnmount (){
        //===========================
        // cleanup of event listener when leaderboard needs to close
        document.removeEventListener('scroll', this.lazyLoader);
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