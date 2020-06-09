import React from "react";
import PropTypes from "prop-types";

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <p style={{display: "inline"}}>Tracks</p>
        <input type="checkbox" onChange={this.props.toggleItems}></input>
        <p style={{display: "inline"}}>Artists</p>

        <select
          value={this.props.timeRange}
          onChange={this.props.changeTimeRange}
        >
          <option value="short_term">4 Weeks</option>
          <option value="medium_term">6 Months</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
    );
  }
}

Controls.propTypes = {
  toggleItems: PropTypes.func.isRequired,
  timeRange: PropTypes.string.isRequired,
  changeTimeRange: PropTypes.func.isRequired,
};

export default Controls;
