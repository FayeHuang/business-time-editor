import "./styles.css";
import { useState } from "react";
import { Button } from "@mui/material";

import GeneralBusinessTimeEditor from "./GeneralBusinessTimeEditor";
import { TYPE_AM, TYPE_PM, periodInitData } from "./businessTime/Constants";

export default function App() {
  const [normalBusinessTime, setNormalBusinessTime] = useState({
    0: {
      week: [1, 2, 3],
      period: [
        {
          start: ["10","00"],
          startTimeType: TYPE_AM,
          end: ["12","30"],
          endTimeType: TYPE_AM,
        },
        {
          start: ["02","00"],
          startTimeType: TYPE_PM,
          end: ["04","00"],
          endTimeType: TYPE_PM
        }
      ],
      is24: false,
    },
    1: {
      week: [],
      period: [periodInitData],
      is24: false,
    }
  });

  const getAllSelectedWeek = () => {
    if (normalBusinessTime) {
      let res = [];
      Object.keys(normalBusinessTime).forEach((k) => {
        res = [...res, ...normalBusinessTime[k].week];
      });
      return res;
    } else return [];
  };

  return (
    <div className="App">
      <Button
        onClick={() =>
          setNormalBusinessTime({
            ...normalBusinessTime,
            [`${Math.random().toString().split(".")[1]}`]: {
              week: [],
              period: [periodInitData],
              is24: false,
            }
          })
        }
      >
        新增一般營業時間
      </Button>
      {normalBusinessTime &&
        Object.keys(normalBusinessTime).map((k, index) => (
          <GeneralBusinessTimeEditor
            key={k}
            id={k}
            disableWeek={getAllSelectedWeek()}
            week={normalBusinessTime[k].week}
            period={normalBusinessTime[k].period}
            is24={normalBusinessTime[k].is24}
            handle24hCheckBoxChange={(checked) => 
              setNormalBusinessTime({
                ...normalBusinessTime,
                [k]: { ...normalBusinessTime[k], is24: checked }
              })
            }
            onWeekChange={(newWeek) =>
              setNormalBusinessTime({
                ...normalBusinessTime,
                [k]: { ...normalBusinessTime[k], week: newWeek }
              })
            }
            onPeriodChange={(newPeriod) =>
              setNormalBusinessTime({
                ...normalBusinessTime,
                [k]: { ...normalBusinessTime[k], period: newPeriod }
              })
            }
            onBusinessTimeRemove={() => {
              let tt = { ...normalBusinessTime };
              delete tt[k];
              setNormalBusinessTime(tt);
            }}
            
          />
        ))}
    </div>
  );
}
