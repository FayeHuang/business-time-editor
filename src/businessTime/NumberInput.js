import { useState } from "react";
import { FormControl, FilledInput } from "@mui/material";
import { usePeriodContext } from "./PeriodContext";
import { TYPE_PM } from "./Constants";

import {
  isHoursValid,
  isTimeValid,
  isStartTimeEarlierThanEndTime,
  isMinutesValid,
  isEndTimeLaterThanStartTime
} from "./lib";

export default function NumberInput({
  isHour = true,
  isMinute = false,
  isStartTime = true,
  isEndTime = false,
  disabled = false
}) {
  const {
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
    startTimeType,
    endTimeType,
    setStartTimeErrMessage,
    setEndTimeErrMessage,
    setIsStartTimeRangeValid,
    setStartTimeRangeErrMessage,
    setIsEndTimeRangeValid,
    setEndTimeRangeErrMessage
  } = usePeriodContext();

  const getVal = () => {
    if (isStartTime) {
      if (isHour) return startHourStr;
      else return startMinuteStr;
    } else {
      if (isHour) return endHourStr;
      else return endMinuteStr;
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (isStartTime) {
      if (isHour) {
        // start hours
        setStartHourStr(val);
        if (!isHoursValid(val)) {
          setIsStartTimeValid(false);
          setStartTimeErrMessage("錯誤的時間格式");
        } else if (
          !isTimeValid({
            hoursStr: val,
            minutesStr: startMinuteStr,
            isPm: startTimeType === TYPE_PM
          })
        ) {
          setIsStartTimeValid(false);
          setStartTimeErrMessage("錯誤的時間");
        } else {
          setIsStartTimeValid(true);
          setStartTimeErrMessage("");

          if (isEndTimeValid) {
            const sOK = isStartTimeEarlierThanEndTime({
              hoursStr: val,
              minutesStr: startMinuteStr,
              startTimeType,
              endTimeType,
              endHourStr,
              endMinuteStr
            });
            const eOK = isEndTimeLaterThanStartTime({
              hoursStr: endHourStr,
              minutesStr: endMinuteStr,
              startTimeType,
              endTimeType,
              startHourStr: val,
              startMinuteStr
            });

            if (!sOK) {
              setIsStartTimeRangeValid(false);
              setStartTimeRangeErrMessage("開始時間要比結束營業時間早");
            } else {
              setIsStartTimeRangeValid(true);
              setStartTimeRangeErrMessage("");
            }

            if (eOK) {
              setIsEndTimeRangeValid(true);
              setEndTimeRangeErrMessage("");
            }
          } else {
            setIsStartTimeRangeValid(true);
            setStartTimeRangeErrMessage("");
          }
        }
      } else {
        // start minutes
        setStartMinuteStr(val);
        if (!isMinutesValid(val)) {
          setIsStartTimeValid(false);
          setStartTimeErrMessage("錯誤的時間格式");
        } else if (
          !isTimeValid({
            hoursStr: startHourStr,
            minutesStr: val,
            isPm: startTimeType === TYPE_PM
          })
        ) {
          setIsStartTimeValid(false);
          setStartTimeErrMessage("錯誤的時間");
        } else {
          setIsStartTimeValid(true);
          setStartTimeErrMessage("");

          if (isEndTimeValid) {
            const sOK = isStartTimeEarlierThanEndTime({
              hoursStr: startHourStr,
              minutesStr: val,
              startTimeType,
              endTimeType,
              endHourStr,
              endMinuteStr
            });
            const eOK = isEndTimeLaterThanStartTime({
              hoursStr: endHourStr,
              minutesStr: endMinuteStr,
              startTimeType,
              endTimeType,
              startHourStr,
              startMinuteStr: val
            });

            if (!sOK) {
              setIsStartTimeRangeValid(false);
              setStartTimeRangeErrMessage("開始時間要比結束營業時間早");
            } else {
              setIsStartTimeRangeValid(true);
              setStartTimeRangeErrMessage("");
            }

            if (eOK) {
              setIsEndTimeRangeValid(true);
              setEndTimeRangeErrMessage("");
            }
          } else {
            setIsStartTimeRangeValid(true);
            setStartTimeRangeErrMessage("");
          }
        }
      }
    } else {
      if (isHour) {
        // end hours
        setEndHourStr(val);
        if (!isHoursValid(val)) {
          setIsEndTimeValid(false);
          setEndTimeErrMessage("錯誤的時間格式");
        } else if (
          !isTimeValid({
            hoursStr: val,
            minutesStr: endMinuteStr,
            isPm: endTimeType === TYPE_PM
          })
        ) {
          setIsEndTimeValid(false);
          setEndTimeErrMessage("錯誤的時間");
        } else {
          setIsEndTimeValid(true);
          setEndTimeErrMessage("");

          if (isStartTimeValid) {
            const eOK = isEndTimeLaterThanStartTime({
              hoursStr: val,
              minutesStr: endMinuteStr,
              startTimeType,
              endTimeType,
              startHourStr,
              startMinuteStr
            });
            const sOK = isStartTimeEarlierThanEndTime({
              hoursStr: startHourStr,
              minutesStr: startMinuteStr,
              startTimeType,
              endTimeType,
              endHourStr: val,
              endMinuteStr
            });
            if (!eOK) {
              setIsEndTimeRangeValid(false);
              setEndTimeRangeErrMessage("結束時間要比開始營業時間晚");
            } else {
              setIsEndTimeRangeValid(true);
              setEndTimeRangeErrMessage("");
            }

            if (sOK) {
              setIsStartTimeRangeValid(true);
              setStartTimeRangeErrMessage("");
            }
          } else {
            setIsEndTimeRangeValid(true);
            setEndTimeRangeErrMessage("");
          }
        }
      } else {
        setEndMinuteStr(val);
        if (!isMinutesValid(val)) {
          setIsEndTimeValid(false);
          setEndTimeErrMessage("錯誤的時間格式");
        } else if (
          !isTimeValid({
            hoursStr: endHourStr,
            minutesStr: val,
            isPm: endTimeType === TYPE_PM
          })
        ) {
          setIsEndTimeValid(false);
          setEndTimeErrMessage("錯誤的時間");
        } else {
          setIsEndTimeValid(true);
          setEndTimeErrMessage("");
          if (isStartTimeValid) {
            const eOK = isEndTimeLaterThanStartTime({
              hoursStr: endHourStr,
              minutesStr: val,
              startTimeType,
              endTimeType,
              startHourStr,
              startMinuteStr
            });
            const sOK = isStartTimeEarlierThanEndTime({
              hoursStr: startHourStr,
              minutesStr: startMinuteStr,
              startTimeType,
              endTimeType,
              endHourStr,
              endMinuteStr: val
            });
            if (!eOK) {
              setIsEndTimeRangeValid(false);
              setEndTimeRangeErrMessage("結束時間要比開始營業時間晚");
            } else {
              setIsEndTimeRangeValid(true);
              setEndTimeRangeErrMessage("");
            }

            if (sOK) {
              setIsStartTimeRangeValid(true);
              setStartTimeRangeErrMessage("");
            }
          } else {
            setIsEndTimeRangeValid(true);
            setEndTimeRangeErrMessage("");
          }
        }
      }
    }
  };

  return (
    <FormControl sx={{ width: 48 }}>
      <FilledInput
        size="small"
        placeholder="╴╴"
        disableUnderline={true}
        hiddenLabel={true}
        value={getVal()}
        onChange={handleChange}
        disabled={disabled}
      />
    </FormControl>
  );
}
