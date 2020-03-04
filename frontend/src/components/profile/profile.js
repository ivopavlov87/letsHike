import React from "react";
import HikeBox from "../hikes/hike_box";

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserHikes(this.props.userId);
    this.props.fetchUser(this.props.userId);
  }

  componentDidUpdate(previousProps) {
    // ensures re-render when changing which user profile
    // you are looking at
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchUserHikes(this.props.userId);
    }
  }

  topOfProfile(){
    return this.props.user ? this.props.user.username : ""
  }

  render() {

    console.log("props", this.props)

    if (this.props.hikes.length === 0) {
      return <div>This user has not made any Hikes</div>;
    } else {
      return (
        <div>
          <h2>All of {this.topOfProfile()}'s Hikes</h2>
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
