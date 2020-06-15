import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import "../css/GalleryView.css";

class GalleryView extends React.Component {

  render() {
    return (
      <Carousel
        activeIndex={this.props.galleryIndex}
        onSelect={this.props.handleSelect}
        interval={null}
        indicators={true}
      >
        {this.props.items.map((itemInfo, idx) => {
          if (this.props.itemType) {
            return (
              <Carousel.Item key={idx}>
                <img
                  src={itemInfo.image}
                  className={`list-image ${this.props.listSize}`}
                  alt={itemInfo.name}
                />
                <Carousel.Caption>
                  <p>{idx + 1}. </p>
                  <a
                    href={itemInfo.link}
                    target="_blank"
                    className={`link ${this.props.listSize}`}
                    rel="noopener noreferrer"
                  >
                    {itemInfo.name}
                  </a>
                  <br />
                  <p
                    className={`info ${this.props.listSize} genres`}
                  >
                    {this.props.getGenres(itemInfo)}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          } else {
            return (
              <Carousel.Item key={idx}>
                <a
                  href={itemInfo.albumLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={itemInfo.artwork}
                    className={`list-image ${this.props.listSize}`}
                    alt={itemInfo.album}
                  />
                </a>
                <Carousel.Caption>
                  <p>{idx + 1}. </p>
                  <a
                    href={itemInfo.link}
                    target="_blank"
                    className={`link ${this.props.listSize}`}
                    rel="noopener noreferrer"
                  >
                    {itemInfo.name}
                  </a>
                  <br />
                  <a
                    href={itemInfo.artistLink}
                    target="_blank"
                    className={`info ${this.props.listSize}`}
                    rel="noopener noreferrer"
                  >
                    {itemInfo.artist}
                  </a>
                </Carousel.Caption>
              </Carousel.Item>
            );
          }
        })}
      </Carousel>
    );
  }
}

GalleryView.propTypes = {
  items: PropTypes.array.isRequired,
  itemType: PropTypes.bool.isRequired,
  listSize: PropTypes.string.isRequired,
};

export default GalleryView;
