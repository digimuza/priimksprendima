import Axios from 'axios'
import { Legislation, Politician } from './models'
import * as P from 'ts-prime'
import * as z from 'zod'
import S from 'string'
export async function getLegislations(): Promise<ReadonlyArray<Legislation>> {
    const legislationUrl = new URL(new URL(window.location.href).origin)
    legislationUrl.pathname = "/data/legislation-data.json"
    const data = await Axios.get(legislationUrl.toString())
    return z.array(Legislation.schema.nonstrict()).parse(data.data)
}


export interface PartiesCsvMember {
    rowId: string;
    displayName: string;
    politicalPartyNumber: string;
    politicalPartyName: string;
    politicianNumber: string;
    va: string
}


export async function getPartiesCsvMember(): Promise<ReadonlyArray<PartiesCsvMember>> {
    const legislationUrl = new URL(new URL(window.location.href).origin)
    legislationUrl.pathname = "/data/party-data.json"
    const data = await Axios.get(legislationUrl.toString())
    return data.data
}


export function partyInfo(): Record<string, { color: string, logo: string }> {
    return {
        "1": {
            color: "#E60817",
            logo: "/images/parties/1.jpg",
        },
        "2": {
            color: "#01619E",
            logo: "/images/parties/2.png",
        },
        "3": {
            color: "#FBB903",
            logo: "/images/parties/3.png",
        },
        "4": {
            color: "#F8EC12",
            logo: "/images/parties/4.jpg",
        },
        "5": {
            color: "#F5FA20",
            logo: "/images/parties/5.jpg"
        },
        "6": {
            color: "#02A650",
            logo: "/images/parties/6.png",
        },
        "7": {
            color: "#FBFBFB",
            logo: "/images/parties/7.png",
        },
        "8": {
            color: "#031B7C",
            logo: "/images/parties/8.png",
        },
        "9": {
            color: "#4D266B",
            logo: "/images/parties/9.jpg",
        },
        "10": {
            color: "#F8AC39",
            logo: "/images/parties/10.jpg",
        },
        "11": {
            color: "#335BB0",
            logo: "/images/parties/11.jpg",
        },
        "12": {
            color: "#7CBE40",
            logo: "/images/parties/12.jpg",
        },
        "13": {
            color: "#A82322",
            logo: "/images/parties/13.png"
        },
        "14": {
            color: "#43694C",
            logo: "/images/parties/14.jpg"
        }
    }
}


export async function getPoliticians(legislations: ReadonlyArray<Legislation>): Promise<ReadonlyArray<Politician>> {
    const partyData = await getPartiesCsvMember()
    const x = P.pipe(
        legislations.flatMap((q) => q.votes),
        P.uniqBy((q) => q.politicianId),
        P.map((q) => {
            return {
                id: `${q.displayName}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("_"),
                lef: q,
            };
        }),
        P.uniqBy((q) => q.id),
        // (q) => {
        //     return q;
        // },
        P.indexBy((q) => q.id)
    )

    return partyData
        .filter((q) => q.politicalPartyNumber !== '')
        .map((q): Politician => {
            const id = q.displayName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("_")
            const activity = x[id]
            return {
                id: id,
                politicalPartyName: q.politicalPartyName,
                politicalPartyNumber: q.politicalPartyNumber,
                politicianNumber: q.politicianNumber,
                region: q.va === "" ? undefined : q.va,
                displayName: q.displayName.split(" ").map((part) => S(part).capitalize().toString()).join(" "),
                activityData: activity ? {
                    politicianId: activity.lef.politicianId,
                    fraction: activity.lef.fraction,
                    profileUrl: `https://www.lrs.lt/sip/portal.show?p_r=35299&p_k=1&p_a=498&p_asm_id=${activity.lef.politicianId}`
                } : undefined,
            }
        })
}