import React from "react";
import { List, Progress, Button, Col, Row, Badge } from "antd";
import * as P from "ts-prime";
import { Politician, PoliticalParty, Core } from "../../Core";
import Avatar from "antd/lib/avatar/avatar";
import { useObservable } from "../../Helpers/rxjs";
import { imageFolder } from "../../Helpers";
import { selectedPagination } from "../RankedPoliticians";



function SingleParty(props: {
  party: PoliticalParty.WithInfo;
  onClick: (party: PoliticalParty.WithInfo) => void;
}) {
  const info = useObservable(Core.Store.store.colorData);

  return (
    <List.Item>
      <Row style={{ width: "100%" }}>
        <Col xs={18}>
          <div style={{ flexGrow: 1, display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div></div>
                <div style={{ flexGrow: 1, paddingLeft: 0 }}>
                  <Row gutter={[5, 5]}>
                    <Col>
                      {}
                      <Avatar
                        size={"large"}
                        src={imageFolder(
                          `parties/${info?.[props.party.partyId]?.logo}`
                        )}
                      ></Avatar>
                    </Col>
                    <Col className={"CENTER"}>
                      {props.party.politicalPartyName}
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ width: "90%" }}>
                <Progress
                  strokeColor={{
                    from: "#108ee9",
                    to: "#87d068",
                  }}
                  showInfo={false}
                  style={{ height: 15 }}
                  percent={props.party.score * 100}
                ></Progress>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                paddingLeft: 30,
              }}
            ></div>
          </div>
        </Col>
        <Col
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "95%",
              cursor: "pointer",
              display: "flex",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              // color: voteInfo.color,
              // background: voteInfo.background,
              borderRadius: "5px",
            }}
            onClick={() => {
              selectedPagination.next(1)
              props.onClick(props.party)
            }}
            className={`btn btn-primary`}
          >
            Daugiau
          </button>
        </Col>
      </Row>
    </List.Item>
  );
}

export interface Party {
  partyId: string;
  politicalPartyName: string;
  politicalPartyNumber: string;
  size: number;
  politicians: Politician.WithInfo[];
  score: number;
}

export function RankedParties(props: {
  parties: ReadonlyArray<PoliticalParty.WithInfo>;
  onClick: (party: PoliticalParty) => void;
}) {
  return (
    <List
      header={
        <List.Item actions={[]}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                minWidth: "50%",
                flexGrow: 1,
                maxWidth: "80%",
                padding: 0,
                paddingLeft: 0,
                paddingRight: 10,
              }}
            >
              <strong>Partijos</strong>
            </div>
            <div>
              <button
                onClick={() => {
                  console.log("Reset");
                  Core.Events.resetQuiz();
                  Core.Navigator.pushPage({
                    page: "LegislationQuizPage",
                    payload: {},
                  });
                }}
                className={"btn btn-success btn-sm"}
              >
                Kartoti
              </button>
            </div>
          </div>
        </List.Item>
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 30,
      }}
      dataSource={P.sortBy(props.parties, (q) => -1 * q.score)}
      size={"default"}
      renderItem={(party: PoliticalParty.WithInfo) => {
        return (
          <SingleParty party={party} onClick={props.onClick}></SingleParty>
        );
      }}
    ></List>
  );
}
