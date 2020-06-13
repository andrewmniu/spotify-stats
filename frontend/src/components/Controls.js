import React from "react";
import PropTypes from "prop-types";
import NewPlaylist from "./NewPlaylist.js";
import ListSizing from "./ListSizing.js";
import "../css/Controls.css";

class Controls extends React.Component {
  render() {
    return (
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
          itemType={this.props.itemType}
          timeRange={this.props.timeRange}
          spotifyApi={this.props.spotifyApi}
          title={`My ${this.props.title[0].substring(5)} - ${
            this.props.title[1]
          }`}
        ></NewPlaylist>
        <ListSizing changeListSize={this.props.changeListSize}></ListSizing>
      </div>
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
