import React from "react";
import { IconType } from "react-icons";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";
import { WiDirectionUpRight } from "react-icons/wi";
import { windDirectionFunction } from "../utils/windDirection";

export interface WeatherDetailProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  windDirection: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {

    const windDirectionStats = windDirectionFunction(props.windDirection)

    const {icon: IconComponent, value} = windDirectionStats
    
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visibility"
        value={props.visibility}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={props.humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Wind Speed"
        value={props.windSpeed}
      />
      <SingleWeatherDetail
        icon={IconComponent}
        information={"Wind Direction"}
        value={value}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="Air Presure"
        value={props.airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={props.sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Sunset"
        value={props.sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
