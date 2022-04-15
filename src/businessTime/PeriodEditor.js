import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import TimePicker from "./TimePicker";
import { TYPE_PM } from "./Constants";
import {
  isHoursValid,
  isMinutesValid,
  isTimeValid,
  isStartTimeEarlierThanEndTime,
  isEndTimeLaterThanStartTime
} from "./lib";

export default function PeriodEditor(props) {
  const {
    canDelete=true,
    isLastOne=true,
    onPeriodDelete,
    onPeriodCreate,
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

  const verifyStartTime = ({ 
    startHourStr, 
    startMinuteStr, 
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType  
  }) => {
    if (!isHoursValid(startHourStr) || !isMinutesValid(startMinuteStr)) {
      setIsStartTimeValid(false);
      setStartTimeErrMessage("錯誤的時間格式");
    } else if (!isTimeValid({ hourStr:startHourStr, minuteStr:startMinuteStr, isPm: startTimeType === TYPE_PM })) {
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
        endTimeType  
      })
    }
  };

  const verifyEndTime = ({ 
    startHourStr, 
    startMinuteStr, 
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType   
  }) => {
    if (!isHoursValid(endHourStr) || !isMinutesValid(endMinuteStr)) {
      setIsEndTimeValid(false);
      setEndTimeErrMessage("錯誤的時間格式");
    } else if (!isTimeValid({hourStr:endHourStr, minuteStr:endMinuteStr, isPm: endTimeType === TYPE_PM})) {
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
        endTimeType 
      })
    }
  };

  const verifyStartTimeRange = ({ 
    startHourStr, 
    startMinuteStr, 
    startTimeType,
    endHourStr,
    endMinuteStr,
    endTimeType 
  }) => {
    if (isEndTimeValid) {
      const sOK = isStartTimeEarlierThanEndTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr
      });
      const eOK = isEndTimeLaterThanStartTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr
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
    endTimeType 
  }) => {
    if (isStartTimeValid) {
      const eOK = isEndTimeLaterThanStartTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
        endHourStr,
        endMinuteStr
      });
      const sOK = isStartTimeEarlierThanEndTime({
        startHourStr,
        startMinuteStr,
        startTimeType,
        endTimeType,
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
  };

  return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 1
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
            {...props}
          />
        </Box>

        <IconButton size="small" disabled={!canDelete} onClick={() => onPeriodDelete()}>
          <HighlightOffIcon />
        </IconButton>
      </Box>
    
  );
}
