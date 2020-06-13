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
          <select
            className="spotify-btn-2 control"
            value={this.props.timeRange}
            onChange={this.props.changeTimeRange}
          >
            <option value="short_term">4 Weeks</option>
            <option value="medium_term">6 Months</option>
            <option value="long_term">All Time</option>
          </select>
          <NewPlaylist
            timeRange={this.props.timeRange}
            spotifyApi={this.props.spotifyApi}
            title={`My ${this.props.title[0].substring(5)} - ${
              this.props.title[1]
            }`}
            ></NewPlaylist>

          <div className="btn-group control" data-toggle="buttons">
            <button
              className="btn list-sizing active"
              onClick={this.props.changeListSize}
              value="large"
              id="ls-1"
            >
              <input type="radio" name="options" defaultChecked></input>
            </button>
            <button
              className="btn list-sizing"
              onClick={this.props.changeListSize}
              value="medium"
              id="ls-2"
            >
              <input type="radio" name="options"></input>
            </button>
            <button
              className="btn list-sizing"
              onClick={this.props.changeListSize}
              value="small"
              id="ls-3"
            >
              <input type="radio" name="options"></input>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Controls.propTypes = {
  itemType: PropTypes.bool.isRequired,
  timeRange: PropTypes.string.isRequired,
  listSize: PropTypes.string.isRequired,
  toggleItems: PropTypes.func.isRequired,
  changeTimeRange: PropTypes.func.isRequired,
  changeListSize: PropTypes.func.isRequired,
  spotifyApi: PropTypes.object.isRequired,
  title: PropTypes.array.isRequired,
};

export default Controls;
