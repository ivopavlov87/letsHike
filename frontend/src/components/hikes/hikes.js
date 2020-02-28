import React from "react";
import { withRouter } from "react-router-dom";
import HikeBox from "./hike_box";

class Hikes extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    hikes: []
  };
}

  // componentWillMount() {
  //   this.props.fetchHikes();
  // }

  componentDidMount() {
    this.props.fetchHikes();
  }

  shouldComponentUpdate(prevProps, prevState){
    // this.props.fetchHikes();
    return prevProps.hikes !== this.props.hikes;
    if(prevProps.hikes !== this.props.hikes){
      console.log("hikes have changed")
      // this.setState({ hikes: this.props.fetchHikes() })
    }
  }

  // componentWillReceiveProps(newState) {
  //   this.setState({ hikes: newState.hikes });
  // }

  render() {
    // console.log("state", this.state)
    if (this.props.hikes.length === 0) {
      return <div>Loading hikes...</div>;
    } else {
      return (
        <div>
          <h2>All Hikes</h2>
          {this.props.hikes.map(hike => (
            <HikeBox
              key={hike._id}
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
