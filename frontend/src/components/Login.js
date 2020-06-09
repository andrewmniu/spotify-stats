import React from "react";
import PropTypes from "prop-types";

class Login extends React.Component {
  render() {
    return (
      <a href="http://localhost:8888/login">
        <button className="btn btn-primary">Log in with Spotify</button>
      </a>
    );
  }
}

export default Login;
