import React from "react";
import Map from "../../components/map";
// import GeocodingComponent from "../../components/getLatLong";

const HomePage: React.FC = (): React.ReactElement => {
 
  const latitude = 13.0226048; // Example latitude
  const longitude = 80.2691275; // Example longitude

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen">
      Home
      <Map latitude={latitude} longitude={longitude} />

      {/* <GeocodingComponent /> */}
    </div>
  );
};

export default HomePage;
