import { FullScreenNoToolbar } from "../Components";
import React from "react";
import { Spin } from "antd";

export function LoadingPage() {
  return (
    <FullScreenNoToolbar title={"Loading"}>
      <div className={"CENTER STRETCH"}>
        <Spin size="large" />
      </div>
    </FullScreenNoToolbar>
  );
}
