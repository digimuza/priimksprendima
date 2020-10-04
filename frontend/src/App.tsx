import React from "react";
import "./App.css";
import { RouterPage } from "./router";
import { Core } from "./Core";

import { BrowserRouter as Router, Route, useHistory, useParams } from "react-router-dom";
import Landing from "./Pages/LandingPage";
import RulesOfService from "./Pages/RulesOfService";
import Cookies from "./Pages/Cookies";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import { FakeProgress } from "./Pages/FakeProgressPage";
import { Watch } from "./Helpers";
import { LegislationSlide } from "./Components/LegislationQuiz";
import { combineLatest } from "rxjs";
Core.init();

function WithParam() {
  const { id } = useParams<{ id: string }>()
  const router = useHistory()
  return <Watch data={
    combineLatest(Core.Store.store.userVotes, Core.DataPoints.legislationList, (a,b) => {
      return {
        votes: a,
        legislationList: b
      }
    })
  }>
    {({ legislationList, votes }) => {
      const lg = legislationList.find((q) => q.legislationId === id)
      if (lg == null) return null
      return <LegislationSlide disableSkipButton={true} legislation={lg} onDone={(q) => {
        Core.Events.quizDone({
          ...votes,
          ...q
        });
        Core.Navigator.pushPage({
          page: "FakeProgress",
          payload: {},
        });
        router.push("/quiz")
      }}></LegislationSlide>
    }}
  </Watch>
}

function App() {
  return (
    <Router>
      <Route exact path="/fa">
        <FakeProgress></FakeProgress>
      </Route>
      <Route exact path="/quiz-p/:id">
        <WithParam></WithParam>
      </Route>
      <Route exact path="/quiz">
        <RouterPage></RouterPage>
      </Route>
      <Route exact path="/naudojimo-salygos">
        <RulesOfService></RulesOfService>
      </Route>
      <Route exact path="/slapuku-politika">
        <Cookies></Cookies>
      </Route>
      <Route exact path="/privatumo-politika">
        <PrivacyPolicy></PrivacyPolicy>
      </Route>
      <Route exact path="/">
        <Landing></Landing>
      </Route>

    </Router>
  );
}

export default App;
