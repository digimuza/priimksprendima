import { FullScreenNoToolbar } from "../Components";
import React from "react";
import { Col, Row, Typography } from "antd";
import { Watch } from "../Helpers";
import { BehaviorSubject, from, interval, of } from "rxjs";
import * as RXO from "rxjs/operators";
import * as P from "ts-prime";
import { Core } from "../Core";
import { useObservable } from "../Helpers/rxjs";
import App from "../App";
export const Message = (props: { message: string, duration: number, next: () => void }) => {
  useObservable(
    of(true).pipe(RXO.delay(props.duration), RXO.tap(() => {
      props.next()
    }))
  )
  return <div
    className={"CENTER STRETCH"}
    style={{ flexDirection: "column" }}
  >
    <Typography.Title className={"ResponsiveText"}>
      {props.message}
    </Typography.Title>
    <img
      style={{ height: "auto", width: "75px" }}
      src="images/FavIco.svg"
      alt=""
    />
  </div>
}

function plural(args: {
  count: number,
  single: (c: number) => string
  multiCount: (c: number) => string
}) {
  return args.count > 1 ? args.multiCount(args.count) : args.single(args.count)
}

const GetMoreData = (props: {
  next: () => void
}) => {
  const votes = useObservable(Core.Store.store.userVotes.pipe(RXO.map((q) => {
    return Object.entries(q || {}).length
  })))
  if (votes == null) {
    return <div></div>
  }

  if (votes < 5) {
    return <div
      className={"CENTER STRETCH"}
      style={{ flexDirection: "column" }}
    >
      <Row gutter={[20, 20]}>
        <Col>
          <img
            style={{ height: "auto", width: "75px" }}
            src="images/FavIco.svg"
            alt=""
          />
        </Col>
      </Row>
      <Typography.Title className={"ResponsiveText"}>
        Esate užpildę tik {
          plural({
            count: votes,
            multiCount: (votes) => {
              return `${votes} klausimus`
            },
            single: (votes) => {
              return `${votes} klausimą`
            }
          })
        }
      </Typography.Title>
      <Typography.Paragraph>Užpildžius pilną klausimyną gautumėte tikslesnius rezultatus</Typography.Paragraph>
      <Row gutter={[10, 10]}>
        <Col>
          <button
            onClick={() => {
              Core.Events.resetQuiz();
              Core.Navigator.pushPage({
                page: "LegislationQuizPage",
                payload: {},
              });
            }}
            className={"btn btn-info"}
          >Pildyti pilną klausimyną</button>
        </Col>
        <Col>
          <button
            onClick={() => {
              props.next()
            }}
            className={"btn btn-danger"}
          >Rodyti rezultatus</button>
        </Col>
      </Row>

    </div>
  }
  props.next()
  return null
}
const Control = new BehaviorSubject(0)
export function FakeProgress() {
  const baseProp = () => {
    return {
      next: () => {
        Control.next(Control.getValue() + 1)
      },
      duration: P.clamp(Math.random() * 2 * 1000, { min: 1000, max: 2000 })
    }
  }
  const messages = [
    {
      Component: () => {
        return <GetMoreData next={() => {
          Control.next(Control.getValue() + 1)
        }}></GetMoreData>
      },
    },
    {
      Component: () => {
        return <Message {...baseProp()} message={"Traukiami LRS balsavimo rezultatai"}></Message>
      },
    },
    {
      Component: () => {
        return <Message {...baseProp()} message={"Lyginami balsavimo duomenys"}></Message>
      },
    },
    {
      Component: () => {
        return <Message {...baseProp()} message={"Vykdomas išmanusis reitingavimas"}></Message>
      },
    },
    {
      Component: () => {
        return <Message {...baseProp()} message={"Vykdomas išmanusis reitingavimas"}></Message>
      },
    },
    {
      Component: () => {
        Core.Navigator.pushPage({
          page: 'RankingPage',
          payload: {}
        })
        return null
      }
    },
  ];
  return (
    <FullScreenNoToolbar title={""} className={"FakeProgressPage"}>
      <Watch
        data={Control.pipe(
          RXO.map((comp) => messages[comp]),
          RXO.filter(P.isDefined)
        )}
      >
        {({ Component }) => {
          return <Component></Component>
        }}
      </Watch>
    </FullScreenNoToolbar>
  );
}
