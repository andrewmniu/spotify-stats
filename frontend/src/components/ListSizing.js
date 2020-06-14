import React from "react";
import PropTypes from "prop-types";

class ListSizing extends React.Component {
  render() {
    return (
      <div className="btn-group control grid-1-2" data-toggle="buttons">
        <button
          className="btn list-sizing active"
          onClick={this.props.changeListSize}
          value="large"
          id="ls-1"
        >
          <input type="radio" name="options" defaultChecked></input>
        </button>
        <button
          className="btn list-sizing"
          onClick={this.props.changeListSize}
          value="medium"
          id="ls-2"
        >
          <input type="radio" name="options"></input>
        </button>
        <button
          className="btn list-sizing"
          onClick={this.props.changeListSize}
          value="small"
          id="ls-3"
        >
          <input type="radio" name="options"></input>
        </button>
      </div>
    );
  }
}

ListSizing.propTypes = {
  changeListSize: PropTypes.func.isRequired,
};

export default ListSizing;
