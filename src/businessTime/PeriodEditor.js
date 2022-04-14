import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { usePeriodContext } from "./PeriodContext";
import TimePicker from "./TimePicker";

export default function PeriodEditor() {
  const data = usePeriodContext();
  console.log("-- context --", data);
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
