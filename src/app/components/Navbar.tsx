import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaSun } from "react-icons/fa6";
import { MdLocationSearching } from "react-icons/md";
import { TiLocationOutline } from "react-icons/ti";
import Searchbox from "./Searchbox";
import LocationContext from "../locationContext";
import { GET } from "../api/cities/route";

function Navbar() {
  const [location, locationDispatch] = useContext(LocationContext);

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function HandleSubmit() {
    locationDispatch({ type: "NEWLOCATION", city: city });
  }

  console.log(location);
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
            <MdLocationSearching className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
            <TiLocationOutline className="text-3xl" />
            <p className="text-slate-900/80 text-sm">{location.city}</p>
            <div className="relative hidden md:flex">
              <Searchbox
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onClick={HandleSubmit}
                className=""
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <Searchbox
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onClick={HandleSubmit}
            className=""
          />
        </div>
      </section>
    </>
  );
}

Navbar.propTypes = {};

export default Navbar;
