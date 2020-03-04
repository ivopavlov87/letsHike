import React from "react";
import { withRouter } from "react-router-dom";
import HikeBox from "./hike_box";

class Hikes extends React.Component {

  componentDidMount() {
    this.props.fetchHikes();
  }

  render() {

    if (this.props.hikes.length === 0) {
      return <div>Loading hikes...</div>;
    } else {
      return (
        <div>
          <h2>All Hikes</h2>
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

export default withRouter(Hikes);
