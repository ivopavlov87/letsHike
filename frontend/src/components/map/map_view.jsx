import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Link } from "react-router-dom";

// class Map extends React.Component {
//   constructor(props){
//     super(props)

//     this.state = {
//       center: { lat: this.props.hike.lat, lng: this.props.hike.lng },
//       lat: this.props.hike.lat,
//       lng: this.props.hike.lng
//     };
//   }

//   componentDidUpdate(prevProps, prevState){
//     if (prevProps.hike.lat !== this.props.hike.lat || prevProps.hike.lng !== this.props.hike.lng){
//       this.setState({
//         center: { lat: this.props.hike.lat, lng: this.props.hike.lng },
//         lat: this.props.hike.lat,
//         lng: this.props.hike.lng
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <GoogleMap
//           defaultZoom={15}
//           ref="map"
//           center={this.state.center}
//           mapTypeId={"terrain"}
          
//         />
//         <Marker
//           position={{ lat: this.state.lat, lng: this.state.lng }}
//         />
//       </div>
//     );
//   }
// }

function Map(props) {

  const [selectedHike, setSelectedHike] = useState(null);

  let center = { lat: props.hike.lat, lng: props.hike.lng }

  let otherHikeMarkers = <div></div>;
  if (props.hikes){
    otherHikeMarkers = (
      <div>
        {props.hikes.filter(hike => hike.id !== props.hike.id).map(hike => (
          <Marker
            key={`${hike.id}-marker`}
            position={{ lat: hike.lat, lng: hike.lng }}
            onClick={() => {
              if (selectedHike) setSelectedHike(null);
              setSelectedHike(hike);
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <GoogleMap defaultZoom={15} defaultCenter={center} mapTypeId={"terrain"}>
        <Marker
          position={center}
          onClick={() => {
              if (selectedHike) setSelectedHike(null);
              setSelectedHike(props.hike);
          }}
          icon={{
            url: "/blue_marker.png",
            scaledSize: new window.google.maps.Size(60, 60)
          }}
        />
        {otherHikeMarkers}
        {selectedHike && (
          <InfoWindow
            position={{
              lat: selectedHike.lat,
              lng: selectedHike.lng
            }}
            onCloseClick={() => {
              setSelectedHike(null);
            }}
          >
            <div>
              <h4>
                <Link to={`/hikes/${selectedHike.id}`}>
                  {selectedHike.trailheadName}
                </Link>
              </h4>
              <p>
                Submitted by:{" "}
                <Link to={`/users/${selectedHike.user._id}`}>
                  {selectedHike.user.username}
                </Link>
              </p>
              <p>Round trip: {selectedHike.distance} miles</p>
              <p>Elevation gain: {selectedHike.elevationGain} feet</p>
              <p>{selectedHike.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;