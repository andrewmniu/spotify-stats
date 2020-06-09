import React, { Component } from "react";
import logo from "./logo.svg";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login.js";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    // this.spotifyApi = new SpotifyWebApi();
    this.state = {
      nowPlaying: { name: "Not Checked", albumArt: "", artist: "" },
      spotifyApi: new SpotifyWebApi()
    };
  }

  getNowPlaying = () => {
    this.state.spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name
        },
      });
    });
  };

  render() {
    return (
      <div className="App">
        <Login
          nowPlaying={this.state.nowPlaying}
          getNowPlaying={this.getNowPlaying}
          spotifyApi={this.state.spotifyApi}
        ></Login>
      </div>
    );
  }
}

export default App;
