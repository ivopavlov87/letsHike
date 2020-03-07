import React from "react";
import { withRouter } from "react-router-dom";
// import HikeBox from "./hike_box";
import IndexMap from "../map/index_map";

class Hikes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      mapCenter : { lat: 38.5, lng: -96.0795 },
      mapZoom : 5,
    }

    this.changeCenter = this.changeCenter.bind(this);
    this.revertCenter = this.revertCenter.bind(this);
  }

  componentDidMount() {
    this.props.fetchHikes();
  }

  changeCenter(newLat, newLng){
    this.setState({
      mapCenter: { lat: newLat, lng: newLng },
      mapZoom: 15
    });
  }

  revertCenter(){
    this.setState({
      mapCenter: { lat: 38.5, lng: -96.0795 },
      mapZoom: 5
    });
  }

  render() {

    if (this.props.hikes.length === 0) {
      return <div>Loading hikes...</div>;
    } else {
      return (
        <div>
          <h2>All Hikes</h2>
          <br />
          <div style={{ height: `750px`, width: `100%` }}>
            <IndexMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: `100%`, width: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              hikes={this.props.hikes}
              mapCenter={this.state.mapCenter}
              mapZoom={this.state.mapZoom}
              changeCenter={this.changeCenter}
              revertCenter={this.revertCenter}
            />
          </div>
          {/* <br />
          {this.props.hikes.map(hike => (
            <HikeBox
              key={hike.id}
              hike={hike}
              deleteHike={this.props.deleteHike}
              currentUser={this.props.currentUser}
              deleteDestination={"#"}
            />
          ))} */}
        </div>
      );
    }
  }
}

export default withRouter(Hikes);
