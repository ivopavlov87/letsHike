import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Link } from 'react-router-dom'

function Map(props) {

  const [selectedHike, setSelectedHike] = useState(null);

  return (
    <div>
      <GoogleMap
        zoom={props.mapZoom}
        center={props.mapCenter}
        mapTypeId={"terrain"}
      >
        {props.hikes.map(hike => (
          <Marker
            key={`${hike.id}-marker`}
            position={{ lat: hike.lat, lng: hike.lng }}
            onClick={() => {
              setSelectedHike(hike);
              props.changeCenter(hike.lat, hike.lng);
            }}
          />
        ))}

        {selectedHike && (
          <InfoWindow
            position={{
              lat: selectedHike.lat,
              lng: selectedHike.lng
            }}
            onCloseClick={() => {
              setSelectedHike(null);
              props.revertCenter();
            }}
          >
            <div>
              <h4><Link to={`/hikes/${selectedHike.id}`}>{selectedHike.trailheadName}</Link></h4>
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

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
