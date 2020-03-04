import React from "react";
import HikeBox from "../hikes/hike_box";

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserHikes(this.props.userId);
  }

  componentDidUpdate(previousProps) {
    // ensures re-render when changing which user profile
    // you are looking at
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchUserHikes(this.props.userId);
    }
  }

  render() {

    if (this.props.hikes.length === 0) {
      return <div>This user has not made any Hikes</div>;
    } else {
      return (
        <div>
          <h2>All of This User's Hikes</h2>
          {this.props.hikes.map(hike => (
            <HikeBox
              key={hike.id}
              hike={hike}
              deleteHike={this.props.deleteHike}
              currentUser={this.props.currentUser}
            />
          ))}
        </div>
      );
    }
  }
}

export default Profile;
