import React from 'react';
import { withRouter } from "react-router-dom";
import HikeBox from "./hike_box";
import Map from "../map/map_view"

class HikeShow extends React.Component {

  componentDidMount(){
    this.props.fetchHikes()
    this.props.fetchHike(this.props.hikeId)
  }

  render(){
    if (this.props.hike) {
      return (
        <div>
          <div style={{ height: `500px`, width: `100%` }}>
            Map Goes Here
            <Map
              hike={this.props.hike}
              hikes={this.props.hikes}
            />
          </div>
          <HikeBox
            hike={this.props.hike}
            currentUser={this.props.currentUser}
            deleteDestination={`/users/${
              this.props.hike
                ? this.props.hike.user._id
                : this.props.currentUser.id
            }`}
            deleteHike={this.props.deleteHike}
          />
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default withRouter(HikeShow);