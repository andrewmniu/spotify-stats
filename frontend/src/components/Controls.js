import React from "react";
import PropTypes from "prop-types";
import NewPlaylist from "./NewPlaylist.js";

class Controls extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="controls">
          <div className="toggle control">
            <p className="toggle-label">Tracks</p>
            <input type="checkbox" onChange={this.props.toggleItems}></input>
            <p className="toggle-label">Artists</p>
          </div>
          <div className="btn-control control">
            <select
              className="spotify-btn-2"
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
          </div>
          <div className="btn-group control" data-toggle="buttons">
            <label className="btn list-sizing active" id="ls-1">
              <input type="radio" name="options" checked readOnly></input>
            </label>
            <label className="btn list-sizing" id="ls-2">
              <input type="radio" name="options" readOnly></input>
            </label>
            <label className="btn list-sizing" id="ls-3">
              <input type="radio" name="options" readOnly></input>
            </label>
          </div>
        </div>
        <NewPlaylist
          timeRange={this.props.timeRange}
          spotifyApi={this.props.spotifyApi}
          title={`My ${this.props.title[0].substring(5)} - ${
            this.props.title[1]
          }`}
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
  title: PropTypes.array.isRequired,
};

export default Controls;
