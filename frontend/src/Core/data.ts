import Axios from 'axios'
import { Legislation, Politician } from './models'
import * as P from 'ts-prime'
import * as z from 'zod'
import S from 'string'
import { toId } from '../Helpers'
export async function getLegislations(): Promise<ReadonlyArray<Legislation>> {
    const legislationUrl = new URL(new URL(window.location.href).origin)
    legislationUrl.pathname = "/data/legislation-data.json"
    const data = await Axios.get(legislationUrl.toString())
    return z.array(Legislation.schema.nonstrict()).parse(data.data)
}



const schema = z.object({
    rinkimai: z.string(),
    rinkimu_rusis: z.string(),
    rinkimu_data: z.string(),
    apygardos_nr: z.string(),
    apygardos_pavadinimas: z.string(),
    kadidatu_saraso_nr: z.string(),
    kadidatu_saraso_pavadinimas: z.string(),
    kandidato_nr: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    sex: z.string(),
    organization: z.string(),
    ar_isrinktas: z.string(),
    kiek_kartu_dalyvavo_daugiamandateje: z.string(),
    kiek_kartu_dalyvavo_viendmandateje: z.string(),
    kiek_kartu_isrinktas: z.string().optional(),
    ar_pirma_karta: z.string(),
    kada_isrinktas_paskutini_karta: z.string()
})
export type PartiesCsvMember = z.TypeOf<typeof schema>


export async function getPartiesCsvMember(): Promise<ReadonlyArray<PartiesCsvMember>> {
    const legislationUrl = new URL(new URL(window.location.href).origin)
    legislationUrl.pathname = "/data/parsedPartyCsv.json"
    const data = await Axios.get(legislationUrl.toString())
    return data.data
}


export function partyInfo(): Promise<Record<string, { color: string, logo: string }>> {
    return Axios.get("/data/color-data.json").then((q) => {
        return q.data
    })
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
        .filter((q) => q.kadidatu_saraso_pavadinimas !== '')
        .map((q): Politician => {
            const id = toId(`${q.firstName} ${q.lastName}`)
            const activity = x[id]
            return {
                id: id,
                politicalPartyName: q.kadidatu_saraso_pavadinimas,
                politicalPartyNumber: q.kadidatu_saraso_nr,
                politicianNumber: q.kandidato_nr,
                politicalPartyId: toId(q.kadidatu_saraso_pavadinimas),
                region: q.apygardos_pavadinimas === "" ? undefined : q.apygardos_pavadinimas,
                displayName: `${q.firstName} ${q.lastName}`.split(" ").map((part) => S(part).capitalize().toString()).join(" "),
                activityData: activity ? {
                    politicianId: activity.lef.politicianId,
                    fraction: activity.lef.fraction,
                    profileUrl: `https://www.lrs.lt/sip/portal.show?p_r=35299&p_k=1&p_a=498&p_asm_id=${activity.lef.politicianId}`
                } : undefined,
            }
        })
}


