import React, { Fragment } from 'react';
import { List, Row, Col } from 'antd';
import * as P from 'ts-prime';
import { Legislation, User, Politician } from '../../Core';

function PoliticianVote(props: { vote: Legislation.Vote }) {
  const { vote } = props;
  const { background, color, translation } = Legislation.Vote.getVoteConfig(
    vote
  );
  return (
    <div
      style={{
        color,
        background,
        maxWidth: '20%',
        minWidth: '80px',
        height: '35px',
        fontSize: 13,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
      }}
    >
      {translation}
    </div>
  );
}

function UserVote(props: { vote: User.Vote }) {
  const { vote } = props;
  const { background, color, translation } = User.Vote.getVoteConfig(vote);
  return (
    <div
      style={{
        color,
        background,
        maxWidth: '20%',
        minWidth: '80px',
        height: '35px',
        fontSize: 13,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
      }}
    >
      {translation}
    </div>
  );
}

function SingleLegislationCompare(props: {
  legislation: Legislation;
  userVote: User.Vote;
  politicianVote: Legislation.Vote;
}) {
  const { legislation } = props;
  return (
    <List.Item>
      <Row style={{ width: '100%' }}>
        <Col xs={12} xl={18} span={18}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: 14,
                minWidth: '50%',
                flexGrow: 1,
                maxWidth: '80%',
                padding: 5,
                paddingLeft: 0,
                paddingRight: 10,
              }}
            >
              <a href={legislation.linkToOrder} target={"_blank"}><strong>{legislation.order}</strong></a>
            </div>
          </div>
        </Col>
        <Col
          xs={6}
          xl={3}
          span={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PoliticianVote vote={props.politicianVote}></PoliticianVote>
        </Col>
        <Col
          xs={6}
          xl={3}
          span={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <UserVote vote={props.userVote}></UserVote>
        </Col>
      </Row>
    </List.Item>
  );
}

export function LegislationVoteCompare(props: {
  politician: Politician.WithInfo;
  userVotes: Record<string, User.Vote>;
  legislationList: readonly Legislation[];
}) {
  return (
    <Fragment>
      <List
        header={
          <List.Item
            style={{ padding: 0 }}
            actions={[
              <div
                style={{
                  maxWidth: '20%',
                  minWidth: '80px',
                  height: '50px',
                  fontSize: 13,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <strong>Politikas</strong>
              </div>,
              <div
                style={{
                  maxWidth: '20%',
                  minWidth: '80px',
                  height: '50px',
                  fontSize: 13,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <strong>Jūs</strong>
              </div>,
            ]}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  minWidth: '50%',
                  flexGrow: 1,
                  maxWidth: '80%',
                  padding: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <strong>Įstatymas</strong>
              </div>
            </div>
          </List.Item>
        }
      >
        {P.pipe(
          props.legislationList,
          P.filter(q => props.userVotes[q.legislationId] !== User.Vote.SKIP),
          P.map(q => ({
            ...q,
            votes: P.indexBy(q.votes, vote => vote.politicianId),
          })),
          P.sortBy(legislation => {
            const politicianVote =
              legislation.votes[props.politician.id]?.vote ||
              Legislation.Vote.MISSING;
            const userVote = props.userVotes[legislation.legislationId] || User.Vote.SKIP;
            return [
              politicianVote !== userVote,
              politicianVote === Legislation.Vote.MISSING,
            ];
          }),
          P.map(legislation => {
            return (
              <SingleLegislationCompare
                legislation={{
                  ...legislation,
                  votes: Object.values(legislation.votes),
                }}
                politicianVote={
                  legislation.votes[props.politician.activityData?.politicianId || '']?.vote ||
                  Legislation.Vote.MISSING
                }
                userVote={props.userVotes[legislation.legislationId] || User.Vote.SKIP}
              ></SingleLegislationCompare>
            );
          })
        )}
      </List>
    </Fragment>
  );
}
