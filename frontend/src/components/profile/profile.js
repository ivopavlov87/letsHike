import React from "react";
import HikeBox from "../hikes/hike_box";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hikes: []
    };
  }

  componentDidMount() {
    this.props.fetchUserHikes(this.props.userId);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchUserHikes(this.props.userId);
    }
  }

  render() {
    console.log("profile props", this.props);
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
              fetchUser={this.props.fetchUser}
              currentUser={this.props.currentUser}
            />
          ))}
        </div>
      );
    }
  }
}

export default Profile;
