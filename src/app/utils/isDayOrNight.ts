export function isDayOrNight(dateTimeString: string) {
  const month = new Date(dateTimeString).getMonth();
  const hours = new Date(dateTimeString).getHours();

  let isDay;

  if (month === 12 || month <= 2) {
    isDay = hours >= 6 && hours <= 18;
  } else if (month >= 3 || month <= 5) {
    isDay = hours >= 6.5 && hours <= 19;
  } else if (month >= 6 || month <= 8) {
    isDay = hours >= 6.5 && hours <= 20;
  } else {
    isDay = hours >= 6 && hours <= 19;
  }
  return isDay ? "DAY" : "NIGHT";
}
