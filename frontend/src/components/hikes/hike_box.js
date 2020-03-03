import React from "react";
import { Link } from "react-router-dom";


class HikeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.currentUser.username,
    };
  }

  componentDidMount() {
    if (this.props.hike.user) {
      this.props.fetchUser(this.props.hike.user).then(res => {
        return this.setState({ user: res.user.data.username });
      });
    }
  }

  // componentDidUpdate(previousProps) {
  //   if (previousProps.match.params.id !== this.props.match.params.id) {
  //     this.props.fetchUserHikes(this.props.userId);
  //   }
  // }

  render() {
    let deleteButton = "";
    if (
      this.props.currentUser &&
      (this.props.hike.user === this.props.currentUser.id ||
        this.props.currentUser.adminType)
    ) {
      deleteButton = (
        <Link
          to={`#`}
          onClick={() =>
            this.props.deleteHike(
              this.props.hike.id ? this.props.hike.id : this.props.hike._id
            )
          }
        >
          Delete Hike
        </Link>
      );
    }

    if (this.props.hike) {
      return (
        <div>
          <h3>{this.props.hike.trailheadName}</h3>
          <h3>
            Hike submitted by:{" "}
            <Link to={`/users/${this.props.hike.user}`}>{this.state.user}</Link>
            {/* <Link to={`/users/${this.props.hike.user}`}>{this.props.user.username}</Link> */}
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
