import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

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
  // constructor(props){
  //   super(props)

  //   this.state = {
  //     center: { lat: this.props.hike.lat, lng: this.props.hike.lng },
  //     lat: this.props.hike.lat,
  //     lng: this.props.hike.lng
  //   };
  // }

  let center = { lat: props.hike.lat, lng: props.hike.lng }

  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        center={center}
        mapTypeId={"terrain"}
        >
        <Marker
          position={center}
        />
      </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;