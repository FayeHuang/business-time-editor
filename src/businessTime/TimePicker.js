import { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";
import NumberInput from "./NumberInput";
import { TYPE_AM, TYPE_PM } from "./Constants";

export default function TimePicker(props) {
  const {
    isStartTime = true,
    isEndTime = false,
    disabled = false,
    //
    startTimeType,
    endTimeType,
    //
    isStartTimeValid,
    isEndTimeValid,
    isStartTimeRangeValid,
    isEndTimeRangeValid,
    startTimeErrMessage,
    endTimeErrMessage,
    startTimeRangeErrMessage,
    endTimeRangeErrMessage,
    //
    handleStartTimeTypeChange,
    handleEndTimeTypeChange,
  } = props;

  const handleChange = (e) => {
    const timeType = e.target.value;
    if (isStartTime) handleStartTimeTypeChange(timeType);
    else handleEndTimeTypeChange(timeType);
  };

  return (
    <Box>
      <Box
        sx={{
          borderWidth: 1,
          borderRadius: 1,
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.23)",
          display: "inline-block",
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Select
          value={isStartTime ? startTimeType : endTimeType}
          onChange={handleChange}
          size="small"
          variant="filled"
          hiddenLabel={true}
          disableUnderline={true}
          sx={{ mr: 1 }}
          disabled={disabled}
        >
          <MenuItem value={TYPE_AM}>上午</MenuItem>
          <MenuItem value={TYPE_PM}>下午</MenuItem>
        </Select>
        <NumberInput
          isHour={true}
          isMinute={false}
          isStartTime={isStartTime}
          isEndTime={isEndTime}
          disabled={disabled}
          {...props}
        />
        <Typography sx={{ mx: 0.5 }} component="span">
          :
        </Typography>
        <NumberInput
          isHour={false}
          isMinute={true}
          isStartTime={isStartTime}
          isEndTime={isEndTime}
          disabled={disabled}
          {...props}
        />
      </Box>
      <FormHelperText error={true}>
        {isStartTime && !isStartTimeValid && startTimeErrMessage}
        {isEndTime && !isEndTimeValid && endTimeErrMessage}
        {isStartTime &&
          isStartTimeValid &&
          !isStartTimeRangeValid &&
          startTimeRangeErrMessage}
        {isEndTime &&
          isEndTimeValid &&
          !isEndTimeRangeValid &&
          endTimeRangeErrMessage}
      </FormHelperText>
    </Box>
  );
}
