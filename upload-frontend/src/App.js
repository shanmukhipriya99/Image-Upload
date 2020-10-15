import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    imageUploaded: null,
  };

  fileChangedHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({ imageUploaded: event.target.files[0] });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />        
        </header>
        <p style={{fontSize: '20px'}}>Please upload your certificate in a png or jpeg format:</p>
        <input
          type="file"
          id="image"
          onChange={this.fileChangedHandler}
        ></input>
        <button onClick={() => this.postHandler()}>
          Post
        </button>
      </div>      
    );
  }
  
}

export default App;
