import "./styles.css";
import {useState,useEffect} from 'react';
import { Paper, Button, FormControlLabel, Checkbox, Box } from "@mui/material";

import WeekSelector from "./businessTime/WeekSelector";
import PeriodEditor from "./businessTime/PeriodEditor";

import { TYPE_AM, TYPE_PM, periodInitData } from "./businessTime/Constants";


export default function GeneralBusinessTimeEditor({
  week = [],
  disableWeek = [],
  period = [],
  onBusinessTimeRemove,
  onWeekChange,
  onPeriodChange,
  is24 = false,
  handle24hCheckBoxChange
}) {
  const getTime = (timeObj) => {
    const hourStr = timeObj[0];
    const minuteStr = timeObj[1];
    return { hourStr, minuteStr }
  };

  const handlePeriodChange = (newRecord, index) => {
    if (period.length > 1) {
      if (index === 0) 
        onPeriodChange([newRecord, ...period.slice(1, period.length)])
      else if (index === period.length-1)
        onPeriodChange([...period.slice(0, period.length-1), newRecord])
      else
        onPeriodChange([...period.slice(0, index), newRecord, ...period.slice(index+1, period.length)])
    } else {
      onPeriodChange([newRecord])
    }
  };

  const handlePeriodDelete = (index) => {
    if (index === 0)
      onPeriodChange([...period.slice(1, period.length)])
    else if (index === period.length-1)
      onPeriodChange([...period.slice(0, period.length-1)])
    else
      onPeriodChange([...period.slice(0, index), ...period.slice(index+1, period.length)])
  };

  const handelePeriodCreate = () => {
    onPeriodChange([...period, periodInitData])
  };

  return (
    <Paper sx={{ p: 2, mb:2 }} variant="outlined" square>
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
        (period && period.length > 0) &&
          <Box>
            {
              period.map((p, index) => (
                  <PeriodEditor
                    key={index}
                    canDelete={period.length > 1}
                    isLastOne={index+1 === period.length}
                    onPeriodDelete={() => handlePeriodDelete(index)}
                    onPeriodCreate={() => handelePeriodCreate()}
                    startHourStr={getTime(p.start).hourStr}
                    startMinuteStr={getTime(p.start).minuteStr}
                    endHourStr={getTime(p.end).hourStr}
                    endMinuteStr={getTime(p.end).minuteStr}
                    startTimeType={p.startTimeType}
                    endTimeType={p.endTimeType}
                    onStartTimeChange={({hourStr, minuteStr}) => {
                      const newRecord = {
                        ...p,
                        start: [hourStr, minuteStr]
                      };
                      handlePeriodChange(newRecord, index);
                    }}
                    onEndTimeChange={({hourStr, minuteStr}) => {
                      const newRecord = {
                        ...p,
                        end: [hourStr, minuteStr]
                      };
                      handlePeriodChange(newRecord, index)
                    }}
                    onStartTimeTypeChange={(timeType) => {
                      const newRecord = {
                        ...p,
                        startTimeType: timeType
                      };
                      handlePeriodChange(newRecord, index);
                    }}
                    onEndTimeTypeChange={(timeType) => {
                      const newRecord = {
                        ...p,
                        endTimeType: timeType
                      };
                      handlePeriodChange(newRecord, index);
                    }}
                  />
              ))
            }
            <Button onClick={handelePeriodCreate}>新增時段</Button>
          </Box>
      }
      <Button variant="contained" onClick={onBusinessTimeRemove}>
        刪除
      </Button>
    </Paper>
  );
}
