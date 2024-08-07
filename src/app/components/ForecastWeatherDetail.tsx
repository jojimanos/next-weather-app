import React, { useState } from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { weatherCodeIcon } from "../utils/weatherCodeIcon";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherCode: string;
  date: string;
  day: string;
  maxTemp: string;
  minTemp: string;
  max_feels_like: string;
  min_feels_like: string;
  temp_min: number;
  temp_max: number;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const [maxMin, setMaxMin] = useState(true);

  return (
    <Container className="gap-4">
      {/*left*/}
      <section className="flex gap-2 sm:gap-4 items-center px-2 sm:px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon
            iconStats={weatherCodeIcon(Number(props.weatherCode), "DAY")}
          />
          <p>{props.date}</p>
          <p className="text-sm">{props.day}</p>
        </div>
        <div className="flex flex-col px-2 sm:px-4">
          {maxMin === true && (
            <>
              <span>Max</span>
              <span
                onClick={() => setMaxMin(false)}
                className="hover:cursor-pointer text-3xl sm:text-5xl"
              >
                {props.maxTemp}C
              </span>
            </>
          )}
          {maxMin === false && (
            <>
              <span>Min</span>
              <span
                onClick={() => setMaxMin(true)}
                className="hover:cursor-pointer text-3xl sm:text-5xl"
              >
                {props.minTemp}C
              </span>
            </>
          )}
          <p className="text-sm space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            {maxMin === true && <span>{props.max_feels_like}C</span>}
            {maxMin === false && <span>{props.min_feels_like}C</span>}
          </p>
        </div>
      </section>
      {/*right*/}
      <section className="overflow-x-auto flex justify-between gap-4 sm-px-4 w-full pr-5 sm:pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
