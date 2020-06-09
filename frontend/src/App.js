import React, { Component } from "react";
import logo from "./logo.svg";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login.js";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.spotifyApi = new SpotifyWebApi();
    // const params = this.getHashParams();
    // const token = params.access_token;
    // if (token) {
    //   spotifyApi.setAccessToken(token);
    // }
    this.state = {
      // loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
    };
  }

  // getHashParams() {
  //   var hashParams = {};
  //   var e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   while ((e = r.exec(q))) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //   }
  //   return hashParams;
  // }

  getNowPlaying = () => {
    this.spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
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
          spotifyApi={this.spotifyApi}
        ></Login>
      </div>
    );
  }
}

export default App;
