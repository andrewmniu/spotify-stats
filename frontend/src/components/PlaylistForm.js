import React from "react";
import PropTypes from "prop-types";

class PlaylistForm extends React.Component {
  createSelectItems() {
    let options = [];
    for (let i = 50; i >= 10; i--) {
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
          <label htmlFor="playlistName">Playlist Name</label>
          <input
            type="text"
            className="form-control"
            id="playlistName"
            placeholder={this.props.title}
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
        <div className="form-group border-bottom pb-3">
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
        <div className="text-center">
          <button type="submit" id="submit" className="spotify-btn">
            Create Playlist
          </button>
        </div>
      </form>
    );
  }
}

PlaylistForm.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownSize: PropTypes.number.isRequired,
  playlistSize: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  sizeChange: PropTypes.func.isRequired,
};

export default PlaylistForm;
