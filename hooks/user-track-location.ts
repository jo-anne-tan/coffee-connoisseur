import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [latlong, setLatlong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success: PositionCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocationErrorMessage("");
    setLatlong(`${latitude},${longitude}`);
    setIsFindingLocation(false);
  };

  const error: PositionErrorCallback = () => {
    setIsFindingLocation(false);
    setLocationErrorMessage("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (navigator.geolocation) {
      setLocationErrorMessage("");
      setIsFindingLocation(true);
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setIsFindingLocation(false);
      setLocationErrorMessage("Geolocation is not supported by your browser");
    }
  };
  return {
    latlong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
