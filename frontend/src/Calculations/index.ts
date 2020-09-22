
import { Legislation, User, Politician } from '../Core';
import * as P from 'ts-prime';
import * as z from 'zod'

export namespace Score {
    ////////////////////////////////////////////////////////////////////
    function calculateLegislationScore(
        { _iMaxMembers, iDecisionTreshold, iFor, iAgainst, iAbstained }: { _iMaxMembers: number; iDecisionTreshold: number; iFor: number; iAgainst: number; iAbstained: number; }): number {
        const participated = iFor + iAgainst + iAbstained;
        const votingMultiplier = 1 - Math.abs(iFor / participated - 0.5) / 0.5;
        const participationMultiplier =
            participated < iDecisionTreshold
                ? 2 * (participated / iDecisionTreshold)
                : 2 - (participated - 71) / 71;
        return votingMultiplier * participationMultiplier;
    }
    ////////////////////////////////////////////////////////////////////
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
    ////////////////////////////////////////////////////////////////////
    function calculateDecisionScore(iPoliticianVote: Legislation.Vote, iUserVote: User.Vote): number {
        const weightsFor = [10, -10, -4, -5];
        const weightsAgainst = [-10, 10, -4, -3];
        return z.number().parse(iUserVote === User.Vote.FOR
            ? weightsFor[voteToInt(iPoliticianVote)]
            : weightsAgainst[voteToInt(iPoliticianVote)])
    }
    ////////////////////////////////////////////////////////////////////
    interface PoliticianTmpData {
        politicianScore: number;
        politicianId: string;
        politicianVote?: Legislation.Vote
    }
    ////////////////////////////////////////////////////////////////////
    export interface RankedLegislationsPolitciansIds {
        legislationId: string;
        legislationScore: number;
        userScore: number
        userVote: User.Vote
        politiciansWithScores: PoliticianTmpData[] | null;
    }
    ////////////////////////////////////////////////////////////////////
    export function toPoliticianVote(q: User.Vote): Legislation.Vote {
        if (q === '@') return Legislation.Vote.IDLE
        return q
    }
    ////////////////////////////////////////////////////////////////////
    function calculateLegislationParticipationData(legislation: Legislation) {
        return legislation.votes
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
    }
    ////////////////////////////////////////////////////////////////////
    export function calculateRawScores(
        politicians: readonly Politician[],
        data: readonly Legislation[],
        userVotes: Record<string, User.Vote>
    ): ReadonlyArray<RankedLegislationsPolitciansIds> {
        return P.pipe(
            data,
            P.map((legislation) => {
                const userVote = userVotes[legislation.legislationId]
                const userVote2 = toPoliticianVote(userVotes[legislation.legislationId])
                const votingInfo = calculateLegislationParticipationData(legislation)
                const legislationScore = calculateLegislationScore(
                    { _iMaxMembers: 141, iDecisionTreshold: 71, iFor: votingInfo[Legislation.Vote.FOR], iAgainst: votingInfo[Legislation.Vote.AGAINST], iAbstained: votingInfo[Legislation.Vote.IDLE] });

                const idleScore = calculateDecisionScore(
                    Legislation.Vote.IDLE,
                    userVotes[legislation.legislationId] || User.Vote.SKIP
                ) * legislationScore
                const indexedVotes = P.indexBy(legislation.votes, (vote) => vote.politicianId)

                const politiciansWithScores =
                    userVotes[legislation.legislationId] == null
                        ? null
                        : politicians.map((q) => {

                            // Politikas nebuvo kadnecijoje duok jam idleScore
                            const politicianVote = indexedVotes[q.activityData?.politicianId || '']
                            if (politicianVote == null) {
                                return {
                                    politicianId: q.id,
                                    politicianScore: 0
                                }
                            }
                            const polScore = calculateDecisionScore(
                                politicianVote.vote,
                                userVotes[legislation.legislationId]
                            )
                            return {
                                politicianId: q.id,
                                politicianScore: polScore * legislationScore,
                                politicianVote: politicianVote.vote as Legislation.Vote
                            }
                        });

                return {
                    idleScore,
                    legislationId: legislation.legislationId,
                    legislationScore: legislationScore,
                    politiciansWithScores: politiciansWithScores,
                    userVote,
                    userScore: calculateDecisionScore(
                        userVote2,
                        userVote
                    ) * legislationScore
                };
            })
        ).filter(P.isDefined);
    }
    ////////////////////////////////////////////////////////////////////
    export function calculateNormalizedPoliticianScore(
        iRawScores: ReadonlyArray<RankedLegislationsPolitciansIds>
    ): {
        p: Record<string, number>,
        userScore: number
    } {
        const withoutSkipScores = iRawScores.filter((q) => q.userVote !== User.Vote.SKIP)
        const userAverage = withoutSkipScores.reduce((acc, current) => acc + current.userScore, 0) / withoutSkipScores.length
        const userScore = userAverage * Math.pow(withoutSkipScores.length, 0.5)
        const scores = P.pipe(
            withoutSkipScores,
            P.flatMap((q) => q.politiciansWithScores),
            P.filter(P.isDefined),
            P.groupBy((q) => q.politicianId),
            (q) => Object.values(q),
            P.map((politicians) => {
                const avarage = politicians.reduce((acc, current) => acc + current.politicianScore, 0) / politicians.length
                return {
                    politcianScore: avarage * Math.pow(politicians.length, 0.5),
                    politicianId: politicians[0].politicianId
                }
            })
        )
        const max = Math.max(...scores.map((q) => Math.abs(q.politcianScore)))
        const finalNormalizedScores = scores
            .map(({ politcianScore, politicianId }) => {
                return {
                    [politicianId]: politcianScore / max,
                };
            })
            .reduce((acc, current) => {
                return {
                    ...acc,
                    ...current,
                };
            }, {} as Record<string, number>)
        return {
            p: finalNormalizedScores,
            userScore
        }
    }
    ////////////////////////////////////////////////////////////////////
}