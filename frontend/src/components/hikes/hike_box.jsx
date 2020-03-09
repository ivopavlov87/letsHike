import React from "react";
import { Link } from "react-router-dom";


class HikeBox extends React.Component {

  render() {

    let deleteButton = "";
    if (
      // below conditional is general conditional
      (this.props.currentUser && this.props.hike &&
      (this.props.hike.user._id === this.props.currentUser.id)) ||

      // admin user power
      (this.props.currentUser.adminType && this.props.hike)
    ) {
      deleteButton = (
        <div>
          <Link to={this.props.deleteDestination} onClick={() => this.props.deleteHike(this.props.hike.id)}>Delete Hike</Link>
          {' '}
          <Link to={`/hikes/${this.props.hike.id}/edit`}>Update Hike</Link>
        </div>
      );
    }

    if (this.props.hike) {
      return (
        <div>
          <h3>
            <Link to={`/hikes/${this.props.hike.id}`}>
              {this.props.hike.trailheadName}
            </Link>
          </h3>
          <h3>
            Hike submitted by:&nbsp;
            <Link to={`/users/${this.props.hike.user._id}`}>
              {this.props.hike.user.username}
            </Link>
          </h3>
          <h3>{this.props.hike.state}</h3>
          <h3>Round trip: {this.props.hike.distance.toLocaleString()} miles</h3>
          <h3>
            Elevation gain: {this.props.hike.elevationGain.toLocaleString()}{" "}
            feet
          </h3>
          <h3>Description: {this.props.hike.description}</h3>
          <h3>Button Under here</h3>
          <h3>{deleteButton}</h3>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default HikeBox;
