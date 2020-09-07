import React, { useState, Fragment } from "react";
import { List, Progress, Button, Input, Row, Col, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import * as P from "ts-prime";
import { Politician } from "../../Core";
import { partyInfo } from "../../Core/data";
import { Colors } from "../../Core/helpers";

const info = partyInfo();

function SinglePolitician(props: {
  politician: Politician.WithInfo;
  onClick: (politician: Politician.WithInfo) => void;
}) {
  

  return (
    <List.Item key={props.politician.id}>
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
                <div>
                  {props.politician.activityData ? (
                    <a
                      href={`https://www.lrs.lt/sip/portal.show?p_r=35299&p_k=1&p_a=498&p_asm_id=${props.politician.activityData?.politicianId}`}
                      target={"_blank"}
                    >
                      <Avatar
                        style={{
                          color: Colors.textColor(
                            info[props.politician.politicalPartyNumber].color ||
                              "#000"
                          ),
                          background:
                            info[props.politician.politicalPartyNumber].color,
                        }}
                        src={`https://www.lrs.lt/SIPIS/sn_foto/2016/${props.politician.id}.jpg`}
                      >
                        {props.politician.displayName.slice(0, 1)}
                      </Avatar>
                    </a>
                  ) : (
                    <Avatar
                      style={{
                        color: Colors.textColor(
                          info[props.politician.politicalPartyNumber].color ||
                            "#000"
                        ),
                        background:
                          info[props.politician.politicalPartyNumber].color,
                      }}
                    >
                      {props.politician.displayName.slice(0, 1)}
                    </Avatar>
                  )}
                </div>
                <div style={{ flexGrow: 1, paddingLeft: 15 }}>
                  {props.politician.activityData ? (
                    <a
                      href={`https://www.lrs.lt/sip/portal.show?p_r=35299&p_k=1&p_a=498&p_asm_id=${props.politician.activityData?.politicianId}`}
                      target={"_blank"}
                    >
                      <strong>{props.politician.displayName} </strong>
                    </a>
                  ) : (
                    <strong>{props.politician.displayName} </strong>
                  )}
                </div>
              </div>
              {props.politician.activityData ? (
                <Progress
                  key={props.politician.id}
                  strokeColor={{
                    from: "#108ee9",
                    to: "#87d068",
                  }}
                  showInfo={false}
                  percent={props.politician.score * 100}
                ></Progress>
              ) : (
                <div style={{ width: "90%" }}>
                  <div>
                    <strong>Neturime duomenų</strong>
                  </div>
                  <Progress
                    key={props.politician.id}
                    strokeColor={{
                      from: "#108ee9",
                      to: "#87d068",
                    }}
                    showInfo={false}
                    status={"exception"}
                    style={{ height: 15 }}
                  ></Progress>
                </div>
              )}
              <Row gutter={[5, 5]}>
                <Col>
                  <Avatar
                    size={"small"}
                    src={info[props.politician.politicalPartyNumber].logo}
                  ></Avatar>
                </Col>
                <Col>{props.politician.politicalPartyName}</Col>
              </Row>
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
            onClick={() => props.onClick(props.politician)}
            className={`btn btn-primary`}
          >
            Daugiau
          </button>
        </Col>
      </Row>
    </List.Item>
  );
}

export function RankedPoliticianList(props: {
  politicians: Politician.WithInfo[];
  onClick: (politic: Politician.WithInfo) => void;
}) {
  const [searchState, setSearchState] = useState("");
  return (
    <List
      header={
        <List.Item
          actions={[
            <Input
              placeholder={"Paieška"}
              onChange={(q) => setSearchState(q.target.value)}
            ></Input>,
          ]}
        >
          <div
            style={{
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
              <strong>Politikai</strong>
            </div>
          </div>
        </List.Item>
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 30,
      }}
      dataSource={P.sortBy(props.politicians, (q) => [
        !q.activityData,
        -1 * q.score,
      ]).filter((q) =>
        searchState === ""
          ? true
          : q.displayName
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .split(" ")
              .some((q) =>
                q.startsWith(
                  searchState
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                )
              )
      )}
      size={"default"}
      renderItem={(politician: Politician.WithInfo) => {
        return (
          <SinglePolitician
            key={politician.id}
            onClick={props.onClick}
            politician={politician}
          ></SinglePolitician>
        );
      }}
    ></List>
  );
}
