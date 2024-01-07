import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  // Set an arbitrary location (Paris)
  const arbitraryLocation = { lat: 48.8566, lng: 2.3522 };

  const containerStyle = {
    width: "100%",
    height: "320px",
    borderRadius: "20px",
    marginRight:"40px",
    marginTop:"20px",
    marginBottom:"20px"
  };

  const markers = [
    { lat: 18.5204, lng: 73.8567 },
    { lat: 18.5314, lng: 73.8446 },
    { lat: 18.5642, lng: 73.7769 },
  ];

  const mapCenter = arbitraryLocation;

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
      >
        {/* Display a Marker at the arbitrary location */}
        {markers.map(({ lat, lng }) => (
          <Marker position={{ lat, lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
