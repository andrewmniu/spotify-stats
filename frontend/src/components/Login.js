import React from "react";
import "../css/Login.css"

class Login extends React.Component {
  render() {
    return (
      <div className="login-bg">
        <div className="login">
          <h1>Spotify Wrapped++</h1>
          <p>
            Want to view your top tracks and artists but don't want to wait
            until December for Spotify Wrapped? Now you can with Spotify
            Wrapped++!
          </p>
          <a href="http://localhost:8888/login">
            <button className="spotify-btn">Log in with Spotify</button>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
