import * as z from 'zod'

export interface Legislation {
    legislationId: string;
    order: string;
    youtubeUrl: string;
    fullOrder: string;
    linkToOrder: string;
    votes: ReadonlyArray<{
        legislationId: string;
        politicianId: string;
        vote: Legislation.Vote;
        fraction: string;
        displayName: string;
    }>;
}
export namespace Legislation {
    export interface WithScore extends Legislation {
        legislationScore: number
    }
    export const voteSchema = z.object({
        legislationId: z.string(),
        politicianId: z.string(),
        vote: z.union([z.literal("+"), z.literal("-"), z.literal("/"), z.literal(".")]),
        fraction: z.string(),
        displayName: z.string()
    })
    export const schema = z.object({
        legislationId: z.string(),
        order: z.string(),
        youtubeUrl: z.string(),
        fullOrder: z.string(),
        linkToOrder: z.string(),
        votes: z.array(voteSchema)
    })
    export type Vote = ['+', '-', '/', '.'][number];
  

    export namespace Vote {
        export const FOR = '+';
        export const AGAINST = '-';
        export const IDLE = '/';
        export const MISSING = '.';

        export function getVoteConfig(vote: Vote) {
            switch (vote) {
                case Vote.AGAINST:
                    return {
                        background: '#e53935',
                        color: 'white',
                        translation: 'Prieš',
                    };
                case Vote.FOR:
                    return {
                        background: '#00c853',
                        color: 'white',
                        translation: 'Už',
                    };
                case Vote.IDLE:
                    return {
                        background: '#eeeeee',
                        color: 'black',
                        translation: 'Susilaikė',
                    };
                case Vote.MISSING:
                    return {
                        background: 'black',
                        color: 'white',
                        translation: 'Nedalyvavo',
                    };
                default:
                    return {
                        background: 'black',
                        color: 'white',
                        translation: 'Praleidote',
                    };
            }
        }
    }
}

export namespace User {
    export type Vote = ['+', '-', '@'][number];
    export namespace Vote {
        export const FOR = '+';
        export const AGAINST = '-';
        export const SKIP = '@';
        export function getVoteConfig(vote: Vote) {
            switch (vote) {
                case User.Vote.AGAINST:
                    return {
                        background: '#e53935',
                        color: 'white',
                        class: "btn-danger",
                        translation: 'Prieš',
                    };
                case User.Vote.FOR:
                    return {
                        background: '#00c853',
                        class: "btn-success",
                        color: 'white',
                        translation: 'Už',
                    };
                case User.Vote.SKIP:
                    return {
                        background: '#eeeeee',
                        color: 'black',
                        class: "",
                        translation: 'Praleisti',
                    };
                default:
                    throw new Error(`Unknown user vote ${vote}`);
            }
        }
    }
}

export interface Politician {
    id: string;
    politicalPartyName: string;
    politicalPartyNumber: string;
    politicianNumber: string;
    displayName: string;
    region?: string
    activityData?: {
        profileUrl: string;
        politicianId: string;
        fraction: string;
    };
}
export namespace Politician {
    export interface WithInfo extends Politician {
        score: number;
    }
}


export interface PoliticalParty {
    partyId: string;
    politicalPartyName: string;
    politicalPartyNumber: string;
    size: number;
    politicians: Politician.WithInfo[];
}
export namespace PoliticalParty {
    export interface WithInfo extends PoliticalParty {
        score: number;
    }
}