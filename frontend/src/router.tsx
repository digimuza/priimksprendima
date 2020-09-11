import React from "react";
import { Watch } from "./Helpers";
import { Core } from "./Core";
import { LegislationQuizPage } from "./Pages/LegislationQuizPage";
import { PoliticianSummaryPage } from "./Pages/PoliticianSummaryPage";
import { RankingPage, RankedPoliticians } from "./Pages/RankingPage";
import { FakeProgress } from "./Pages/FakeProgressPage";
import { LoadingPage } from "./Pages/LoadingPage";
import { Footer } from "./Pages/LandingPage";
import { Page } from "./Components/Common/Page";

export function RouterPage() {
  return (
    <Watch data={Core.Navigator.listen()}>
      {(route) => {
        switch (route.page) {
          case "LegislationQuizPage":
            return <LegislationQuizPage />;
          case "PoliticianSummaryPage":
            return <PoliticianSummaryPage {...route.payload} />;
          case "RankingPage":
            return <RankingPage />;
          case "RankedPoliticians":
            return <RankedPoliticians {...route.payload}></RankedPoliticians>;
          case "FakeProgress":
            return <FakeProgress></FakeProgress>;
          case "LoadingPage":
            return <LoadingPage></LoadingPage>;
          default:
            return <LoadingPage></LoadingPage>;
        }
      }}
    </Watch>
  );
}
