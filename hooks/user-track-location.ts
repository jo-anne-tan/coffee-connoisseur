import { useContext, useState } from "react";
import { StoreContext } from "../context/store-context";

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const { dispatch } = useContext(StoreContext);

  const success: PositionCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocationErrorMessage("");
    dispatch({
      type: "SET_LAT_LONG",
      payload: { latLong: `${latitude},${longitude}` },
    });
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
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
