import React from "react";
import { IconType } from "react-icons";
import {
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionLeft,
  WiDirectionRight,
  WiDirectionUp,
  WiDirectionUpLeft,
} from "react-icons/wi";
import { WiDirectionUpRight } from "react-icons/wi";
import { GiMisdirection } from "react-icons/gi";

interface windDirectionFunctionResults {
  icon: React.ReactNode;
  value: string;
}

export function windDirectionFunction(
  directionInDegreesString: string
): windDirectionFunctionResults {
  const iconProps = {
    width: 50,
    height: 50,
  };

  const directionInDegreesNumber: number = Number(directionInDegreesString);

  if (directionInDegreesNumber > 30 && directionInDegreesNumber <= 60) {
    return {
      icon: WiDirectionDownLeft({ size: 70 }),
      value: "Northeast",
    };
  } else if (directionInDegreesNumber > 60 && directionInDegreesNumber <= 120) {
    return {
      icon: WiDirectionLeft({ size: 70 }),
      value: "East",
    };
  } else if (
    directionInDegreesNumber > 120 &&
    directionInDegreesNumber <= 150
  ) {
    return {
      icon: WiDirectionUpLeft({ size: 70 }),
      value: "Southeast",
    };
  } else if (
    directionInDegreesNumber > 150 &&
    directionInDegreesNumber <= 210
  ) {
    return {
      icon: WiDirectionUp({ size: 70 }),
      value: "South",
    };
  } else if (
    directionInDegreesNumber > 210 &&
    directionInDegreesNumber <= 240
  ) {
    return {
      icon: WiDirectionUpRight({ size: 70 }),
      value: "Souwest",
    };
  } else if (
    directionInDegreesNumber > 240 &&
    directionInDegreesNumber <= 300
  ) {
    return {
      icon: WiDirectionRight({ size: 70 }),
      value: "West",
    };
  } else if (
    directionInDegreesNumber > 300 &&
    directionInDegreesNumber <= 330
  ) {
    return {
      icon: WiDirectionDownRight({ size: 70 }),
      value: "Northwest",
    };
  } else {
    return {
      icon: WiDirectionDown({ size: 70 }),
      value: "North",
    };
  }
}
