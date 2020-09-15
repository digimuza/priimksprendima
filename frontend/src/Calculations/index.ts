import { Legislation, User, Politician } from '../Core';
import * as P from 'ts-prime';
import * as z from 'zod'

export namespace Score {
    function calculateLegislationScore(
        _iMaxMembers: number,
        iDecisionTreshold: number,
        iFor: number,
        iAgainst: number,
        iAbstained: number
    ): number {
        const participated = iFor + iAgainst + iAbstained;
        const votingMultiplier = 1 - Math.abs(iFor / participated - 0.5) / 0.5;
        const participationMultiplier =
            participated < iDecisionTreshold
                ? 2 * (participated / iDecisionTreshold)
                : 2 - (participated - 71) / 71;
        return votingMultiplier * participationMultiplier;
    }

    function voteToInt(iVote: Legislation.Vote): 0 | 1 | 2 | 3 {
        switch (iVote) {
            case Legislation.Vote.FOR:
                return 0;
            case Legislation.Vote.AGAINST:
                return 1;
            case Legislation.Vote.IDLE:
                return 2;
            case Legislation.Vote.MISSING:
                return 3;
        }
    }

    function calculateDecisionScore(
        iPoliticianVote: Legislation.Vote,
        iUserVote: User.Vote
    ): number {
        const weightsFor = [8, 2, 3.5, 2.5];
        const weightsAgainst = [2, 8, 3.5, 3.0];

        return z.number().parse(iUserVote === User.Vote.FOR
            ? weightsFor[voteToInt(iPoliticianVote)]
            : weightsAgainst[voteToInt(iPoliticianVote)])
    }

    export interface RankedLegislationsPolitciansIds {
        legislationId: string;
        legislationScore: number;
        userScore: number
        politiciansWithScores:
        | {
            politicianScore: number;
            politicianId: string;
        }[]
        | null;
    }

    export function toPoliticianVote(q: User.Vote): Legislation.Vote {
        if (q === '@') {
            return Legislation.Vote.IDLE
        }

        return q
    }

    export function calculateRawScores(
        politicians: readonly Politician[],
        data: readonly Legislation[],
        userVotes: Record<string, User.Vote>
    ): ReadonlyArray<RankedLegislationsPolitciansIds> {

        return P.pipe(
            data,
            P.map((legislation) => {
                const userVote = userVotes[legislation.legislationId]
                const userVote2 =  toPoliticianVote(userVotes[legislation.legislationId])
                const votingInfo = legislation.votes
                    .map((q) => q.vote)
                    .reduce(
                        (acc, current) => {
                            switch (current) {
                                case Legislation.Vote.FOR:
                                    acc[Legislation.Vote.FOR]++;
                                    break;
                                case Legislation.Vote.AGAINST:
                                    acc[Legislation.Vote.AGAINST]++;
                                    break;
                                case Legislation.Vote.IDLE:
                                    acc[Legislation.Vote.IDLE]++;
                                    break;
                                case Legislation.Vote.MISSING:
                                    acc[Legislation.Vote.MISSING]++;
                                    break;
                            }
                            acc.total += 1
                            return acc;
                        },
                        {
                            total: 0,
                            [Legislation.Vote.AGAINST]: 0,
                            [Legislation.Vote.FOR]: 0,
                            [Legislation.Vote.IDLE]: 0,
                            [Legislation.Vote.MISSING]: 0,
                        }
                    );

                const legislationScore = calculateLegislationScore(
                    141,
                    71,
                    votingInfo[Legislation.Vote.FOR],
                    votingInfo[Legislation.Vote.AGAINST],
                    votingInfo[Legislation.Vote.IDLE]
                );

                const idleScore = calculateDecisionScore(
                    Legislation.Vote.IDLE,
                    userVotes[legislation.legislationId] || User.Vote.SKIP
                ) * legislationScore
                const indexedVotes = P.indexBy(legislation.votes, (vote) => vote.politicianId)

                const politiciansWithScores =
                    userVotes[legislation.legislationId] == null
                        ? null
                        : politicians.map((q) => {
                            const politicianVote = indexedVotes[q.activityData?.politicianId || '']
                            if (politicianVote == null) {
                                return {
                                    politicianId: q.id,
                                    politicianScore: idleScore
                                }
                            }
                            const polScore = calculateDecisionScore(
                                politicianVote.vote,
                                userVotes[legislation.legislationId]
                            )
                            return {
                                politicianId: q.id,
                                politicianScore: polScore * legislationScore
                            }
                        });

                return {
                    idleScore,
                    legislationId: legislation.legislationId,
                    legislationScore: legislationScore,
                    politiciansWithScores: politiciansWithScores,
                    userScore:  calculateDecisionScore(
                        userVote2,
                        userVote
                    ) * legislationScore
                };
            })
        ).filter(P.isDefined);
    }

    export function calculateNormalizedPoliticianScore(
        iRawScores: ReadonlyArray<RankedLegislationsPolitciansIds>
    ): {
        p: Record<string, number>,
        userScore: number
    } {

        const userScore = iRawScores.reduce((acc, current) => acc + current.userScore, 0)
        console.log('USER_SCORE',{
            iRawScores
        })
        const scores = iRawScores
            .flatMap((q) => q.politiciansWithScores || [])
            .reduce((acc, current) => {
                if (acc[current.politicianId] == null) {
                    acc[current.politicianId] = current.politicianScore;
                    return acc;
                }
                acc[current.politicianId] += current.politicianScore
                return acc;
            }, {} as Record<string, number>);


            console.log('USER_SCORE', {
                scores
            })

        return {
            p: Object.entries(scores)
            .map(([k, v]) => {
                const score = v / userScore
                return {
                    [k]: score ,
                };
            })
            .reduce((acc, current) => {
                return {
                    ...acc,
                    ...current,
                };
            }, {} as Record<string, number>),
            userScore
        }
    }
}
