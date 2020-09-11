import React from "react";
import "./App.css";
import { RouterPage } from "./router";
import { Core } from "./Core";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./Pages/LandingPage";
import RulesOfService from "./Pages/RulesOfService";
import Cookies from "./Pages/Cookies";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import { FakeProgress } from "./Pages/FakeProgressPage";
Core.init();
function App() {
  return (
    <Router>
      <Route exact path="/fa">
        <FakeProgress></FakeProgress>
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
