import { Watch } from "../Helpers";
import React from "react";
import { Core, User } from "../Core";
import {
  LegislationQuiz,
  MainLayout,
  FullScreenNoToolbar,
} from "../Components";
import { Spin } from "antd";

export function LegislationQuizPage() {
  return (
    <Watch
      data={Core.DataPoints.legislationList}
      fallback={
        <FullScreenNoToolbar title={"Loading"}>
          <div className={"CENTER STRETCH"}>
            <Spin size="large" />
          </div>
        </FullScreenNoToolbar>
      }
    >
      {(list) => {
        return (
          <LegislationQuiz
            legislationList={list}
            onDone={(result: Record<string, User.Vote>) => {
              Core.Events.quizDone(result);
              Core.Navigator.pushPage({
                page: "FakeProgress",
                payload: {},
              });
            }}
          />
        );
      }}
    </Watch>
  );
}
