import React from "react";
import PropTypes from "prop-types";
import Controls from "./Controls.js";
import ListItem from "./ListItem.js";
import GalleryView from "./GalleryView.js";
import "../css/List.css";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: false, // false for tracks, true for artists
      items: [],
      timeRange: "short_term",
      listSize: "large",
      galleryIndex: 0,
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
            rank: idx + 1,
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
        this.setState({ itemType: newType, items: artists, galleryIndex: 0 });
      });
    } else {
      this.getTracks().then((tracks) => {
        this.setState({ itemType: newType, items: tracks, galleryIndex: 0 });
      });
    }
  };

  changeTimeRange = async (e) => {
    await this.setState({ timeRange: e.target.value });
    if (this.state.itemType) {
      this.getArtists().then((artists) => {
        this.setState({ items: artists, galleryIndex: 0 });
      });
    } else {
      this.getTracks().then((tracks) => {
        this.setState({ items: tracks, galleryIndex: 0 });
      });
    }
  };

  changeListSize = (e) => {
    const size = e.target.value;
    if (size !== "gallery") {
      Array.from(document.getElementsByClassName(this.state.listSize)).forEach(
        (element) => {
          element.classList.replace(this.state.listSize, size);
        }
      );
    }
    this.setState({ listSize: size });
  };

  // handles gallery view
  handleSelect = (selectedIndex, e) => {
    this.setState({ galleryIndex: selectedIndex });
  };


  // formats genres properly for artist view
  getGenres = (itemInfo) => {
    const genreArray = [...itemInfo.genres];
    let genres = "";
    if (genreArray.length > 0) {
      // this is a function to capitalize the first letter of every word
      genres += genreArray[0].replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      for (let genre of genreArray.slice(1)) {
        genres += `, ${genre.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })}`;
      }
    }
    return genres;
  };

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
          <div className="container list-group">
            {this.state.listSize === "gallery" && (
              <GalleryView
                items={this.state.items}
                itemType={this.state.itemType}
                listSize={this.state.listSize}
                galleryIndex={this.state.galleryIndex}
                handleSelect={this.handleSelect}
                getGenres={this.getGenres}
              ></GalleryView>
            )}
            {this.state.listSize !== "gallery" &&
              this.state.items.map((itemInfo, idx) => {
                return (
                  <ListItem
                    itemType={this.state.itemType}
                    listSize={this.state.listSize}
                    getGenres={this.getGenres}
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
