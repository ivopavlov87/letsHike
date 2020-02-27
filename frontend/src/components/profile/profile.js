import React from "react";
import HikeBox from "../hikes/hike_box";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hikes: []
    };
  }

  componentWillMount() {
    console.log(this.props.currentUser.id);
    this.props.fetchUserHikes(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
    this.setState({ hikes: newState.hikes });
  }

  render() {
    if (this.state.hikes.length === 0) {
      return <div>This user has not made any Hikes</div>;
    } else {
      return (
        <div>
          <h2>All of This User's Hikes</h2>
          {this.state.hikes.map(hike => (
            <HikeBox key={hike._id} text={hike.text} />
          ))}
        </div>
      );
    }
  }
}

export default Profile;
