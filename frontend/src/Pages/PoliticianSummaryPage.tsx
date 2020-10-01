import { Watch } from '../Helpers';
import React from 'react';
import { Core } from '../Core';
import { MainLayout, LegislationVoteCompare } from '../Components';

export function PoliticianSummaryPage(
  props: Core.Navigator.RouteDefinitions['PoliticianSummaryPage']
) {
  return (
    <Watch
      data={Core.DataPoints.legislationListWithScores}
    >
      {({ legislationList, userVotes }) => {
        return (
          <MainLayout
            key={props.politician.displayName}
            title={props.politician.displayName}
            onBack={() => {
              Core.Navigator.popPage();
            }}
          >
            <LegislationVoteCompare
              key={props.politician.displayName}
              politician={props.politician}
              userVotes={userVotes}
              legislationList={legislationList}
            />
          </MainLayout>
        );
      }}
    </Watch>
  );
}
