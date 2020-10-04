import React, { useRef, useState, useEffect, Fragment } from "react";
import {
  Card,
  Typography,
  Progress,
  Row,
  Col,
} from "antd";
import { YouTubeView } from "../Common/Youtube";
import { BehaviorSubject } from "rxjs";
import { Legislation, User } from "../../Core";
import { MainLayout } from "../Layout";
export type UserVote = "FOR" | "AGAINST" | "SKIP";
export namespace UserVote {
  export const FOR = "FOR";
  export const AGAINST = "AGAINST";
  export const SKIP = "SKIP";
}

function VoteButton(props: {
  vote: User.Vote;
  onClick: (vote: User.Vote) => void;
}) {
  const { vote, onClick } = props;
  const voteInfo = User.Vote.getVoteConfig(vote);
  return (
    <button
      style={{
        height: "50px",
        width: "100%",
        cursor: "pointer",
        display: "flex",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        // color: voteInfo.color,
        // background: voteInfo.background,
        borderRadius: "5px",
      }}
      onClick={() => {
        onClick(props.vote);
        // history.push("/quiz");
      }}
      className={`btn ${voteInfo.class}`}
    >
      {voteInfo.translation}
    </button>
    // <div
    //   onClick={() => onClick(props.vote)}
    //   style={{
    //     height: '50px',
    //     cursor: 'pointer',
    //     display: 'flex',
    //     margin: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     color: voteInfo.color,
    //     background: voteInfo.background,
    //     borderRadius: '5px',
    //   }}
    //   key={vote}
    // >
    //   {voteInfo.translation}
    // </div>
  );
}

function Slide(props: { legislation: Legislation }) {
  const { legislation } = props;
  const ref = useRef(new BehaviorSubject<boolean>(false));
  return (
    <Card
      style={{ margin: 0 }}
      cover={
        <YouTubeView
          play={ref.current}
          url={legislation.youtubeUrl}
        ></YouTubeView>
      }
    >
      <Typography.Title className={"LegislationTitle"}>
        {legislation.order}
      </Typography.Title>

      <Typography.Paragraph>{legislation.fullOrder}</Typography.Paragraph>
      <a href={legislation.linkToOrder} target={"_blank"}>
        Nuoroda į įstatymą
      </a>
      <br></br>
      <br></br>
      {props.legislation.summary && (
        <div>
          <h6>Apibendrinimas</h6>
          <ul>
            {props.legislation.summary
              ?.split(";")
              .filter((q) => q)
              .map((q) => {
                return <li>{q}</li>;
              })}
          </ul>
        </div>
      )}
      <Row gutter={[10, 10]}>
        <Col md={12}>
          {props.legislation.argumentFor && (
            <div className={"legislation-arguments legislation-arguments-for"}>
              <h6>Už</h6>
              <ul>
                {props.legislation.argumentFor
                  ?.split(";")
                  .filter((q) => q)
                  .map((q) => (
                    <li>{q}</li>
                  ))}
              </ul>
            </div>
          )}
        </Col>
        <Col md={12}>
          {props.legislation.argumentAgainst && (
            <div
              className={"legislation-arguments legislation-arguments-against"}
            >
              <h6>Prieš</h6>
              <ul>
                {props.legislation.argumentAgainst
                  ?.split(";")
                  .filter((q) => q)
                  .map((q) => (
                    <li>{q}</li>
                  ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export interface LegislationQuiz {
  legislationList: ReadonlyArray<Legislation>;
  onDone: (result: Record<string, User.Vote>) => void;
}

export function LegislationSlide(props: {
  disableSkipButton?: boolean
  legislation: Legislation,
  onDone: (result: Record<string, User.Vote>) => void;
}) {
  const { legislation, onDone } = props
  const ref = useRef<Record<string, User.Vote>>({});
  const userClickHandler = (vote: User.Vote) => {
    ref.current[legislation.legislationId] = vote;
    onDone(ref.current)
  };
  return <MainLayout
    className={"LegislationQuiz"}
    key={"4"}
    title={"Balsuok"}
    footer={
      <Fragment>
        <Row>
          <Col span={8}>
            <VoteButton
              onClick={userClickHandler}
              vote={User.Vote.FOR}
            ></VoteButton>
          </Col>
          {
            !props.disableSkipButton ? <Col span={8}>
              <VoteButton
                onClick={userClickHandler}
                vote={User.Vote.SKIP}
              ></VoteButton>
            </Col> : <Col span={8}>
              </Col>
          }

          <Col span={8}>
            <VoteButton
              onClick={userClickHandler}
              vote={User.Vote.AGAINST}
            ></VoteButton>
          </Col>
        </Row>
      </Fragment>
    }
  >
    <Slide legislation={props.legislation}></Slide>
  </MainLayout>
}


export function LegislationQuiz(props: LegislationQuiz) {
  const ref = useRef<Record<string, User.Vote>>({});
  const { legislationList, onDone } = props;
  const [state, setSlide] = useState(0);
  const data = legislationList.map((q, index) => ({ legislation: q, index }));
  useEffect(() => {
    if (data.length === state) {
      onDone(ref.current);
    }
  }, [state, data.length, onDone]);

  return (
    <Fragment>
      {data.slice(state, state + 2).map((q) => {
        const userClickHandler = (vote: User.Vote) => {
          ref.current[q.legislation.legislationId] = vote;
          setSlide(state + 1);
        };
        const getHiddenStyles = () => {
          if (q.index === state) {
            return {
              position: "inherit",
              visibility: "visible",
            } as const;
          }

          return {
            position: "fixed",
            top: -5000,
            visibility: "hidden",
          } as const;
        };
        return (
          <div key={q.legislation.legislationId} style={getHiddenStyles()}>
            <MainLayout
              className={"LegislationQuiz"}
              key={"4"}
              title={"Balsuok"}
              footer={
                <Fragment>
                  <Row key={"4"}>
                    <Col
                      style={{ paddingRight: 10, paddingLeft: 10 }}
                      span={24}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {q.index + 1}/{data.length}
                      </div>
                      <Progress
                        key={"1"}
                        showInfo={false}
                        percent={(q.index / (data.length - 1)) * 100}
                      ></Progress>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <VoteButton
                        onClick={userClickHandler}
                        vote={User.Vote.FOR}
                      ></VoteButton>
                    </Col>
                    <Col span={8}>
                      <VoteButton
                        onClick={userClickHandler}
                        vote={User.Vote.SKIP}
                      ></VoteButton>
                    </Col>
                    <Col span={8}>
                      <VoteButton
                        onClick={userClickHandler}
                        vote={User.Vote.AGAINST}
                      ></VoteButton>
                    </Col>
                  </Row>
                </Fragment>
              }
            >
              <Slide {...q}></Slide>
            </MainLayout>
          </div>
        );
      })}
    </Fragment>
  );
}
