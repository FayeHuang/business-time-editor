import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import TimePicker from "./TimePicker";
import {
  // isHoursValid,
  // isMinutesValid,
  isStartTimeEarlierThanEndTime,
  isEndTimeLaterThanStartTime,
  isValidDate,
} from "./lib";

export default function PeriodEditor(props) {
  const {
    canDelete = true,
    onPeriodDelete,
    //
    startHourStr = "",
    startMinuteStr = "",
    endHourStr = "",
    endMinuteStr = "",
    //
    onStartTimeChange,
    onEndTimeChange,
    //
    startTimeType,
    endTimeType,
    onStartTimeTypeChange,
    onEndTimeTypeChange,
  } = props;

  const [isStartTimeValid, setIsStartTimeValid] = useState(true);
  const [isEndTimeValid, setIsEndTimeValid] = useState(true);
  const [startTimeErrMessage, setStartTimeErrMessage] = useState("");
  const [endTimeErrMessage, setEndTimeErrMessage] = useState("");
  const [isStartTimeRangeValid, setIsStartTimeRangeValid] = useState(true);
  const [startTimeRangeErrMessage, setStartTimeRangeErrMessage] = useState("");
  const [isEndTimeRangeValid, setIsEndTimeRangeValid] = useState(true);
  const [endTimeRangeErrMessage, setEndTimeRangeErrMessage] = useState("");

  const handleStartHourChange = (hourStr) => {
    onStartTimeChange({ hourStr, minuteStr: startMinuteStr });
    verifyStartTime({
      startHourStr: hourStr,
      startMinuteStr,
      startTimeType,
      endTimeType,
      endHourStr,
      endMinuteStr,
      focusHour: true,
      focusMinute: false,
    });
  };

  const handleStartMinuteChange = (minuteStr) => {
    onStartTimeChange({ hourStr: startHourStr, minuteStr });
    verifyStartTime({
      startHourStr,
      startMinuteStr: minuteStr,
      startTimeType,
      endTimeType,
      endHourStr,
      endMinuteStr,
      focusHour: false,
      focusMinute: true,
    });
  };

  const handleEndHourChange = (hourStr) => {
    onEndTimeChange({ hourStr, minuteStr: endMinuteStr });
    verifyEndTime({
      startHourStr,
      startMinuteStr,
      startTimeType,
      endTimeType,
      endHourStr: hourStr,
      endMinuteStr,
      focusHour: true,
      focusMinute: false,
    });
  };

  const handleEndMinuteChange = (minuteStr) => {
    onEndTimeChange({ hourStr: endHourStr, minuteStr });
    verifyEndTime({
      startHourStr,
      startMinuteStr,
      startTimeType,
      endTimeType,
      endHourStr,
      endMinuteStr: minuteStr,
      focusHour: false,
      focusMinute: true,
    });
  };

  const handleStartTimeTypeChange = (timeType) => {
    onStartTimeTypeChange(timeType);
    verifyStartTime({
      startHourStr,
      startMinuteStr,
      startTimeType: timeType,
      endTimeType,
      endHourStr,
      endMinuteStr,
    });
  };

  const handleEndTimeTypeChange = (timeType) => {
    onEndTimeTypeChange(timeType);
    verifyEndTime({
      startHourStr,
      startMinuteStr,
      startTimeType,
      endTimeType: timeType,
      endHourStr,
      endMinuteStr,
    });
  };

  const verifyStartTime = ({
    startHourStr,
    startMinuteStr,
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType,
    focusHour = false,
    focusMinute = false,
  }) => {
    const initHourStr =
      isStartTimeValid && focusMinute && startHourStr.length === 0
        ? "00"
        : startHourStr;
    const initMinuteStr =
      isStartTimeValid && focusHour && startMinuteStr.length === 0
        ? "00"
        : startMinuteStr;

    if (
      !isValidDate({
        hourStr: initHourStr,
        minuteStr: initMinuteStr,
        timeType: startTimeType,
      })
    ) {
      setIsStartTimeValid(false);
      setStartTimeErrMessage("錯誤的時間");
    } else {
      setIsStartTimeValid(true);
      setStartTimeErrMessage("");
      verifyStartTimeRange({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endHourStr,
        endMinuteStr,
        endTimeType,
      });
    }
  };

  const verifyEndTime = ({
    startHourStr,
    startMinuteStr,
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType,
    focusHour = false,
    focusMinute = false,
  }) => {
    const initHourStr =
      isEndTimeValid && focusMinute && endHourStr.length === 0
        ? "00"
        : endHourStr;
    const initMinuteStr =
      isEndTimeValid && focusHour && endMinuteStr.length === 0
        ? "00"
        : endMinuteStr;
    if (
      !isValidDate({
        hourStr: initHourStr,
        minuteStr: initMinuteStr,
        timeType: endTimeType,
      })
    ) {
      setIsEndTimeValid(false);
      setEndTimeErrMessage("錯誤的時間");
    } else {
      setIsEndTimeValid(true);
      setEndTimeErrMessage("");
      verifyEndTimeRange({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endHourStr,
        endMinuteStr,
        endTimeType,
      });
    }
  };

  const verifyStartTimeRange = ({
    startHourStr,
    startMinuteStr,
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType,
  }) => {
    if (
      isValidDate({
        hourStr: endHourStr,
        minuteStr: endMinuteStr,
        timeType: endTimeType,
      }) &&
      isValidDate({
        hourStr: startHourStr,
        minuteStr: startMinuteStr,
        timeType: startTimeType,
      })
    ) {
      const sOK = isStartTimeEarlierThanEndTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr,
      });
      const eOK = isEndTimeLaterThanStartTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr,
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
  };

  const verifyEndTimeRange = ({
    startHourStr,
    startMinuteStr,
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType,
  }) => {
    if (
      isValidDate({
        hourStr: startHourStr,
        minuteStr: startMinuteStr,
        timeType: startTimeType,
      }) &&
      isValidDate({
        hourStr: endHourStr,
        minuteStr: endMinuteStr,
        timeType: endTimeType,
      })
    ) {
      const eOK = isEndTimeLaterThanStartTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr,
      });
      const sOK = isStartTimeEarlierThanEndTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr,
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
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: 1,
      }}
    >
      <Typography sx={{ mr: 2 }}>時段</Typography>
      <Box sx={{ mr: 2 }}>
        <TimePicker
          isStartTime={true}
          isEndTime={false}
          verifyEndTime={verifyEndTime}
          verifyStartTime={verifyStartTime}
          isStartTimeValid={isStartTimeValid}
          isEndTimeValid={isEndTimeValid}
          isStartTimeRangeValid={isStartTimeRangeValid}
          isEndTimeRangeValid={isEndTimeRangeValid}
          startTimeErrMessage={startTimeErrMessage}
          endTimeErrMessage={endTimeErrMessage}
          startTimeRangeErrMessage={startTimeRangeErrMessage}
          endTimeRangeErrMessage={endTimeRangeErrMessage}
          handleStartHourChange={handleStartHourChange}
          handleStartMinuteChange={handleStartMinuteChange}
          handleEndHourChange={handleEndHourChange}
          handleEndMinuteChange={handleEndMinuteChange}
          handleStartTimeTypeChange={handleStartTimeTypeChange}
          handleEndTimeTypeChange={handleEndTimeTypeChange}
          {...props}
        />
        &nbsp;~&nbsp;
        <TimePicker
          isStartTime={false}
          isEndTime={true}
          verifyEndTime={verifyEndTime}
          verifyStartTime={verifyStartTime}
          isStartTimeValid={isStartTimeValid}
          isEndTimeValid={isEndTimeValid}
          isStartTimeRangeValid={isStartTimeRangeValid}
          isEndTimeRangeValid={isEndTimeRangeValid}
          startTimeErrMessage={startTimeErrMessage}
          endTimeErrMessage={endTimeErrMessage}
          startTimeRangeErrMessage={startTimeRangeErrMessage}
          endTimeRangeErrMessage={endTimeRangeErrMessage}
          handleStartHourChange={handleStartHourChange}
          handleStartMinuteChange={handleStartMinuteChange}
          handleEndHourChange={handleEndHourChange}
          handleEndMinuteChange={handleEndMinuteChange}
          handleStartTimeTypeChange={handleStartTimeTypeChange}
          handleEndTimeTypeChange={handleEndTimeTypeChange}
          {...props}
        />
      </Box>

      <IconButton
        size="small"
        disabled={!canDelete}
        onClick={() => onPeriodDelete()}
      >
        <HighlightOffIcon />
      </IconButton>
    </Box>
  );
}
