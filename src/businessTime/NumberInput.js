import { useState } from "react";
import { FormControl, FilledInput } from "@mui/material";

export default function NumberInput({
  isHour = true,
  isMinute = false,
  isStartTime = true,
  isEndTime = false,
  disabled = false,
  //
  startHourStr = "",
  startMinuteStr = "",
  endHourStr = "",
  endMinuteStr = "",
  //
  handleStartHourChange,
  handleStartMinuteChange,
  handleEndHourChange,
  handleEndMinuteChange,
}) {
  const getVal = () => {
    if (isStartTime && isHour) return startHourStr;
    else if (isStartTime && isMinute) return startMinuteStr;
    else if (isEndTime && isHour) return endHourStr;
    else if (isEndTime && isMinute) return endMinuteStr;
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (isStartTime && isHour) handleStartHourChange(val);
    else if (isStartTime && isMinute) handleStartMinuteChange(val);
    else if (isEndTime && isHour) handleEndHourChange(val);
    else if (isEndTime && isMinute) handleEndMinuteChange(val);
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
