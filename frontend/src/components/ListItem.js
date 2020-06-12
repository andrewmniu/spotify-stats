import React from "react";
import PropTypes from "prop-types";

class ListItem extends React.Component {
  getGenres = () => {
    const genreArray = [...this.props.itemInfo.genres];
    let genres = "";
    if (genreArray.length > 0) {
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
    if (this.props.itemType) {
      return (
        <div className="list-group-item">
          <p className="h2">{this.props.itemInfo.rank}. </p>
          <a
            href={this.props.itemInfo.link}
            target="_blank"
            className="link-large"
            rel="noopener noreferrer"
          >
            {this.props.itemInfo.name}
          </a>
          <img
            src={this.props.itemInfo.image}
            className="list-image-large"
            alt={this.props.itemInfo.name}
          />
          <p className="info-large genres">{this.getGenres()}</p>
        </div>
      );
    } else {
      return (
        <div className="list-group-item">
          <p className="h2">{this.props.itemInfo.rank}. </p>
          <a
            href={this.props.itemInfo.link}
            target="_blank"
            className="link-large"
            rel="noopener noreferrer"
          >
            {this.props.itemInfo.name}
          </a>{" "}
          <a
            href={this.props.itemInfo.albumLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={this.props.itemInfo.artwork}
              className="list-image-large"
              alt={this.props.itemInfo.album}
            />
          </a>
          <a
            href={this.props.itemInfo.artistLink}
            target="_blank"
            className="info-large"
            rel="noopener noreferrer"
          >
            {this.props.itemInfo.artist}
          </a>
        </div>
      );
    }
  }
}

ListItem.propTypes = {
  itemType: PropTypes.bool.isRequired,
  itemInfo: PropTypes.object.isRequired,
};

export default ListItem;
