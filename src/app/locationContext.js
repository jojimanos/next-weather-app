"use client";

import { createContext } from "react";
import { useReducer } from "react";

const initialState = {
  city: "Athens",
  longitude: "",
  latitude: "",
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case "NEWLOCATION": {
      return {
        ...state,
        city: action.city,
      };
    }
    case "CURRENTLOCATION": {
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
      };
    }
    default:
      return state;
  }
};

const LocationContext = createContext();

export const LocationContextProvider = (props) => {
  const [location, locationDispatch] = useReducer(
    locationReducer,
    initialState
  );

  return (
    <LocationContext.Provider value={[location, locationDispatch]}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
