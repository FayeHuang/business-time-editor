import { useState, useContext, createContext, useMemo } from "react";
import { TYPE_AM, TYPE_PM } from "./Constants";

const PreiodContext = createContext();

const usePeriodContext = () => {
  const context = useContext(PreiodContext);
  if (!context)
    throw new Error("usePeriodContext must be used within PeriodProvider!");
  return context;
};
const PeriodContextProvider = (props) => {
  const [startTimeType, setStartTimeType] = useState(TYPE_AM);
  const [endTimeType, setEndTypeTime] = useState(TYPE_AM);
  const [startHourStr, setStartHourStr] = useState("");
  const [endHourStr, setEndHourStr] = useState("");
  const [startMinuteStr, setStartMinuteStr] = useState("");
  const [endMinuteStr, setEndMinuteStr] = useState("");
  const [is24, setIs24] = useState(false);
  const [isStartTimeValid, setIsStartTimeValid] = useState(false);
  const [isEndTimeValid, setIsEndTimeValid] = useState(false);
  const [startTimeErrMessage, setStartTimeErrMessage] = useState("");
  const [endTimeErrMessage, setEndTimeErrMessage] = useState("");
  const [isStartTimeRangeValid, setIsStartTimeRangeValid] = useState(false);
  const [startTimeRangeErrMessage, setStartTimeRangeErrMessage] = useState("");
  const [isEndTimeRangeValid, setIsEndTimeRangeValid] = useState(false);
  const [endTimeRangeErrMessage, setEndTimeRangeErrMessage] = useState("");

  // here we pass our value to useMemo,
  // and tell useMemo to only give us new values
  // when count or message change
  const value = useMemo(
    () => ({
      startTimeType,
      setStartTimeType,
      endTimeType,
      setEndTypeTime,
      startHourStr,
      setStartHourStr,
      endHourStr,
      setEndHourStr,
      startMinuteStr,
      setStartMinuteStr,
      endMinuteStr,
      setEndMinuteStr,
      is24,
      setIs24,
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
      is24,
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
