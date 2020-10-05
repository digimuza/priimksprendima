import React from "react";
import { List, Progress, Button, Col, Row, Badge, Collapse } from "antd";
import * as P from "ts-prime";
import { Politician, PoliticalParty, Core } from "../../Core";
import Avatar from "antd/lib/avatar/avatar";
import { useObservable } from "../../Helpers/rxjs";
import { imageFolder } from "../../Helpers";
import { selectedPagination } from "../RankedPoliticians";
import { MinMaxBar } from "../Common/ProgressBar";
import { ProgramPlan } from "./parties-programs";
const txt = `Mums svarbi pagarba žmogui ir jo orumui.
Gerbiame asmens laisvę ir atsakomybės pareigą.
Tikime gėriu, teisingumu ir Tauta.
Remiamės krikščioniškosios Vakarų civilizacijos principais.

Mūsų tikslai:
• stiprinti demokratiją ir visur siekti teisingumo;
• valdžia privalo tarnauti žmonėms;
• referendumams organizuoti reiktų 100 tūkstančių piliečių parašų;
• Seimo narių skaičių sumažinti iki 101;
• panaikinti partijų finansavimą iš valstybės biudžeto;
• pertvarkyti teisėjų ir prokurorų atrankos ir vertinimo  sistemą;
• baigti vykdyti liustraciją. (Liustracija yra patikrinimas, ar asmuo bendradarbiavo su KGB. KGB – buvusios Sovietų Sąjungos slaptoji tarnyba.)`;
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
              <ProgramPlan partyId={props.party.partyId}></ProgramPlan>
              <div style={{ width: "90%" }}>
                <MinMaxBar value={props.party.score}></MinMaxBar>
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
              selectedPagination.next(1);
              props.onClick(props.party);
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
  const votes = useObservable(Core.Store.store.userVotes);
  const Bu = () => {
    if (votes == null) return null;
    if (Object.values(votes).length < 10) {
      return (
        <button
          onClick={() => {
            Core.Events.resetQuiz();
            Core.Navigator.pushPage({
              page: "LegislationQuizPage",
              payload: {},
            });
          }}
          className={"btn btn-success btn-sm"}
        >
          Pildyti pilną klausimyną
        </button>
      );
    }
    return (
      <button
        onClick={() => {
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
    );
  };
  return (
    <List
      header={
        <List.Item>
          <Row align={"middle"} style={{ width: "100%" }}>
            <Col flex={1}>
              <Row>
                <Col>
                  <strong>Partijos</strong>
                </Col>
              </Row>
            </Col>
            <Col>
              <Bu></Bu>
            </Col>
          </Row>
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
