import "./styles.css";
import { useState } from "react";
import { Button } from "@mui/material";

import GeneralBusinessTimeEditor from "./GeneralBusinessTimeEditor";

export default function App() {
  const [normalBusinessTime, setNormalBusinessTime] = useState({
    0: {
      week: [1, 2, 3],
      period: []
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
              period: []
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
