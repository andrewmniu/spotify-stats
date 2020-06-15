import React from "react";
import PropTypes from "prop-types";

class PlaylistForm extends React.Component {

  // generate playlist size options for select form element
  createSelectItems() {
    let options = [];
    // only top 50 available for top tracks
    // can generate up to 100 recommendations
    const maxSize = this.props.playlistType === "Top Tracks" ? 50 : 100;
    for (let i = maxSize; i >= 10; i--) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }

  render() {
    return (
      <form className="modal-body" onSubmit={this.props.createPlaylist}>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect">Playlist Type</label>
          <select
            className="form-control"
            id="exampleFormControlSelect"
            value={this.props.playlistType}
            onChange={(e) => this.props.getDefaultValues(e.target.value)}
          >
            <option>Top Tracks</option>
            <option>Personalized Recommendations</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="playlistName">Playlist Name</label>
          <input
            type="text"
            className="form-control"
            id="playlistName"
            value={this.props.playlistName}
            onChange={this.props.onChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="playlistDescription">Playlist Description</label>
          <textarea
            className="form-control"
            id="playlistDescription"
            value={this.props.playlistDescription}
            onChange={this.props.onChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Playlist Size</label>
          <select
            className="form-control"
            id="exampleFormControlSelect2"
            value={this.props.playlistSize}
            size={this.props.dropdownSize}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChange={this.props.sizeChange}
          >
            {this.createSelectItems()}
          </select>
        </div>
        <div id="submit">
          <button type="submit" id="submit-btn" className="spotify-btn">
            Create Playlist
          </button>
        </div>
      </form>
    );
  }
}

PlaylistForm.propTypes = {
  dropdownSize: PropTypes.number.isRequired,
  playlistSize: PropTypes.string.isRequired,
  playlistType: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  getDefaultValues: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  sizeChange: PropTypes.func.isRequired,
};

export default PlaylistForm;
