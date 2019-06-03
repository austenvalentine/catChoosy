import React, {Component} from 'react';
import MakeRandomPick from './MakeRandomPick.js';
import Leaderboard from './Leaderboard.js';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {

      // TESTING: set pickFinished  to true to go straight to leaderboard
      pickFinished: true
    }

  }
  finishRandomPicking = () => {
    this.setState({
      pickFinished: true
    })
  }

  render (){
    
    let currentWidget;
    if (this.state.pickFinished) {
      // the game is over. show the gallery
      currentWidget = 
          <Leaderboard />
    } else {
      // the game is still on. Get the visitor to vote.
      currentWidget = 
          <MakeRandomPick
            finishRandomPicking={this.finishRandomPicking}
            pickKitty={this.pickKitty}
            url={"https://api.thecatapi.com/v1/images/search?"}
          />
    }
    
    return (
      <div className="App">
        <header className="App-header">
          {currentWidget}
        </header>
      </div>
    );
  }
}

export default App;
