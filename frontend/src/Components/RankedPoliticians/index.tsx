import React, { useState, Fragment, useMemo } from "react";
import { List, Progress, Input, Row, Col, Select, Checkbox, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import * as P from "ts-prime";
import { Politician, Core, Legislation } from "../../Core";
import { partyInfo } from "../../Core/data";
import { Colors } from "../../Core/helpers";
import { AutoComplete } from "antd";
import { BehaviorSubject } from "rxjs";
import { useObservable } from "../../Helpers/rxjs";
import { imageFolder } from "../../Helpers";
import { MinMaxBar } from "../Common/ProgressBar";

function SinglePolitician(props: {
  politician: Politician.WithInfo;
  onClick: (politician: Politician.WithInfo) => void;
}) {
  const info = useObservable(Core.Store.store.colorData);
  const stats =
    (props.politician.votes || []).filter((q) => q === Legislation.Vote.MISSING)
      .length / (props.politician.votes || []).length;
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
                          color: Colors.correctBackgroundTextColor(
                            info?.[props.politician.politicalPartyId]?.color ||
                              "#000"
                          ),
                          background:
                            info?.[props.politician.politicalPartyId]?.color,
                        }}
                        src={`https://www.lrs.lt/SIPIS/sn_foto/2016/${props.politician.id}.jpg`}
                      >
                        {props.politician.displayName.slice(0, 1)}
                      </Avatar>
                    </a>
                  ) : (
                    <Avatar
                      style={{
                        color: Colors.correctBackgroundTextColor(
                          info?.[props.politician.politicalPartyId]?.color ||
                            "#000"
                        ),
                        background:
                          info?.[props.politician.politicalPartyId]?.color,
                      }}
                    >
                      {props.politician.displayName.slice(0, 1)}
                    </Avatar>
                  )}
                </div>
                <div style={{ flexGrow: 1, paddingLeft: 15 }}>
                  <Row gutter={[15, 0]}>
                    <Col>
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
                    </Col>
                    <Col>
                      {!isNaN((1 - stats) * 100) && (
                        <Tag>Lankomumas {((1 - stats) * 100).toFixed(0)}%</Tag>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ height: 10 }}></div>
              {props.politician.activityData ? (
                <MinMaxBar value={props.politician.score}></MinMaxBar>
              ) : (
                // <Progress
                //   key={props.politician.id}
                //   strokeColor={{
                //     from: "#108ee9",
                //     to: "#87d068",
                //   }}
                //   showInfo={false}
                //   percent={props.politician.score * 100}
                // ></Progress>
                <Fragment>
                  <Row style={{ width: "90%" }}>
                    <Col>
                      <strong>Neturime duomenų</strong>
                    </Col>
                  </Row>
                  <MinMaxBar value={props.politician.score}></MinMaxBar>
                </Fragment>
              )}
              <div style={{ height: 10 }}></div>
              <Row gutter={[5, 5]}>
                <Col>
                  <Avatar
                    size={"small"}
                    src={imageFolder(
                      `parties/${
                        info?.[props.politician.politicalPartyId]?.logo
                      }`
                    )}
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
            disabled={!props.politician.activityData}
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

export const selectedPagination = new BehaviorSubject<number | null>(null);
export const onlyWithData = new BehaviorSubject<boolean>(false);
export function RankedPoliticianList(props: {
  politicians: Politician.WithInfo[];
  onClick: (politic: Politician.WithInfo) => void;
}) {
  const onlyWithDataS = useObservable(onlyWithData);
  const iSelectedPagination = useObservable(selectedPagination);
  return (
    <Fragment>
      <List
        header={
          <List.Item>
            <Row align={"middle"} style={{ width: "100%" }}>
              <Col flex={1}>
                <Row>
                  <Col>
                    <strong>Politikai</strong>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Checkbox
                      checked={!!onlyWithDataS}
                      onChange={(e) => {
                        onlyWithData.next(e.target.checked);
                      }}
                    >
                      Politikai tik su duomenimis
                    </Checkbox>
                  </Col>
                </Row>
              </Col>
              <Col>
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
              </Col>
            </Row>
          </List.Item>
        }
        pagination={{
          current: iSelectedPagination ?? 1,
          onChange: (page) => {
            selectedPagination.next(page);
          },
          hideOnSinglePage: true,
          pageSize: 10,
        }}
        dataSource={P.sortBy(
          props.politicians.filter((q) => {
            if (onlyWithDataS) {
              return !!q.activityData;
            }
            return true;
          }),
          (q) => [-1 * q.score]
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
      <div style={{ height: 100 }}></div>
    </Fragment>
  );
}

const selectedRegionSubject = new BehaviorSubject<string | null>(null);
export function RankedPoliticianListWithSearchAndRegion(props: {
  politicians: Politician.WithInfo[];
  onClick: (politic: Politician.WithInfo) => void;
}) {
  const selectedRegion = useObservable(selectedRegionSubject);
  const regions = useMemo(() => {
    return P.pipe(
      props.politicians,
      P.map((q) => q.region),
      P.filter(P.isDefined),
      P.uniq(),
      P.sortBy((q) => q)
    );
  }, [props.politicians]);

  function onChange(value: string) {
    selectedPagination.next(1);
    if (value === "-") {
      selectedRegionSubject.next(null);
      return;
    }
    selectedRegionSubject.next(value);
  }

  return (
    <Fragment>
      <Row style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={24}>
          <Select
            style={{ width: "100%" }}
            showSearch
            allowClear
            onChange={onChange}
            placeholder="Apygarda"
            value={selectedRegion || undefined}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option key={"-"} value={"-"}>
              -
            </Select.Option>
            {regions.map((q) => (
              <Select.Option key={q} value={q}>
                {q}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <RankedPoliticianList
        politicians={props.politicians
          .filter((q) => q.region)
          .filter((q) => {
            if (selectedRegion == null) return true;

            return q.region === selectedRegion;
          })}
        onClick={props.onClick}
      ></RankedPoliticianList>
    </Fragment>
  );
}

export function RankedPoliticianListWithSearch(props: {
  politicians: Politician.WithInfo[];
  onClick: (politic: Politician.WithInfo) => void;
}) {
  const [searchState, setSearchState] = useState("");

  return (
    <Fragment>
      <Row style={{ width: "100%" }}>
        <Col xs={0} md={20}></Col>
        <Col xs={24} sm={2} md={4}>
          <Input
            placeholder={"Paieška"}
            onChange={(q) => setSearchState(q.target.value)}
          ></Input>
        </Col>
      </Row>
      <RankedPoliticianList
        politicians={props.politicians.filter((q) =>
          q.displayName.toLowerCase().startsWith(searchState)
        )}
        onClick={props.onClick}
      ></RankedPoliticianList>
    </Fragment>
  );
}
