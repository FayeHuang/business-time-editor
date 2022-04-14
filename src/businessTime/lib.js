import { TYPE_PM } from "./Constants";

export const isNumeric = (str) => {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
};

export const TimeStr2DateTime = ({ hoursStr, minutesStr, isPm = true }) => {
  const hour = isPm ? parseInt(hoursStr, 10) + 12 : parseInt(hoursStr, 10);
  const minute = parseInt(minutesStr, 10);
  const correctHourStr = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const correctMinuteStr = minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const timeStr = `${correctHourStr}:${correctMinuteStr}`;
  console.log(timeStr);
  return new Date(`1987-02-11T${timeStr}+00:00`);
};

export const isHoursValid = (hoursStr) => {
  if (!isNumeric(hoursStr)) return false;

  const hour = parseInt(hoursStr, 10);
  if (0 <= hour && hour <= 12) return true;
  else return false;
};

export const isMinutesValid = (minutesStr) => {
  if (!isNumeric(minutesStr)) return false;

  const minute = parseInt(minutesStr, 10);
  if (0 <= minute && minute <= 59) return true;
  else return false;
};

export const isStartTimeEarlierThanEndTime = ({
  hoursStr,
  minutesStr,
  startTimeType,
  endTimeType,
  endHourStr,
  endMinuteStr
}) => {
  if (hoursStr.length === 0 || minutesStr.length === 0) return true;

  const start = TimeStr2DateTime({
    hoursStr,
    minutesStr,
    isPm: startTimeType === TYPE_PM
  });
  const end = TimeStr2DateTime({
    hoursStr: endHourStr,
    minutesStr: endMinuteStr,
    isPm: endTimeType === TYPE_PM
  });

  if (start < end) return true;
  else return false;
};

export const isEndTimeLaterThanStartTime = ({
  hoursStr,
  minutesStr,
  startTimeType,
  endTimeType,
  startHourStr,
  startMinuteStr
}) => {
  if (hoursStr.length === 0 || minutesStr.length === 0) return true;

  const start = TimeStr2DateTime({
    hoursStr: startHourStr,
    minutesStr: startMinuteStr,
    isPm: startTimeType === TYPE_PM
  });
  const end = TimeStr2DateTime({
    hoursStr,
    minutesStr,
    isPm: endTimeType === TYPE_PM
  });

  if (end > start) return true;
  else return false;
};

export const isTimeValid = ({ hoursStr, minutesStr, isPm }) => {
  if (hoursStr.length === 0 || minutesStr.length === 0) return true;

  const target = TimeStr2DateTime({
    hoursStr,
    minutesStr,
    isPm
  });
  const dayBegin = TimeStr2DateTime({
    hoursStr: "00",
    minutesStr: "00",
    isPm: false
  });
  const dayEnd = TimeStr2DateTime({
    hoursStr: "24",
    minutesStr: "00",
    isPm: false
  });
  if (target >= dayBegin && target <= dayEnd) return true;
  else return false;
};
