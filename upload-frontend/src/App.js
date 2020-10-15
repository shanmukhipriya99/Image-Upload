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

  postHandler = () => {
    let fd = new FormData();
    fd.append("image", this.state.imageUploaded);
    // console.log(fd);
    fetch("http://localhost:8080/cert", {
      headers: {
      }, method: "POST", body: fd,
    })
      .then((response) => {
        // console.log(response.status);
        if (response.status === 200) {
          alert("Thank you for uploading the certificate!");
        } else if (response.status === 400) {
          alert("Please upload an image!");
        } else if (response.status === 500) {
          alert("Server error, please try again later!");
        }
      })
      .catch((err) => {
        // console.log(err);
        return Promise.reject();
      });
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
