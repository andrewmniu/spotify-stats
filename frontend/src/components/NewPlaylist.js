import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import PlaylistForm from "./PlaylistForm.js";
import "../css/NewPlaylist.css";

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSize: 1,
      playlistType: "Top Tracks",
      playlistName: "",
      placeholder: "",
      playlistDescription: "",
      playlistSize: "50",
      justCreated: false,
      modalShow: false,
    };
  }

  componentDidMount() {
    this.getDefaultValues(this.state.playlistType);
  }

  createSimilarPlaylist = (topTracks) => {
    const seeds = [...getRandom(topTracks.items.map((track) => track.id))];

    return this.props.spotifyApi
      .getRecommendations({
        limit: this.state.playlistSize,
        seed_tracks: seeds,
      })
      .then((response) => {
        return response.tracks.map((track) => track.uri);
      });
  };

  createPlaylist = async (e) => {
    const typeBool = this.state.playlistType === "Top Tracks";
    const playlistSize = typeBool ? this.state.playlistSize : 25;
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
      });
    await this.props.spotifyApi
      .getMyTopTracks({
        time_range: this.props.timeRange,
        limit: playlistSize,
      })
      .then((topTracks) => {
        if (typeBool) {
          return topTracks.items.map((track) => track.uri);
        } else {
          return this.createSimilarPlaylist(topTracks);
        }
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
              // console.log(response);
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
    this.getDefaultValues("Top Tracks");
    this.setState({
      playlistType: "Top Tracks",
      playlistName: "",
      playlistSize: "50",
      justCreated: false,
      modalShow: false,
    });
  };

  getDefaultValues = (type) => {
    const placeholder = "My " + type + " - " + this.props.title[1];
    const playlistDescription = `A playlist of my ${type.toLowerCase()} created by Spotify Rewind++`;
    this.setState({
      playlistType: type,
      placeholder,
      playlistDescription,
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
          className="spotify-btn control grid-2-2"
          onClick={() => this.setState({ modalShow: true })}
          disabled={this.props.itemType}
        >
          Create Playlist
        </button>
        <Modal show={this.state.modalShow} onHide={this.resetForm}>
          <Modal.Header className="modal-header text-center">
            <h5 id="modal-title">Playlist Details</h5>
            <button type="button" className="close" onClick={this.resetForm}>
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          {!this.state.justCreated && (
            <Modal.Body className="modal-content">
              <PlaylistForm
                title={this.state.placeholder}
                dropdownSize={this.state.dropdownSize}
                playlistSize={this.state.playlistSize}
                playlistType={this.state.playlistType}
                playlistName={this.state.playlistName}
                playlistDescription={this.state.playlistDescription}
                createPlaylist={this.createPlaylist}
                getDefaultValues={this.getDefaultValues}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                sizeChange={this.sizeChange}
              ></PlaylistForm>
            </Modal.Body>
          )}
          {this.state.justCreated && (
            <React.Fragment>
              <Modal.Body className="modal-content">
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
  itemType: PropTypes.bool.isRequired,
  timeRange: PropTypes.string.isRequired,
  spotifyApi: PropTypes.object.isRequired,
  title: PropTypes.array.isRequired,
};

function getRandom(arr) {
  let n = 5;
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export default NewPlaylist;
