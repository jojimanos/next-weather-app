"use client"

import { createContext } from "react";
import { useReducer } from "react";

const initialState = {
    city: "Athens"
}

const locationReducer = (state, action) => {
  switch (action.type) {
    case "NEWLOCATION": {
      return {
        ...state,
        city: action.city,
      };
    }
    default:
      return state;
  }
};

const LocationContext = createContext();

export const LocationContextProvider = (props) => {
  const [location, locationDispatch] = useReducer(locationReducer, initialState);

  return (
    <LocationContext.Provider value={[location, locationDispatch]}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
