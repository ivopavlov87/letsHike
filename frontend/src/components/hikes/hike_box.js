import React from "react";
import { Link } from "react-router-dom";


class HikeBox extends React.Component {
  // constructor(props){
  //   super(props)
  // }

  render() {

    let deleteButton = "";
    if (this.props.currentUser && this.props.hike.user === this.props.currentUser.id){
      deleteButton = <Link to={`/hikes`} onClick={() => this.props.deleteHike(this.props.hike._id)}>Delete Hike</Link>
    }

    if (this.props.hike){
      // {console.log("props", this.props)}
      return (
        <div>
          <h3>{this.props.hike.trailheadName}</h3>
          <h3>{this.props.hike.state}</h3>
          <h3>Round trip: {this.props.hike.distance} miles</h3>
          <h3>Elevation gain: {this.props.hike.elevationGain} feet</h3>
          <h3>Description: {this.props.hike.description}</h3>
          <h3>Button Under here</h3>
          <h3>{deleteButton}</h3>
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
