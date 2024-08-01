export function weatherCodeIcon(
  weatherCode: number,
  isDayOrNight: string
): { iconCode: string; captionText: string; iconColor: string } {
  switch (weatherCode) {
    case 0: {
      const iconCode =
        isDayOrNight === "DAY" ? "fa-solid fa-sun" : "fa-solid fa-moon";
      const captionText = "Clear Sky";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 1: {
      const iconCode =
        isDayOrNight === "DAY"
          ? "fa-solid fa-cloud-sun"
          : "fa-solid fa-cloud-moon";
      const captionText = "Mainly Clear";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 2: {
      const iconCode = "fa-solid fa-cloud";
      const captionText = "Partly Cloudy";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 3: {
      const iconCode = "fa-solid fa-cloud";
      const captionText = "Overcast";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 45: {
      const iconCode = "fa-solid fa-smog";
      const captionText = "Fog";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 48: {
      const iconCode = "fa-solid fa-smog";
      const captionText = "Rime Fog";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 51: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Light Drizzle";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 53: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Moderate Drizzle";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 55: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Dense Drizzle";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 56: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Light Freezing Drizzle";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 57: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Dense Freezing Drizzle";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 61: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Slight Rain";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 63: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Moderate Rain";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 65: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Heavy Rain";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 66: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Light Freezing Rain";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 67: {
      const iconCode = "fa-solid fa-cloud-rain";
      const captionText = "Heavy Freezing Rain";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 71: {
      const iconCode = "fa-solid fa-snowflake";
      const captionText = "Slight Snowfall";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 73: {
      const iconCode = "fa-solid fa-snowflake";
      const captionText = "Moderate Snowfall";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 75: {
      const iconCode = "fa-solid fa-snowflake";
      const captionText = "Heavy Snowfall";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 77: {
      const iconCode = "fa-solid fa-snowflake";
      const captionText = "Snow grains";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 80: {
      const iconCode = "fa-solid fa-cloud-showers-heavy";
      const captionText = "Slight Rain Showers";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 81: {
      const iconCode = "fa-solid fa-cloud-showers-heavy";
      const captionText = "Moderate Rain Showers";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 82: {
      const iconCode = "fa-solid fa-cloud-showers-heavy";
      const captionText = "Violent Rain Showers";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 85: {
      const iconCode = "fa-solid fa-snowflake";
      const captionText = "Slight Snow Showers";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 86: {
      const iconCode = "fa-solid fa-snowflake";
      const captionText = "Heavy Snow Showers";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 95: {
      const iconCode = "fa-solid fa-cloud-bolt";
      const captionText = "Thunderstorm";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 96: {
      const iconCode = "fa-solid fa-cloud-bolt";
      const captionText = "Thunderstorm";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    case 99: {
      const iconCode = "fa-solid fa-cloud-bolt";
      const captionText = "Thunderstorm";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
    default: {
      const iconCode = "fa-solid fa-cloud-bolt";
      const captionText = "Thunderstorm";
      const iconColor = "black";
      return { iconCode, captionText, iconColor };
    }
  }
}
