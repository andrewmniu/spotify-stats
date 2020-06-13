import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import PlaylistForm from "./PlaylistForm.js";

const defaultDescription =
  "A playlist of my top tracks created by Spotify Rewind++";

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSize: 1,
      playlistSize: "50",
      playlistName: "",
      playlistDescription: defaultDescription,
      justCreated: false,
      modalShow: false,
    };
  }

  createPlaylist = async (e) => {
    document.getElementById("submit-btn").innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    e.preventDefault();
    let id = null;
    let playlistId = null;
    await this.props.spotifyApi.getMe().then((response) => {
      id = response.id;
    });
    await this.props.spotifyApi
      .createPlaylist(id, {
        name: this.state.playlistName,
        description: this.state.playlistDescription,
      })
      .then((response) => {
        playlistId = response.id;
        // console.log(response);
      });
    await this.props.spotifyApi
      .getMyTopTracks({
        time_range: this.props.timeRange,
        limit: this.state.playlistSize,
      })
      .then((response) => {
        return response.items.map((track) => track.uri);
      })
      .then((trackURIs) => {
        this.props.spotifyApi
          .addTracksToPlaylist(playlistId, trackURIs)
          .then(() => {
            this.props.spotifyApi.getPlaylist(playlistId).then((response) => {
              this.setState({ justCreated: true });
              const modal = document.getElementsByClassName("modal-content")[0];
              modal.firstElementChild.firstElementChild.textContent =
                "Playlist Created!";
              console.log(response);
              // console.log(response.images[0].url);\
              document.getElementById("new-playlist-image").src =
                response.images[0].url;
              document.getElementById("open-playlist").href =
                response.external_urls.spotify;
            });
          });
      });
  };

  resetForm = () => {
    document.getElementById("modal-title").textContent = "Playlist Details";
    this.setState({
      playlistName: "",
      playlistDescription: defaultDescription,
      playlistSize: "50",
      justCreated: false,
      modalShow: false,
    });
  };

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  onFocus = () => {
    this.setState({ dropdownSize: 10 });
  };

  onBlur = () => {
    this.setState({ dropdownSize: 1 });
  };

  sizeChange = (e) => {
    e.target.blur();
    this.setState({ playlistSize: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="spotify-btn control"
          onClick={() => this.setState({ modalShow: true })}
          disabled={this.props.itemType}
        >
          Create Playlist
        </button>
        <Modal show={this.state.modalShow} onHide={this.resetForm}>
          <Modal.Header className="text-center">
            <h5 id="modal-title">Playlist Details</h5>
            <button type="button" className="close" onClick={this.resetForm}>
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          {!this.state.justCreated && (
            <Modal.Body>
              <PlaylistForm
                title={this.props.title}
                dropdownSize={this.state.dropdownSize}
                playlistSize={this.state.playlistSize}
                playlistName={this.state.playlistName}
                playlistDescription={this.state.playlistDescription}
                createPlaylist={this.createPlaylist}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                sizeChange={this.sizeChange}
              ></PlaylistForm>
            </Modal.Body>
          )}
          {this.state.justCreated && (
            <React.Fragment>
              <Modal.Body>
                <h2 className="text-center mt-3">{this.state.playlistName}</h2>
                <img
                  id="new-playlist-image"
                  alt={`${this.state.playlistName} Cover`}
                ></img>
              </Modal.Body>
              <Modal.Footer>
                <a
                  href="/#"
                  id="open-playlist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="spotify-btn">Open Playlist</button>
                </a>
                <button
                  onClick={this.resetForm}
                  type="button"
                  className="spotify-btn-2"
                >
                  Close
                </button>
              </Modal.Footer>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

NewPlaylist.propTypes = {
  // itemType: PropTypes.bool.isRequired,
  // toggleItems: PropTypes.func.isRequired,
  timeRange: PropTypes.string.isRequired,
  // changeTimeRange: PropTypes.func.isRequired,
  spotifyApi: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default NewPlaylist;
