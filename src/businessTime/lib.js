import { TYPE_PM } from "./Constants";

export const isNumeric = (str) => {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
};

export const isValidDate = ({ hourStr, minuteStr, timeType }) => {
  if (!isNumeric(hourStr) || !isNumeric(minuteStr) ) return false;

  const tmpHourStr = (
    timeType === TYPE_PM ? parseInt(hourStr, 10) + 12 : parseInt(hourStr, 10)
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const tmpMinuteStr = (parseInt(minuteStr,10)).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const timeStr = `${tmpHourStr}:${tmpMinuteStr}`;
  const d = new Date(`1987-02-11T${timeStr}+00:00`);
  return d instanceof Date && !isNaN(d);
};

export const TimeStr2DateTime = ({ hourStr, minuteStr, timeType }) => {
  const hour =
    timeType === TYPE_PM ? parseInt(hourStr, 10) + 12 : parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const correctHourStr = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const correctMinuteStr = minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const timeStr = `${correctHourStr}:${correctMinuteStr}`;
  return new Date(`1987-02-11T${timeStr}+00:00`);
};

export const isStartTimeEarlierThanEndTime = ({
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
    isPm: startTimeType === TYPE_PM,
  });
  const end = TimeStr2DateTime({
    hourStr: endHourStr,
    minuteStr: endMinuteStr,
    isPm: endTimeType === TYPE_PM,
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
    isPm: startTimeType === TYPE_PM,
  });
  const end = TimeStr2DateTime({
    hourStr: endHourStr,
    minuteStr: endMinuteStr,
    isPm: endTimeType === TYPE_PM,
  });

  if (end > start) return true;
  else return false;
};
