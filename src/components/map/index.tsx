import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const containerStyle = {
    height: '600px',
    width: '100%',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCWsZuRrkZE0EeOjQu-ajyW0utrM-UZ82M">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
