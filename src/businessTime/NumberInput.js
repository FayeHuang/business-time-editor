import { useState } from "react";
import { FormControl, FilledInput } from "@mui/material";

export default function NumberInput({
  isHour = true,
  isMinute = false,
  isStartTime = true,
  isEndTime = false,
  disabled = false,
  //
  startHourStr="",
  startMinuteStr="",
  endHourStr="",
  endMinuteStr="",
  // 
  onStartTimeChange,
  onEndTimeChange,
  //
  startTimeType,
  endTimeType,
  //
  verifyEndTime,
  verifyStartTime,
}) {
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
        onStartTimeChange({ hourStr: val, minuteStr: startMinuteStr });
        verifyStartTime({
          startHourStr: val,
          startMinuteStr,
          startTimeType,
          endTimeType,
          endHourStr,
          endMinuteStr
        });
      } else {
        // start minutes
        onStartTimeChange({ hourStr: startHourStr, minuteStr: val });
        verifyStartTime({
          startHourStr,
          startMinuteStr: val,
          startTimeType,
          endTimeType,
          endHourStr,
          endMinuteStr
        });
      }
    } else {
      if (isHour) {
        // end hours
        onEndTimeChange({ hourStr: val, minuteStr: endMinuteStr });
        verifyEndTime({
          startHourStr,
          startMinuteStr,
          startTimeType,
          endTimeType,
          endHourStr: val,
          endMinuteStr
        });
      } else {
        onEndTimeChange({ hourStr: endHourStr, minuteStr: val });
        verifyEndTime({
          startHourStr,
          startMinuteStr,
          startTimeType,
          endTimeType,
          endHourStr,
          endMinuteStr: val
        });
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
