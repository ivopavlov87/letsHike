import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

class Map extends React.Component {

  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: this.props.hike.lat, lng: this.props.hike.lng }}
          mapTypeId={"terrain"}
        />
      </div>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;