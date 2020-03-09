import React from "react";
import { withRouter } from "react-router-dom";
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
          <button onClick={this.revertCenter}>Reset Map</button>
          <div className="map" style={{ height: `700px`, width: `100%` }}>
            <IndexMap
              zoom={this.state.mapZoom}
              center={this.state.mapCenter}
              hikes={this.props.hikes}
              mapCenter={this.state.mapCenter}
              mapZoom={this.state.mapZoom}
              changeCenter={this.changeCenter}
              revertCenter={this.revertCenter}
            />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Hikes);
