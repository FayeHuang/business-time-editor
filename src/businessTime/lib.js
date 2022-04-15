import { TYPE_PM } from "./Constants";

export const isNumeric = (str) => {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
};

export const TimeStr2DateTime = ({ hourStr, minuteStr, isPm = true }) => {
  const hour = isPm ? parseInt(hourStr, 10) + 12 : parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const correctHourStr = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const correctMinuteStr = minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const timeStr = `${correctHourStr}:${correctMinuteStr}`;
  return new Date(`1987-02-11T${timeStr}+00:00`);
};

export const isHoursValid = (hourStr) => {
  if (!isNumeric(hourStr)) return false;

  const hour = parseInt(hourStr, 10);
  if (0 <= hour && hour <= 12) return true;
  else return false;
};

export const isMinutesValid = (minuteStr) => {
  if (!isNumeric(minuteStr)) return false;

  const minute = parseInt(minuteStr, 10);
  if (0 <= minute && minute <= 59) return true;
  else return false;
};

export const isStartTimeEarlierThanEndTime = ({
  startHourStr,
  startMinuteStr,
  startTimeType,
  endTimeType,
  endHourStr,
  endMinuteStr
}) => {
  const start = TimeStr2DateTime({
    hourStr: startHourStr,
    minuteStr: startMinuteStr,
    isPm: startTimeType === TYPE_PM
  });
  const end = TimeStr2DateTime({
    hourStr: endHourStr,
    minuteStr: endMinuteStr,
    isPm: endTimeType === TYPE_PM
  });

  if (start < end) return true;
  else return false;
};

export const isEndTimeLaterThanStartTime = ({
  startHourStr,
  startMinuteStr,
  startTimeType,
  endTimeType,
  endHourStr,
  endMinuteStr,
}) => {
  const start = TimeStr2DateTime({
    hourStr: startHourStr,
    minuteStr: startMinuteStr,
    isPm: startTimeType === TYPE_PM
  });
  const end = TimeStr2DateTime({
    hourStr: endHourStr,
    minuteStr: endMinuteStr,
    isPm: endTimeType === TYPE_PM
  });

  if (end > start) return true;
  else return false;
};

export const isTimeValid = ({ hourStr, minuteStr, isPm }) => {
  const target = TimeStr2DateTime({
    hourStr,
    minuteStr,
    isPm
  });
  const dayBegin = TimeStr2DateTime({
    hourStr: "00",
    minuteStr: "00",
    isPm: false
  });
  const dayEnd = TimeStr2DateTime({
    hourStr: "24",
    minuteStr: "00",
    isPm: false
  });
  if (target >= dayBegin && target <= dayEnd) return true;
  else return false;
};
