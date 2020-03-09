import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Link } from "react-router-dom";

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
            title={hike.trailheadName}
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
      <GoogleMap defaultZoom={15} center={center} mapTypeId={"terrain"}>
        {otherHikeMarkers}
        <Marker
          position={center}
          title={props.hike.trailheadName}
          onClick={() => {
            if (selectedHike) setSelectedHike(null);
            setSelectedHike(props.hike);
          }}
          icon={{
            url: "/blue_marker.png",
            scaledSize: new window.google.maps.Size(60, 60)
          }}
        />
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
              <p>
                Elevation gain: {selectedHike.elevationGain.toLocaleString()}{" "}
                feet
              </p>
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