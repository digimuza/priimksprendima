import React from "react";
import { Core } from "../Core";
import { RankedPoliticianList, MainLayout, RankedParties } from "../Components";
import { Watch } from "../Helpers";
import { Tabs } from "antd";
import {
  RankedPoliticianListWithSearch,
  RankedPoliticianListWithSearchAndRegion,
} from "../Components/RankedPoliticians";
import { BehaviorSubject } from "rxjs";
import { useObservable } from "../Helpers/rxjs";

const selectedTab = new BehaviorSubject("1");
export function RankingPage() {
  const obs = useObservable(selectedTab)
  return (
    <MainLayout title={"Rezultatai"}>
      <Watch
        data={Core.DataPoints.politicalPartiesWithPoliticians}
        fallback={<h1>Loading</h1>}
      >
        {({ parties, politicians }) => (
          <Tabs
            size={"large"}
            defaultActiveKey="1"
            activeKey={obs || undefined}
            onTabClick={(e) => {
              selectedTab.next(e)
            }}
          >
            <Tabs.TabPane tab="Partijos" key="1">
              <RankedParties
                parties={parties}
                onClick={(q) => {
                  Core.Navigator.pushPage({
                    page: "RankedPoliticians",
                    payload: {
                      party: q,
                    },
                  });
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Politikai" key="2">
              <RankedPoliticianListWithSearch
                politicians={politicians.politicianScores}
                onClick={(q) => {
                  Core.Navigator.pushPage({
                    page: "PoliticianSummaryPage",
                    payload: {
                      politician: q,
                    },
                  });
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Viendmandatės apygardos" key="3">
              <RankedPoliticianListWithSearchAndRegion
                politicians={politicians.politicianScores}
                onClick={(q) => {
                  Core.Navigator.pushPage({
                    page: "PoliticianSummaryPage",
                    payload: {
                      politician: q,
                    },
                  });
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        )}
      </Watch>
    </MainLayout>
  );
}

export function RankedPoliticians(
  props: Core.Navigator.RouteDefinitions["RankedPoliticians"]
) {
  return (
    <MainLayout
      title={props.party.politicalPartyName}
      onBack={() => {
        Core.Navigator.popPage();
      }}
    >
      <RankedPoliticianList
        politicians={props.party.politicians}
        onClick={(q) => {
          Core.Navigator.pushPage({
            page: "PoliticianSummaryPage",
            payload: {
              politician: q,
            },
          });
        }}
      />
    </MainLayout>
  );
}
