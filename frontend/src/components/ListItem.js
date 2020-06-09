import React from 'react'
import PropTypes from 'prop-types'

class ListItem extends React.Component {
  render () {
    if(this.props.itemType){
      return(
        <div className="ListItem">
          <h3>
            {this.props.itemInfo.rank}. {this.props.itemInfo.name}
          </h3>
          <img src={this.props.itemInfo.image} />
        </div>
      );
    }
    else{
      return(
        <div className="ListItem">
          <h3>
            {this.props.itemInfo.rank}. {this.props.itemInfo.name} by {this.props.itemInfo.artist}
          </h3>
          <img src={this.props.itemInfo.artwork} />
        </div>
      );
    }
  }
}

ListItem.propTypes = {
  itemType: PropTypes.bool.isRequired,
  itemInfo: PropTypes.object.isRequired
}

export default ListItem;
