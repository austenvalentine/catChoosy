import React, {Component} from 'react';
import MakeRandomPick from './MakeRandomPick.js';
import './App.css';
import { loadPartialConfig } from '@babel/core';

class App extends Component {
  
  
  render (){
    return (
      <div className="App">
        <header className="App-header">
          <h1>CatChooser</h1>
          <MakeRandomPick pickKitty={this.pickKitty} url={"https://api.thecatapi.com/v1/images/search"} />
        </header>
      </div>
    );
  }
}

export default App;
