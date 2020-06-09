import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login.js";
import List from "./components/List.js";

import "./App.css";


class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
      spotifyApi: new SpotifyWebApi()
    };
    if (token) {
      this.state.spotifyApi.setAccessToken(token);
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

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <Login></Login>
        )}
        <br />
        {this.state.loggedIn && (
          <List spotifyApi={this.state.spotifyApi}></List>
        )}
      </div>
    );
  }
}

export default App;
