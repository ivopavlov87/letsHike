import React from "react";

class HikeBox extends React.Component {
  render() {
    if (this.props.hike){
      return (
        <div>
          <h3>{this.props.hike.trailheadName}</h3>
          <h3>{this.props.hike.state}</h3>
          <h3>Round trip: {this.props.hike.distance} miles</h3>
          <h3>Elevation gain: {this.props.hike.elevationGain} feet</h3>
          <h3>Description: {this.props.hike.description}</h3>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default HikeBox;
