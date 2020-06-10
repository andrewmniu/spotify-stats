import React from "react";
import PropTypes from "prop-types";

class Controls extends React.Component {
  constructor(props){
    super(props);
  }

  createPlaylist = async() => {
    const status = document.getElementById("status");
    status.innerHTML = "Creating playlist..."
    let id = null;
    let playlistId = null;
    await this.props.spotifyApi
      .getMe()
      .then(response => {
        id = response.id;
      })
    await this.props.spotifyApi
      .createPlaylist(id, {name: this.props.title})
      .then(response => {
        playlistId = response.id;
      })
    await this.props.spotifyApi
      .getMyTopTracks({ time_range: this.props.timeRange, limit: "50"})
      .then(response => {
        return response.items.map(track => track.uri)
      })
      .then(trackURIs => {
        this.props.spotifyApi
          .addTracksToPlaylist(playlistId, trackURIs)
          .then(response => {
            status.innerHTML = "Playlist created!"
          })
      })
  }

  render() {
    return (
      <div className="controls">
        <p style={{display: "inline"}}>Tracks</p>
        <input type="checkbox" onChange={this.props.toggleItems}></input>
        <p style={{display: "inline"}}>Artists</p>

        <select
          value={this.props.timeRange}
          onChange={this.props.changeTimeRange}
        >
          <option value="short_term">4 Weeks</option>
          <option value="medium_term">6 Months</option>
          <option value="long_term">All Time</option>
        </select>
        <button onClick={this.createPlaylist} disabled={this.props.itemType}>Create Playlist</button>
        <p id="status" style={{display: "inline"}}></p>
    </div>
    );
  }
}

Controls.propTypes = {
  itemType: PropTypes.bool.isRequired,
  toggleItems: PropTypes.func.isRequired,
  timeRange: PropTypes.string.isRequired,
  changeTimeRange: PropTypes.func.isRequired,
  spotifyApi: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default Controls;
