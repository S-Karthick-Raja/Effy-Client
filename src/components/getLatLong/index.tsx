import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const GeocodingComponent = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const geocodeAddress = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCWsZuRrkZE0EeOjQu-ajyW0utrM-UZ82M`
      );
  
      const data = await response.json();
  
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      }
    };

    if (address) {
      geocodeAddress();
    }
  }, [address]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div>
        Latitude: {latitude}, Longitude: {longitude}
      </div>
      {isLoaded && (
        <LoadScript googleMapsApiKey="AIzaSyCWsZuRrkZE0EeOjQu-ajyW0utrM-UZ82M">
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: latitude, lng: longitude }} zoom={10}>
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default GeocodingComponent;
