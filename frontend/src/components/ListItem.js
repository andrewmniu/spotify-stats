import React from "react";
import PropTypes from "prop-types";

class ListItem extends React.Component {
  render() {
    if (this.props.itemType) {
      return (
        <div className="list-group-item rounded">
          <p className="d-inline h2">{this.props.itemInfo.rank}. </p>
          <a href={this.props.itemInfo.link} target="_blank" className="h1 text-info">
            {this.props.itemInfo.name}
          </a>
          <img src={this.props.itemInfo.image} className="float-right"/>
          </div>
      );
    } else {
      return (
        <div className="list-group-item rounded">
          <p className="h2">{this.props.itemInfo.rank}. </p>
          <a href={this.props.itemInfo.link} target="_blank" className="h1 d-inline-block text-info w-75">
            {this.props.itemInfo.name}
          </a>{" "}
          <img
            src={this.props.itemInfo.artwork}
            className="float-right d-inline-block"
          />
        <small className="text-muted d-block h5">{this.props.itemInfo.artist}</small>
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
