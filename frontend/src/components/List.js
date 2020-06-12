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
      listSize: "large"
    };
  }

  componentDidMount() {
    this.getTracks().then((tracks) => this.setState({ items: tracks }));
  }

  getHeader = () => {
    let header = "Your Top ";
    header += this.state.itemType ? "Artists" : "Tracks";
    switch (this.state.timeRange) {
      case "short_term":
        return [header, "Last 4 Weeks"];
      case "medium_term":
        return [header, "Last 6 Months"];
      case "long_term":
        return [header, "All Time"];
      default:
        return "error";
    }
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
            artistLink: track.artists[0].external_urls.spotify,
            artwork: track.album.images[0].url,
            album: track.album.name,
            albumLink: track.album.external_urls.spotify,
            link: track.external_urls.spotify,
            rank: idx + 1
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
            link: artist.external_urls.spotify,
            genres: artist.genres.slice(0, 3),
            rank: idx + 1,
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

  changeListSize = (e) => {
    const size = e.target.value;
    Array.from(document.getElementsByClassName(this.state.listSize)).forEach(element => {
      element.classList.replace(this.state.listSize, size)
    })
    this.setState({listSize: size});
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>{this.getHeader()[0]}</h1>
          <h2>{this.getHeader()[1]}</h2>
        </header>
        <Controls
          itemType={this.state.itemType}
          timeRange={this.state.timeRange}
          listSize={this.state.listSize}
          toggleItems={this.toggleItems}
          changeTimeRange={this.changeTimeRange}
          changeListSize={this.changeListSize}
          spotifyApi={this.props.spotifyApi}
          title={this.getHeader()}
        ></Controls>
        <div className="body">
          <div className="container pb-5 list-group">
            {this.state.items.map((itemInfo, idx) => {
              return (
                <ListItem
                  itemType={this.state.itemType}
                  listSize={this.state.listSize}
                  itemInfo={itemInfo}
                  key={idx}
                ></ListItem>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

List.propTypes = {
  spotifyApi: PropTypes.object.isRequired,
};

export default List;
