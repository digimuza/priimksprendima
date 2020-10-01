import { BehaviorSubject, Observable, combineLatest, merge, ReplaySubject, Subscription, never } from 'rxjs';
import { Legislation, Politician, User, PoliticalParty } from './models';
import * as RXO from 'rxjs/operators';
import * as P from 'ts-prime'
import { Score } from '../Calculations';
import { getLegislations, getPoliticians, partyInfo } from './data';
import { LocalStorage } from './localStorage';
import { toId } from '../Helpers';

const quizLocalStorage = new LocalStorage<Record<string, User.Vote>>('priimk_sprendima_quiz')
export namespace Core {
  export interface Navigator {
    popPage(): void;
    pushPage(data: Navigator.RoutePayload): void;
  }
  export namespace Navigator {
    export interface RouteDefinitions {
      LegislationQuizPage: {};
      RankingPage: {};
      LoadingPage: {};
      PoliticianSummaryPage: {
        politician: Politician.WithInfo;
      };
      FakeProgress: {}
      RankedPoliticians: {
        showPoltiticianNumber?: boolean
        party: PoliticalParty
      }
    }
    export type RoutePayload = {
      [k in keyof RouteDefinitions]: { page: k; payload: RouteDefinitions[k] };
    }[keyof RouteDefinitions];
    const navigator = new BehaviorSubject<{
      current: RoutePayload;
      prev: ReadonlyArray<RoutePayload>;
    }>({
      current: { page: 'LoadingPage', payload: {} }, prev: []
    });
    export function listen(): Observable<RoutePayload> {
      return navigator.pipe(RXO.map((q) => q.current));
    }
    export function popPage() {
      const prev = [...navigator.getValue().prev];
      const c = prev.shift()
      if (c == null) {
        return navigator.next({
          current: { page: 'LoadingPage', payload: {} }, prev: []
        })
      }
      return navigator.next({ current: c, prev: prev });
    }
    export function pushPage(route: RoutePayload): void {
      const current = navigator.getValue();
      return navigator.next({ current: route, prev: [current.current, ...current.prev] });
    }
  }
  export namespace Store {
    export const store = {
      ready: new BehaviorSubject<boolean>(false),
      colorData: new BehaviorSubject<Record<string, { logo: string, color: string }> | null>(null),
      politicians: new BehaviorSubject<ReadonlyArray<Politician> | null>(null),
      legislationList: new BehaviorSubject<ReadonlyArray<Legislation> | null>(null),
      userVotes: new BehaviorSubject<Record<string, User.Vote> | null>(null)
    }
  }

  export namespace DataPoints {
    const notNull = RXO.filter(P.isDefined)
    const log = <T>(_message: string) => RXO.tap<T>((_q) => console.log(_message))
    export const userVotes = Store.store.userVotes.pipe(notNull, log('Got userVotes'))
    export const legislationList = Store.store.legislationList.pipe(notNull, log('Got legislationList'))
    export const politiciansList = Store.store.politicians.pipe(notNull, log('Got politiciansList'), RXO.map((q) => P.pipe(q, P.uniqBy((q) => q.id))))

    export const userVotesWithLegislation = combineLatest(userVotes, legislationList, (w, xc) => (
      {
        userVotes: w,
        legislationList: xc
      }
    )).pipe(log('Got bundle'))


    export const legislationListWithScores = combineLatest(
      politiciansList, userVotes, legislationList, (politicians, userVotes, legislationList) => ({ politicians, userVotes, legislationList }),
    ).pipe(
      RXO.map(({ legislationList, politicians, userVotes }) => {
        const rawScores = P.indexBy(Score.calculateRawScores({ politicians, data: legislationList, userVotes }), (q) => q.legislationId)
        return {
          legislationList: legislationList.map((q): Legislation.WithScore => {
            return {
              ...q,
              legislationScore: rawScores[q.legislationId].legislationScore
            }
          }),
          userVotes,
        }
      }),
      RXO.shareReplay(1)
    )

