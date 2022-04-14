import { useState } from "react";
import {
  FormControl,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

let theme = createTheme();

export default function WeekSelector({
  disableWeek = [],
  selectedWeek = [],
  handleWeekChange
}) {
  const weekNumberToString = ({ number, isShort = false }) => {
    if (isShort) {
      if (number === 1) return "一";
      else if (number === 2) return "二";
      else if (number === 3) return "三";
      else if (number === 4) return "四";
      else if (number === 5) return "五";
      else if (number === 6) return "六";
      else if (number === 7) return "日";
      else return "ERROR!!";
    } else {
      if (number === 1) return "星期一";
      else if (number === 2) return "星期二";
      else if (number === 3) return "星期三";
      else if (number === 4) return "星期四";
      else if (number === 5) return "星期五";
      else if (number === 6) return "星期六";
      else if (number === 7) return "星期日";
      else return "ERROR!!";
    }
  };

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    console.log(value);

    handleWeekChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        displayEmpty
        color="secondary"
        multiple
        value={selectedWeek}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span style={{ color: "gray" }}>-- 請選擇星期 --</span>;
          }
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={weekNumberToString({
                    number: value,
                    isShort: true
                  })}
                />
              ))}
            </Box>
          );
        }}
        size="small"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((week) => (
          <MenuItem
            key={week}
            value={week}
            color="secondary"
            sx={{
              color:
                selectedWeek.filter((w) => week === w).length > 0
                  ? `${theme.palette.secondary.main} !important`
                  : "inherit"
            }}
            disableRipple
            disabled={
              disableWeek.filter((w) => w === week).length > 0 &&
              selectedWeek.filter((w) => w === week).length === 0
            }
          >
            {weekNumberToString({
              number: week,
              isShort: false
            })}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
