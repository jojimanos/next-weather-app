"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import { weatherCodeIcon } from "./utils/weatherCodeIcon";
import { isDayOrNight } from "./utils/isDayOrNight";
import WeatherDetails from "./components/WeatherDetails";
import ForecastWeatherDetail from "./components/ForecastWeatherDetail";
import { useContext, useEffect, useState } from "react";
import LocationContext from "./locationContext";
import { GET } from "./api/cities/route";

interface WeatherData {}

export default function Home() {
  const [location, locationDispatch] = useContext(LocationContext);
  const [locationData, setLocationData] = useState();

  useEffect(() => {
    if (!location.city) return;

    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `api/cities?location=${encodeURIComponent(
            location.city
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setLocationData(data[0]);
          console.log("DATA", data[0], locationData);
        } else {
          console.error("Location data not found.");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, [location]);

  const { isPending, error, data } = useQuery({
    queryKey: [location, locationData],
    queryFn: async () => {
      const { data } = await axios.get(
        //@ts-ignore next-line
        `https://api.open-meteo.com/v1/forecast?latitude=${locationData.lat}&longitude=${locationData.lng}&current=apparent_temperature,temperature_2m,surface_pressure,relative_humidity_2m,is_day,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=surface_pressure,temperature_2m,rain,weather_code,visibility,relative_humidity_2m&daily=apparent_temperature_max,apparent_temperature_min,weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_direction_10m_dominant,wind_speed_10m_max`
      );
      console.log("data", data);
      return data;
    },
  });

  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (!locationData) return <div>Loading...</div>;

  console.log("This is the location Data", locationData);

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/*Today data*/}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(data.current.time ?? ""), "EEEE")}</p>
              <p className="text-lg">
                {format(parseISO(data.current.time ?? ""), "dd.MM.yyyy")}
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              {/*Time and weather icon*/}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {data.current.temperature_2m}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{data.current.apparent_temperature}°C</span>
                </p>
                <p className="text-sm space-x-2">
                  <span>{data.daily.temperature_2m_min[0]}°C↓ </span>
                  <span>{data.daily.temperature_2m_max[0]}°C↑ </span>
                </p>
              </div>
              {/*time and weather icon*/}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data.hourly.time.slice(0, 25).map((h: string, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-sm font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(h), "h:mm a")}
                    </p>
                    <p className="whitespace-nowrap">
                      {`${data.hourly.temperature_2m[i]}°C`}
                    </p>
                    <p>
                      {/* <WeatherIcon iconName={"fa-solid fa-sun"} /> */}
                      <WeatherIcon
                        iconStats={weatherCodeIcon(
                          data.hourly.weather_code[i],
                          isDayOrNight(data.hourly.time[i])
                        )}
                      />
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/* left */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize"></p>
              <WeatherIcon
                iconStats={weatherCodeIcon(
                  data.current.weather_code,
                  isDayOrNight(data.current.time)
                )}
              />
            </Container>
            <Container className="bg-yellow-300/50 px-6 gap-4 justify-between overflow-auto">
              <WeatherDetails
                airPressure={`${data.current.surface_pressure} hPa`}
                visibility={`${data.hourly.visibility[0] / 1000} m`}
                humidity={`${data.current.relative_humidity_2m} %`}
                windSpeed={`${data.current.wind_speed_10m} km/h`}
                windDirection={data.current.wind_direction_10m}
                sunrise={format(parseISO(data.daily.sunrise[0] ?? ""), "H:m")}
                sunset={format(parseISO(data.daily.sunset[0] ?? ""), "H:m")}
              />
            </Container>
            {/*right */}
          </div>
        </section>

        {/*7 day data*/}
        <section className="flex w-full flex-col gap-4 ">
          <p className="text-2xl">Forecast (7days)</p>
          {/*@ts-ignore next-line*/}
          {data.daily.time.map((d, i) => (
            <ForecastWeatherDetail
              key={i}
              weatherCode={data.daily.weather_code[i]}
              date={format(parseISO(data.daily.time[i]), "dd.MM")}
              day={format(parseISO(data.daily.time[i]), "EEEE")}
              temp={(
                (data.daily.temperature_2m_max[i] +
                  data.daily.temperature_2m_min[i]) /
                2
              ).toFixed(1)}
              feels_like={(
                (data.daily.apparent_temperature_max[i] +
                  data.daily.apparent_temperature_min[i]) /
                2
              ).toFixed(1)}
              temp_min={data.daily.temperature_2m_min[i]}
              temp_max={data.daily.temperature_2m_max[i]}
              airPressure={`${(
                data.hourly.surface_pressure
                  .slice(0 + i * 24, 24 + i * 24)
                  .reduce((acc: number, curr: number) => acc + curr, 0) / 24
              ).toFixed(1)} hPa (mean)`}
              visibility={`${(
                data.hourly.visibility
                  .slice(0 + i * 24, 24 + i * 24)
                  .reduce((acc: number, curr: number) => acc + curr, 0) / 24000
              ).toFixed()} km (mean)`}
              humidity={`${(
                data.hourly.relative_humidity_2m
                  .slice(0 + i * 24, 24 + i * 24)
                  .reduce((acc: number, curr: number) => acc + curr, 0) / 24
              ).toFixed(1)} % (mean)`}
              windSpeed={`${data.daily.wind_speed_10m_max[i]} km/h (max)`}
              windDirection={data.daily.wind_direction_10m_dominant[i]}
              sunrise={format(parseISO(data.daily.sunrise[i] ?? ""), "H:m")}
              sunset={format(parseISO(data.daily.sunset[i] ?? ""), "H:m")}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
