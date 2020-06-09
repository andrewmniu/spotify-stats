import React, { Component } from "react";
import logo from "./logo.svg";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log("hello");
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url,
        },
      });
    });
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888/login">
          <button className="btn btn-primary">Log in with Spotify</button>
        </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
        </div>
        <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
      </div>
    );
  }
}

export default App;
