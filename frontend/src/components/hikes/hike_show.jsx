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
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: `100%`, width: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
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