    export const politiciansWithScores = combineLatest(
      politiciansList, userVotesWithLegislation, (politicians, data) => ({ politicians, ...data })
    ).pipe(
      RXO.map(({
        politicians, legislationList, userVotes
      }) => {
        const rawScores = Score.calculateRawScores({ politicians, data: legislationList, userVotes })
        const votes = P.pipe(rawScores.flatMap((q) => (q.politiciansWithScores || [])), P.groupBy((q) => q.politicianId))
        const normalized = Score.calculateNormalizedPoliticianScore(rawScores)
        return {
          politicianScores: politicians.map((iSinglePolitician): Politician.WithInfo => {
            return {
              votes: votes[iSinglePolitician.id].map((q) => q.politicianVote).filter(P.isDefined),
              ...iSinglePolitician,
              score: normalized.p[iSinglePolitician.id] || 0,
            }
          }),
          userScore: normalized.userScore
        }
      }),
      RXO.shareReplay(1)
    )

    export const politicalPartiesWithPoliticians = combineLatest(
      politiciansWithScores, userVotesWithLegislation, (politicians, data) => ({ politicians, ...data })
    ).pipe(
      RXO.map(({
        politicians
      }) => {
        const parties = Object.entries(
          P.pipe(
            politicians.politicianScores,
            // P.filter(q => q.activityData != null),
            P.groupBy(q => q.politicalPartyNumber)
          )
        )
          .map(([partyId, iPolitician]) => {
            if (iPolitician.length === 0) {
              return undefined;
            }
            const f = iPolitician[0];

            const activePoliticians = P.pipe(
              iPolitician,
              P.filter((q) => !!q.activityData),
            )

            const getPoliticianScore = (politicians: Politician.WithInfo[]) => {
              if (politicians.length === 0) {
                return 0
              }
              return P.pipe(
                politicians,
                P.reduce((acc, current) => acc + current.score, 0),
                (q) => q / politicians.length,
              )
            }

            const calculateStatisticalScore = () => {
              return getPoliticianScore(activePoliticians) * Math.pow(activePoliticians.length, 0.5)
            }

            return {
              partyId: toId(f.politicalPartyName),
              politicalPartyName: f.politicalPartyName,
              politicalPartyNumber: f.politicalPartyNumber,
              size: iPolitician.length,
              politicians: iPolitician,
              score: calculateStatisticalScore(),
            };
          })
          .filter(P.isDefined)
        const max = Math.max(...parties.map((q) => Math.abs(q.score)))
        const withNormalizedScore = parties.map(w => {
          return {
            ...w,
            score: w.score / max,
          };
        });

        return {
          parties: withNormalizedScore,
          politicians
        }
      }),
      RXO.shareReplay(1),
    )
  }

  export namespace Events {
    export interface EventsDefinitions {
      QUIZ_DONE: { userVotes: Record<string, User.Vote> }
      RESET_QUIZ: {}
    }
    export type Event = {
      [k in keyof EventsDefinitions]: { event: k, payload: EventsDefinitions[k] }
    }[keyof EventsDefinitions]
    export const events = new ReplaySubject<Event>(1)
    export const quizDone = (userVotes: Record<string, User.Vote>) => {
      events.next({ event: 'QUIZ_DONE', payload: { userVotes } })
    }

    export const resetQuiz = () => {
      events.next({ event: 'RESET_QUIZ', payload: {} })
    }

    export function init(): Subscription {
      const handleQuiz = events.pipe(RXO.map((q) => {
        switch (q.event) {
          case 'QUIZ_DONE':
            quizLocalStorage.set(q.payload.userVotes)
            Store.store.userVotes.next(q.payload.userVotes)
            return
          case 'RESET_QUIZ':
            quizLocalStorage.clear()
            return Store.store.userVotes.next(null)
          default:
            return undefined
        }
      }))
      return merge(handleQuiz).subscribe()
    }
  }



  export function init() {
    Events.init()
    const url = new URL(window.location.href)

    const legislationUrl = new URL(url.origin)
    legislationUrl.pathname = "/data/legislation-data.json"

    partyInfo().then((q) => {
      Store.store.colorData.next(q)
    })

    getLegislations().then((legislations) => {
      Store.store.legislationList.next(legislations)
      return getPoliticians(legislations).then((politicians) => {
        Store.store.politicians.next(politicians)
        const gotAnswers = quizLocalStorage.get()
        if (P.isDefined(gotAnswers)) {
          Store.store.userVotes.next(gotAnswers)
          Core.Navigator.pushPage({
            page: 'RankingPage',
            payload: {}
          })
          return
        }

        Core.Navigator.pushPage({
          page: 'LegislationQuizPage',
          payload: {}
        })
      }).then(() => console.log("DONE"))
    })
  }
}
