import { useState, useContext, createContext, useMemo } from "react";
import { TYPE_AM, TYPE_PM } from "./Constants";

const PreiodContext = createContext();

const usePeriodContext = () => {
  const context = useContext(PreiodContext);
  if (!context)
    throw new Error("usePeriodContext must be used within PeriodProvider!");
  return context;
};
const PeriodContextProvider = ({
  defaultStartTime = null,
  defaultEndTime = null,
  ...props
}) => {
  const [startTimeType, setStartTimeType] = useState(
    defaultStartTime ? defaultStartTime.timeType : TYPE_AM
  );
  const [endTimeType, setEndTimeType] = useState(
    defaultEndTime ? defaultEndTime.timeType : TYPE_AM
  );
  const [startHourStr, setStartHourStr] = useState(
    defaultStartTime ? defaultStartTime.hourStr : ""
  );
  const [endHourStr, setEndHourStr] = useState(
    defaultEndTime ? defaultEndTime.hourStr : ""
  );
  const [startMinuteStr, setStartMinuteStr] = useState(
    defaultStartTime ? defaultStartTime.minuteStr : ""
  );
  const [endMinuteStr, setEndMinuteStr] = useState(
    defaultEndTime ? defaultEndTime.minuteStr : ""
  );
 
  const [isStartTimeValid, setIsStartTimeValid] = useState(false);
  const [isEndTimeValid, setIsEndTimeValid] = useState(false);
  const [startTimeErrMessage, setStartTimeErrMessage] = useState("");
  const [endTimeErrMessage, setEndTimeErrMessage] = useState("");
  const [isStartTimeRangeValid, setIsStartTimeRangeValid] = useState(true);
  const [startTimeRangeErrMessage, setStartTimeRangeErrMessage] = useState("");
  const [isEndTimeRangeValid, setIsEndTimeRangeValid] = useState(true);
  const [endTimeRangeErrMessage, setEndTimeRangeErrMessage] = useState("");

  // here we pass our value to useMemo,
  // and tell useMemo to only give us new values
  // when count or message change
  const value = useMemo(
    () => ({
      startTimeType,
      setStartTimeType,
      endTimeType,
      setEndTimeType,
      startHourStr,
      setStartHourStr,
      endHourStr,
      setEndHourStr,
      startMinuteStr,
      setStartMinuteStr,
      endMinuteStr,
      setEndMinuteStr,
      isStartTimeValid,
      setIsStartTimeValid,
      isEndTimeValid,
      setIsEndTimeValid,
      startTimeErrMessage,
      setStartTimeErrMessage,
      endTimeErrMessage,
      setEndTimeErrMessage,
      isStartTimeRangeValid,
      setIsStartTimeRangeValid,
      startTimeRangeErrMessage,
      setStartTimeRangeErrMessage,
      isEndTimeRangeValid,
      setIsEndTimeRangeValid,
      endTimeRangeErrMessage,
      setEndTimeRangeErrMessage
    }),
    [
      startTimeType,
      endTimeType,
      startHourStr,
      endHourStr,
      startMinuteStr,
      endMinuteStr,
      isStartTimeValid,
      isEndTimeValid,
      startTimeErrMessage,
      endTimeErrMessage,
      isStartTimeRangeValid,
      startTimeRangeErrMessage,
      isEndTimeRangeValid,
      endTimeRangeErrMessage
    ]
  );
  return <PreiodContext.Provider value={value} {...props} />;
};

export { usePeriodContext, PeriodContextProvider };
