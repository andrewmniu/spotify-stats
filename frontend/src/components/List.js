import React from "react";
import PropTypes from "prop-types";
import Controls from "./Controls.js";
import ListItem from "./ListItem.js";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: false, // false for tracks, true for artists
      items: [],
      timeRange: "short_term",
    };
  }

  componentDidMount() {
    this.getTracks().then((tracks) => this.setState({ items: tracks }));
  }

  getHeader = () => {
    let header = "Your Top ";
    header += this.state.itemType ? "Artists - " : "Tracks - ";
    switch (this.state.timeRange) {
      case "short_term":
        header += "Last 4 Weeks";
        break;
      case "medium_term":
        header += "Last 6 Months";
        break;
      case "long_term":
        header += "All Time";
        break;
      default:
        console.log("error");
        break;
    }
    return header;
  };

  getTracks = () => {
    return this.props.spotifyApi
      .getMyTopTracks({ time_range: this.state.timeRange, limit: "50" })
      .then((response) => {
        // console.log(response);
        const tracks = [];
        response.items.forEach((track, idx) => {
          const trackObj = {
            name: track.name,
            artist: track.artists[0].name,
            artwork: track.album.images[0].url,
            rank: idx + 1,
            link: track.external_urls.spotify,
          };
          tracks.push(trackObj);
        });
        return tracks;
      });
  };

  getArtists = () => {
    return this.props.spotifyApi
      .getMyTopArtists({ time_range: this.state.timeRange, limit: "50" })
      .then((response) => {
        // console.log(response);
        const artists = [];
        response.items.forEach((artist, idx) => {
          const artistObj = {
            name: artist.name,
            image: artist.images[0].url,
            rank: idx + 1,
            link: artist.external_urls.spotify,
          };
          artists.push(artistObj);
        });
        return artists;
      });
  };

  toggleItems = () => {
    const newType = !this.state.itemType;
    if (newType) {
      this.getArtists().then((artists) => {
        this.setState({ itemType: newType, items: artists });
      });
    } else {
      this.getTracks().then((tracks) => {
        this.setState({ itemType: newType, items: tracks });
      });
    }
  };

  changeTimeRange = async (e) => {
    await this.setState({ timeRange: e.target.value });
    if (this.state.itemType) {
      this.getArtists().then((artists) => {
        this.setState({ items: artists });
      });
    } else {
      this.getTracks().then((tracks) => {
        this.setState({ items: tracks });
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Controls
          itemType={this.state.itemType}
          timeRange={this.state.timeRange}
          toggleItems={this.toggleItems}
          changeTimeRange={this.changeTimeRange}
          spotifyApi={this.props.spotifyApi}
          title={this.getHeader()}
        ></Controls>
        <div className="container mb-5 list-group">
          <h1 className="display-3">{this.getHeader()}</h1>
          {this.state.items.map((itemInfo, idx) => {
            return (
              <ListItem
                itemType={this.state.itemType}
                itemInfo={itemInfo}
                key={idx}
              ></ListItem>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

List.propTypes = {
  spotifyApi: PropTypes.object.isRequired,
};

export default List;
