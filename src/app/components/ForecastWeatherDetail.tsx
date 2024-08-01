import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { weatherCodeIcon } from "../utils/weatherCodeIcon";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherCode: string;
  date: string;
  day: string;
  temp: string;
  feels_like: string;
  temp_min: number;
  temp_max: number;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  return (
    <Container className="gap-4">
      {/*left*/}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon
            iconStats={weatherCodeIcon(Number(props.weatherCode), "DAY")}
          />
          <p>{props.date}</p>
          <p className="text-sm">{props.day}</p>
        </div>

        <div className="flex flex-col px-4">
          <span className="text-5xl">{props.temp}C</span>
          <p className="text-sm space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{props.feels_like}C</span>
          </p>
        </div>
      </section>
      {/*right*/}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
