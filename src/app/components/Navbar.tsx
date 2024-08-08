"use-client";

import React, {
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaSun } from "react-icons/fa6";
import { MdLocationSearching } from "react-icons/md";
import { TiLocationOutline } from "react-icons/ti";
import Searchbox from "./Searchbox";
import LocationContext from "../locationContext";

export interface suggestionInterface {
  id: string;
  name: string;
  country: string;
  admin1: string;
}

function Navbar() {
  const [location, locationDispatch] = useContext(LocationContext);

  const [city, setCity] = useState("");
  const [errorMsg, setError] = useState<string>("");

  const [suggestions, setSuggestions] = useState<suggestionInterface[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [loadingCurrentLocation, setLoadingCurrentLocation] = useState(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await fetch(`/api/names?value=^${value}`);
        const data = await response.json();
        setSuggestions(data);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    locationDispatch({ type: "NEWLOCATION", city: city });
    locationDispatch({ type: "CURRENTLOCATION", longitude: "", latitude: "" });
  }

  function HandleCurrentLocation() {
    if ("geolocation" in navigator) {
      setLoadingCurrentLocation(true);
      navigator.geolocation.getCurrentPosition(
        (p) => {
          console.log(p.coords.longitude, p.coords.latitude);
          locationDispatch({
            type: "CURRENTLOCATION",
            longitude: p.coords.longitude,
            latitude: p.coords.latitude,
          });
          console.log(location, loadingCurrentLocation);
        },
        (error) => {
          console.log("There wa an error while finding location");
          setLoadingCurrentLocation(false);
        }
      );
      console.log("CLICKED");
      // navigator.permissions.query({ name: "geolocation" }).then((result) => {
      // if (result.state === "granted") {
      // console.log("Permision Granted");
      setLoadingCurrentLocation(true);
      // } else if (result.state === "prompt") {
      // setLoadingCurrentLocation(false);
      // }
      // });
    }
  }

  function handleSuggestionClick(item: string) {
    setCity(item);
    setShowSuggestions(false);
    console.log(city);
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 max-auto">
          <p className="flex items-center justify-center gap-2 ">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <a href="#top-of-the-app">
              <FaSun className="text-3xl mt-1 text-orange-500" />
            </a>
          </p>
          <section className="flex gap-2 items-center">
            <MdLocationSearching
              title="Your current location"
              onClick={HandleCurrentLocation}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            {loadingCurrentLocation === true ? (
              <div className="flex items-center min-h-screen justify-center">
                <p className="animate-bounce">Loading...</p>
              </div>
            ) : null}
            {location.longitude && location.latitude && (
              <span>
                {location.longitude.toFixed(2)} {location.latitude.toFixed(2)}
              </span>
            )}
            {!location.longitude && !location.latitude && (
              <>
                <TiLocationOutline className="text-3xl" />
                <p className="text-slate-900/80 text-sm">{location.city}</p>
              </>
            )}
            <div className="relative hidden md:flex">
              <Searchbox
                value={city}
                onChange={(e) => handleInputChange(e.target.value)}
                onClick={HandleSubmit}
                className=""
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  setSuggestions,
                  handleSuggestionClick,
                  errorMsg,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <Searchbox
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
            onClick={HandleSubmit}
            className=""
          />
          <SuggestionBox
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            errorMsg={errorMsg}
          />
        </div>
      </section>
    </>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  setSuggestions,
  handleSuggestionClick,
  errorMsg,
}: {
  showSuggestions: boolean;
  suggestions: suggestionInterface[];
  setSuggestions: React.Dispatch<React.SetStateAction<suggestionInterface[]>>;
  handleSuggestionClick: (item: string) => void;
  errorMsg: string;
}) {
  const listReference = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (listReference.current && !listReference.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [listReference, suggestions]);

  return (
    <>
      {((showSuggestions && suggestions.length >= 1) || errorMsg) && (
        <ul
          ref={listReference}
          className="mb-4 bg-white z-10 overflow-scroll max-h-screen absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2"
        >
          {errorMsg && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{errorMsg}</li>
          )}
          {suggestions.map((item, i: number) => (
            <li
              onClick={() => handleSuggestionClick(item.name)}
              key={i}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item.name} {item.country} {item.admin1}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Navbar;
