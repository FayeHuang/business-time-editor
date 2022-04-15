import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { usePeriodContext } from "./PeriodContext";
import TimePicker from "./TimePicker";
import { TYPE_AM, TYPE_PM } from "./Constants";

export default function PeriodEditor() {
  const {
    setStartTimeType,
    setEndTimeType,
    setStartHourStr,
    setEndHourStr,
    setStartMinuteStr,
    setEndMinuteStr
  } = usePeriodContext();

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
        <TimePicker isStartTime={true} isEndTime={false} />
        &nbsp;~&nbsp;
        <TimePicker isStartTime={false} isEndTime={true} />
      </Box>
      <IconButton size="small">
        <HighlightOffIcon />
      </IconButton>
    </Box>
  );
}
