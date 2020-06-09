import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      this.props.spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    };
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
      <div>
        {!this.state.loggedIn && (
          <a href="http://localhost:8888/login">
            <button className="btn btn-primary">Log in with Spotify</button>
          </a>
        )}
        <br />
        {this.state.loggedIn && (
          <React.Fragment>
            <button onClick={this.props.getNowPlaying}>
              Check Now Playing
            </button>
            <div>Now Playing: {this.props.nowPlaying.name}</div>
            <div>
              <img src={this.props.nowPlaying.albumArt} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  nowPlaying: PropTypes.object.isRequired,
  getNowPlaying: PropTypes.func.isRequired,
  spotifyApi: PropTypes.object.isRequired,
};

export default Login;
