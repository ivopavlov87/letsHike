import React, { useState } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

function Map(props) {

  const [selectedHike, setSelectedHike] = useState(null);

  let center = { lat: props.hike.lat, lng: props.hike.lng }

  let hikeMarker = <div></div>;
  if (props.hike){
    hikeMarker = (
      <Marker
        position={center}
        title={props.hike.trailheadName}
        onClick={() => {
          if (selectedHike) setSelectedHike(null);
          setSelectedHike(props.hike);
        }}
        icon={"/blue_circle_marker.png"}
      />
    );
  }

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
    <LoadScript
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
      loadingElement={<div style={{ height: "100%" }} />}
      className="map-loading-script"
    >
      <GoogleMap
        id="index-map"
        mapTypeId="terrain"
        mapContainerClassName="map-container"
        mapContainerStyle={{ height: `100%`, width: `100%` }}
        zoom={15}
        center={center}
      >
        {otherHikeMarkers}
        {hikeMarker}
        {selectedHike && (
          <InfoWindow
            position={{
              lat: selectedHike.lat,
              lng: selectedHike.lng
            }}
            onCloseClick={() => {
              setSelectedHike(null);
              // props.revertCenter();
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
    </LoadScript>
  );
}

export default Map;