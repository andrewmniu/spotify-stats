import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem.js"

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: false, // false for tracks, true for artists
      items: [],
    };
  }

  componentDidMount() {
    this.getTracks()
      .then(tracks => this.setState({items: tracks}));
  }

  getTracks = () => {
    return this.props.spotifyApi
      .getMyTopTracks({ time_range: "long_term", limit: "50" })
      .then((response) => {
        // console.log(response);
        const tracks = [];
        response.items.forEach((track, idx) => {
          const trackObj = {
            name: track.name,
            artist: track.artists[0].name,
            artwork: track.album.images[0].url,
            rank: idx + 1,
          };
          tracks.push(trackObj);
        });
        return tracks;
      });
  };

  getArtists = () => {
    return this.props.spotifyApi
      .getMyTopArtists({ time_range: "long_term", limit: "50" })
      .then((response) => {
        // console.log(response);
        const artists = [];
        response.items.forEach((artist, idx) => {
          const artistObj = {
            name: artist.name,
            image: artist.images[0].url,
            rank: idx + 1
          };
          artists.push(artistObj);
        });
        return artists;
      });
  };

  toggleItems = () => {
    const newType = !this.state.itemType
    if(newType){
      this.getArtists().then(artists => {
        this.setState({itemType: newType, items: artists})
      });
    } else{
      this.getTracks().then(tracks => {
        this.setState({itemType: newType, items: tracks})
      })
    }
  }

  render() {
    return (
      <div className="container">
        <input type="checkbox" onChange={this.toggleItems}></input>
        {this.state.items.map((itemInfo, idx)=> {
          return <ListItem itemType={this.state.itemType} itemInfo={itemInfo} key={idx}></ListItem>
        })}
      </div>
    );
  }
}

List.propTypes = {
  spotifyApi: PropTypes.object.isRequired
}

export default List;
