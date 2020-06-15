import React from "react";
import PropTypes from "prop-types";
import "../css/ListItem.css";

class ListItem extends React.Component {
// two different renders depending on whether tracks or artists are being displayed
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
              {this.props.getGenres(this.props.itemInfo)}
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
