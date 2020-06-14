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
      // form field start
      playlistType: "Top Tracks",
      playlistName: "",
      playlistDescription: "",
      playlistSize: "50",
      // form field end
      justCreated: false,
      modalShow: false,
    };
  }

  componentDidMount() {
    this.getDefaultValues(this.state.playlistType);
  }

  createSimilarPlaylist = (topTracks) => {
    // select 5 random tracks and get their seeds
    const seeds = getRandom(topTracks.items.map((track) => track.id));

    // get recommendations and return track URIs
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
    // checks which playlist to make
    const typeBool = this.state.playlistType === "Top Tracks";
    // sets playlist size directly for top tracks playlist
    // gets top 25 to select 5 random seeds from for personal recommendations
    const playlistSize = typeBool ? this.state.playlistSize : 25;
    // loading animation
    document.getElementById("submit-btn").innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    e.preventDefault();
    let id = null;
    let playlistId = null;

    // make a new playlist
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

    // get track URIs
    await this.props.spotifyApi
      .getMyTopTracks({
        time_range: this.props.timeRange,
        limit: playlistSize,
      })
      .then((topTracks) => {
        // directly get track URIs from top tracks
        if (typeBool) {
          return topTracks.items.map((track) => track.uri);
        }
        // pass top 25 to get 5 randomly selected seeds to generate recommended tracks
        // return the trackURIs from these recmomended tracks
        else {
          return this.createSimilarPlaylist(topTracks);
        }
      })
      .then((trackURIs) => {
        // add tracks to playlist
        this.props.spotifyApi
          .addTracksToPlaylist(playlistId, trackURIs)
          .then(() => {
            this.props.spotifyApi.getPlaylist(playlistId).then((response) => {
              this.setState({ justCreated: true });
              // display confirmation of playlist creation
              const modal = document.getElementsByClassName("modal-content")[0];
              modal.firstElementChild.firstElementChild.textContent =
                "Playlist Created!";
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
      playlistSize: "50",
      justCreated: false,
      modalShow: false,
    });
  };

  getDefaultValues = (type) => {
    const playlistName = "My " + type + " - " + this.props.title[1];
    const playlistDescription = `A playlist of my ${type.toLowerCase()} (${this.props.title[1].toLowerCase()}) created by Spotify Rewind++`;
    this.setState({
      playlistType: type,
      playlistName,
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
          onClick={() => {
            this.getDefaultValues(this.state.playlistType);
            this.setState({ modalShow: true });
          }}
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

// Selects 5 random elements from an array
function getRandom(arr) {
  let n = arr.length > 5 ? 5 : arr.length; // error handling if array has less than 5 elements
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
