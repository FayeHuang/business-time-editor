import { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormHelperText
} from "@mui/material";
import NumberInput from "./NumberInput";
import { usePeriodContext } from "./PeriodContext";
import { TYPE_AM, TYPE_PM } from "./Constants";
import {
  isTimeValid,
  isStartTimeEarlierThanEndTime,
  isEndTimeLaterThanStartTime
} from "./lib";

export default function TimePicker({
  isStartTime = true,
  isEndTime = false,
  disabled = false
}) {
  const {
    startTimeType,
    setStartTimeType,
    endTimeType,
    setEndTimeType,
    isStartTimeValid,
    isEndTimeValid,
    startTimeErrMessage,
    endTimeErrMessage,
    startHourStr,
    startMinuteStr,
    endHourStr,
    endMinuteStr,
    setIsStartTimeValid,
    setStartTimeErrMessage,
    setIsEndTimeValid,
    setEndTimeErrMessage,
    isStartTimeRangeValid,
    setIsStartTimeRangeValid,
    startTimeRangeErrMessage,
    setStartTimeRangeErrMessage,
    isEndTimeRangeValid,
    setIsEndTimeRangeValid,
    endTimeRangeErrMessage,
    setEndTimeRangeErrMessage
  } = usePeriodContext();

  const handleChange = (e) => {
    const val = e.target.value;
    if (isStartTime) {
      setStartTimeType(val);
      if (
        !isTimeValid({
          hoursStr: startHourStr,
          minutesStr: startMinuteStr,
          isPm: e.target.value === TYPE_PM
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
            minutesStr: startMinuteStr,
            startTimeType: val,
            endTimeType,
            endHourStr,
            endMinuteStr
          });
          const eOK = isEndTimeLaterThanStartTime({
            hoursStr: endHourStr,
            minutesStr: endMinuteStr,
            startTimeType: val,
            endTimeType,
            startHourStr,
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
      setEndTimeType(val);
      if (
        !isTimeValid({
          hoursStr: endHourStr,
          minutesStr: endMinuteStr,
          isPm: e.target.value === TYPE_PM
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
            minutesStr: endMinuteStr,
            startTimeType,
            endTimeType: val,
            startHourStr,
            startMinuteStr
          });
          const sOK = isStartTimeEarlierThanEndTime({
            hoursStr: startHourStr,
            minutesStr: startMinuteStr,
            startTimeType,
            endTimeType: val,
            endHourStr,
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
    }
  };

  return (
    <Box>
      <Box
        sx={{
          borderWidth: 1,
          borderRadius: 1,
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.23)",
          display: "inline-block"
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
