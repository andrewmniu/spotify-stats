import React from "react";
import PropTypes from "prop-types";
import NewPlaylist from "./NewPlaylist.js";

class Controls extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="controls fixed-top">
          <p style={{ display: "inline" }}>Tracks</p>
          <input type="checkbox" onChange={this.props.toggleItems}></input>
          <p style={{ display: "inline" }}>Artists</p>

          <select
            className="spotify-btn"
            value={this.props.timeRange}
            onChange={this.props.changeTimeRange}
          >
            <option value="short_term">4 Weeks</option>
            <option value="medium_term">6 Months</option>
            <option value="long_term">All Time</option>
          </select>
          <button
            type="button"
            className="spotify-btn"
            data-toggle="modal"
            data-target="#exampleModal"
            disabled={this.props.itemType}
          >
            Create Playlist
          </button>
          <p id="status" style={{ display: "inline" }}></p>
        </div>
        <NewPlaylist
          timeRange={this.props.timeRange}
          spotifyApi={this.props.spotifyApi}
          title={`My ${this.props.title.substring(5)}`}
        ></NewPlaylist>
      </React.Fragment>
    );
  }
}

Controls.propTypes = {
  itemType: PropTypes.bool.isRequired,
  toggleItems: PropTypes.func.isRequired,
  timeRange: PropTypes.string.isRequired,
  changeTimeRange: PropTypes.func.isRequired,
  spotifyApi: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default Controls;
