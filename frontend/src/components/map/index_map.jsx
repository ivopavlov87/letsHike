import React, { useState } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import { Link } from 'react-router-dom'

function IndexMap(props) {

  const [selectedHike, setSelectedHike] = useState(null);

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
        zoom={props.zoom}
        center={props.center}
      >

      {props.hikes.map(hike => (
          <Marker
            key={`${hike.id}-marker`}
            position={{ lat: hike.lat, lng: hike.lng }}
            title={hike.trailheadName}
            onClick={() => {
              if (selectedHike) setSelectedHike(null);
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
              <p>Elevation gain: {selectedHike.elevationGain.toLocaleString()} feet</p>
              <p>{selectedHike.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default IndexMap;
