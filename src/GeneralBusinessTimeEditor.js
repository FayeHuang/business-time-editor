import "./styles.css";
import { useState } from "react";
import { Paper, Button } from "@mui/material";

import WeekSelector from "./businessTime/WeekSelector";
import NumberInput from "./businessTime/NumberInput";
import PeriodEditor from "./businessTime/PeriodEditor";
import TimePicker from "./businessTime/TimePicker";
import BusinessTimeTypeChose from "./businessTime/BusinessTimeTypeChose";

import { PeriodContextProvider } from "./businessTime/PeriodContext";

export default function GeneralBusinessTimeEditor({
  id = null,
  week = [],
  disableWeek = [],
  period = [],
  onBusinessTimeRemove,
  onWeekChange,
  onPeriodChange
}) {
  return (
    <Paper sx={{ p: 2 }} variant="outlined" square>
      <h2>GeneralBusinessTimeEditor</h2>
      <WeekSelector
        disableWeek={disableWeek}
        selectedWeek={week}
        handleWeekChange={onWeekChange}
      />
      {/* <BusinessTimeTypeChose /> */}
      <PeriodContextProvider>
        <PeriodEditor />
      </PeriodContextProvider>
      <Button variant="contained" onClick={onBusinessTimeRemove}>
        刪除
      </Button>
    </Paper>
  );
}
