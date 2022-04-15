import "./styles.css";
import { useState } from "react";
import { Paper, Button, FormControlLabel, Checkbox } from "@mui/material";

import WeekSelector from "./businessTime/WeekSelector";
import PeriodEditor from "./businessTime/PeriodEditor";

import { PeriodContextProvider } from "./businessTime/PeriodContext";
import { TYPE_AM, TYPE_PM } from "./businessTime/Constants";

export default function GeneralBusinessTimeEditor({
  id = null,
  week = [],
  disableWeek = [],
  period = [],
  onBusinessTimeRemove,
  onWeekChange,
  onPeriodChange,
  is24 = false,
  handle24hCheckBoxChange
}) {
  const getDefaultTime = (timeStr) => {
    const hourStr = timeStr.split(":")[0];
    const minuteStr = timeStr.split(":")[1];
    const hour = parseInt(hourStr, 10);
    return {
      hourStr:
        hour > 12
          ? (hour - 12).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
          : hourStr,
      minuteStr,
      timeType: hour > 12 ? TYPE_PM : TYPE_AM
    };
  };

  return (
    <Paper sx={{ p: 2 }} variant="outlined" square>
      <h2>GeneralBusinessTimeEditor</h2>
      <WeekSelector
        disableWeek={disableWeek}
        selectedWeek={week}
        handleWeekChange={onWeekChange}
      />
      {/* <BusinessTimeTypeChose /> */}
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            onChange={(e) => handle24hCheckBoxChange(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
            checked={is24}
          />
        }
        label="全天營業"
      />
      {!is24 &&
        period.map((p, index) => (
          <PeriodContextProvider
            key={index}
            defaultStartTime={getDefaultTime(p.start)}
            defaultEndTime={getDefaultTime(p.end)}
          >
            <PeriodEditor />
          </PeriodContextProvider>
        ))}
      <Button variant="contained" onClick={onBusinessTimeRemove}>
        刪除
      </Button>
    </Paper>
  );
}
