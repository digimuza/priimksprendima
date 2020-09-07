import { FullScreenNoToolbar } from "../Components";
import React from "react";
import { Typography } from "antd";
import { Watch } from "../Helpers";
import { from, interval, of } from "rxjs";
import * as RXO from "rxjs/operators";
import * as P from "ts-prime";
import { Core } from "../Core";

export function FakeProgress() {
  const messages = [
    {
      message: "Traukiami LRS balsavimo rezultatai",
    },
    {
      message: "Lyginami balsavimo duomenys",
    },
    {
      message: "Vykdomas išmanusis reitingavimas",
    },
    null,
  ];
  return (
    <FullScreenNoToolbar title={""} className={"FakeProgressPage"}>
      <Watch
        data={from([...messages, null]).pipe(
          RXO.concatMap((w, index) => {
            return index === 0
              ? of(w)
              : of(w).pipe(
                  RXO.delay(
                    P.clamp(Math.random() * 2 * 1000, { min: 1000, max: 2000 })
                  )
                );
          }),
          RXO.filter(P.isDefined),
          RXO.finalize(() => {
            console.log("asdkj");
            Core.Navigator.pushPage({
              page: "RankingPage",
              payload: {},
            });
          })
        )}
      >
        {(message) => {
          return (
            <div
              className={"CENTER STRETCH"}
              style={{ flexDirection: "column" }}
            >
              <Typography.Title className={"ResponsiveText"}>
                {message.message}
              </Typography.Title>
              <img
                style={{ height: "auto", width: "75px" }}
                src="images/FavIco.svg"
                alt=""
              />
            </div>
          );
        }}
      </Watch>
    </FullScreenNoToolbar>
  );
}
