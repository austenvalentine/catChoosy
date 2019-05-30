import React, {Component, Fragment} from 'react';
import firebase from './firebase.js';

class Leaderboard extends Component {
    constructor () {
        super();
    }

    componentDidMount () {
        const picturesRef = firebase.database().ref('pictures');

    }
    render() {
        return(
            {
                
            }
        );
    }
}


export default Leaderboard;