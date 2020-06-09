import React from "react";
import PropTypes from "prop-types";

class TopTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentWillMount() {
    this.getTracks();
  }

  getTracks = () => {
    this.props.spotifyApi
      .getMyTopTracks({ time_range: "medium_term", limit: "50" })
      .then((response) => {
        console.log(response);
        const tracks = [];
        response.items.forEach((track, idx) => {
          const trackObj = {
            name: track.name,
            artist: track.artists[0].name,
            artwork: track.album.images[1].url,
            rank: idx + 1
          };
          tracks.push(trackObj);
        });
        this.setState({ tracks });
      });
  };

  render() {
    return (
      <div className="container">
        {this.state.tracks.map((trackInfo) => (
          <div className="track">
            <h3>
              {trackInfo.rank}. {trackInfo.name} by {trackInfo.artist}
            </h3>
            <img src={trackInfo.artwork} />
          </div>
        ))}
      </div>
    );
  }
}

export default TopTracks;
