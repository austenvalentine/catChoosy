import React, {Fragment, Component} from 'react';
import MakeRandomPick from './MakeRandomPick.js';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      pickFinished: false
    }

  }
  finishRandomPicking = () => {
    this.setState({
      pickFinished: true
    })
  }
  render (){
    let currentHeader;
    let currentWidget;
    if (this.state.pickFinished) {
      // the game is over. show the gallery
      currentHeader = <h1>CatChooser: Gallery</h1>
      currentWidget = 
        <Fragment>
          <ul className="gallery">
            <li>see a cat</li>
            <li>see a cat</li>
            <li>see a cat</li>
          </ul>
        </Fragment>
    } else {
      // the game is still on. Get the visitor to vote.
      currentHeader = <h1>CatChooser: Vote!</h1>
      currentWidget = 
        <Fragment>
          <MakeRandomPick
            finishRandomPicking={this.finishRandomPicking}
            pickKitty={this.pickKitty}
            url={"https://api.thecatapi.com/v1/images/search?"}
          />
        </Fragment>
    }
    return (
      <div className="App">
        <header className="App-header">
          {currentHeader}
          {currentWidget}
        </header>
      </div>
    );
  }
}

export default App;
