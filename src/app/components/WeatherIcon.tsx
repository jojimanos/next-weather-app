import React from "react";
import { cn } from "../utils/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {};

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & {
    iconStats: {
      iconCode: string;
      captionText: string;
      iconColor: string;
    };
  }
) {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      <FontAwesomeIcon
        height={100}
        width={100}
        color={props.iconStats.iconColor}
        className="absolute h-full w-full"
        //@ts-ignore
        icon={props.iconStats.iconCode}
      />
      <span className="hidden absolute top-12">{props.iconStats.captionText}</span>
    </div>
  );
}
