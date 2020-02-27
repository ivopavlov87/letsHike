import React from "react";
import { withRouter } from "react-router-dom";
import HikeBox from "./hike_box";

class Hike extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hikes: []
    };
  }

  componentWillMount() {
    this.props.fetchHikes();
  }

  componentWillReceiveProps(newState) {
    this.setState({ hikes: newState.hikes });
  }

  render() {
    if (this.state.hikes.length === 0) {
      return <div>There are no Hikes</div>;
    } else {
      return (
        <div>
          <h2>All Hikes</h2>
          {this.state.hikes.map(hike => (
            <HikeBox key={hike._id} hike={hike} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Hike);
