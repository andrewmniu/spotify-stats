import React from "react";
import PropTypes from "prop-types";
import "../css/ListItem.css";

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
        <div className={`list-group-item ${this.props.listSize}`}>
          <p className={`rank ${this.props.listSize}`}>
            {this.props.itemInfo.rank}.
          </p>
          <div className="info-container large">
            <a
              href={this.props.itemInfo.link}
              target="_blank"
              className={`link ${this.props.listSize}`}
              rel="noopener noreferrer"
              >
              {this.props.itemInfo.name}
            </a>
            <br />
            <p className={`info ${this.props.listSize} genres`}>
              {this.getGenres()}
            </p>
          </div>
          <img
            src={this.props.itemInfo.image}
            className={`list-image ${this.props.listSize}`}
            alt={this.props.itemInfo.name}
          />
        </div>
      );
    } else {
      return (
        <div className={`list-group-item ${this.props.listSize}`}>
          <p className={`rank ${this.props.listSize}`}>
            {this.props.itemInfo.rank}.
          </p>
          <div className="info-container large">
            <a
              href={this.props.itemInfo.link}
              target="_blank"
              className={`link ${this.props.listSize}`}
              rel="noopener noreferrer"
              >
              {this.props.itemInfo.name}
            </a>
            <br />
            <a
              href={this.props.itemInfo.artistLink}
              target="_blank"
              className={`info ${this.props.listSize}`}
              rel="noopener noreferrer"
              >
              {this.props.itemInfo.artist}
            </a>
          </div>
          <a
            href={this.props.itemInfo.albumLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={this.props.itemInfo.artwork}
              className={`list-image ${this.props.listSize}`}
              alt={this.props.itemInfo.album}
            />
          </a>
        </div>
      );
    }
  }
}

ListItem.propTypes = {
  itemType: PropTypes.bool.isRequired,
  listSize: PropTypes.string.isRequired,
  itemInfo: PropTypes.object.isRequired,
};

export default ListItem;
