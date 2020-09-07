import { google } from 'googleapis'
import { fromRoot } from './root'
import { Jet, P, Z, IX, IterParse, Fetch } from './deps'

export namespace VotesParsing {
    export interface RawVote extends IterParse.XMLObject {
        $name: string;
        asmens_id: string;
        vardas: string;
        pavardė: string;
        frakcija: string;
        kaip_balsavo: string;
    }
    export const rawVoteSchema = Z.object({
        asmens_id: Z.string(),
        vardas: Z.string(),
        pavardė: Z.string(),
        frakcija: Z.string(),
        kaip_balsavo: Z.string()
    }).nonstrict()
    function parseVote(vote: string | undefined) {
        if (vote === "Už") {
            return '+';
        }
        if (vote === "Susilaikė") {
            return '/';
        }
        if (vote === "Prieš") {
            return '-';
        }
        return '.';;
    }
    export const voteSchema = Z.object({
        legislationId: Z.string(),
        politicianId: Z.string(),
        vote: Z.enum(['+', "-", '/', '.']),
        fraction: Z.string(),
        displayName: Z.string()
    })

    export type Vote = Z.TypeOf<typeof voteSchema>

    export function getVoting(legislationId: string): Promise<ReadonlyArray<Vote>> {
        const url = `https://apps.lrs.lt/sip/p2b.ad_sp_balsavimo_rezultatai?balsavimo_id=${legislationId}`
        console.log("Executing", url)
        return IX
            .of(true)
            .map(() => Fetch(url))
            .map((c) => c.body)
            .flatMap((c) => IterParse.xmlRead<RawVote>(c, { pattern: 'IndividualusBalsavimoRezultatas' }))
            .map((vote) => {
                return rawVoteSchema.parse(vote)
            })
            .map((data) => {
                return {
                    legislationId: legislationId,
                    vote: parseVote(data.kaip_balsavo),
                    politicianId: data.asmens_id,
                    fraction: data.frakcija,
                    displayName: `${data.vardas} ${data.pavardė}`
                }
            })
            .map((item) => {
                const result = voteSchema.parse(item)
                return result
            })
            .toArray()
    }
}








// const client = google.sheets({ version: "v4", "auth": getAuth() });




export namespace LegislationSheeet {
    export type PartialLegislation = Z.TypeOf<typeof PartialLegislation.schema>
    export namespace PartialLegislation {
        export const schema = Z.object({
            order: Z.string(),
            fullOrder: Z.string(),
            linkToOrder: Z.string(),
            linkToVotes: Z.string(),
            youtubeUrl: Z.string()
        })
    }

    function getLegislationId(item: PartialLegislation) {
        return new URL(item.linkToVotes).searchParams.get('p_bals_id')
    }

    function getCredentials(): Promise<{ client_email: string, private_key: string }> {
        console.log(`Retrieving credentials from ${fromRoot("./credentials/credentials.json")}`)
        return Jet.readAsync(fromRoot("../credentials/credentials.json")).then((q) => {
            if (P.isDefined(q)) {
                return JSON.parse(q)
            }
            throw new Error("Failed to get credentials")
        })
    }

    const getAuth = async () => {
        const credentials = await getCredentials()
        console.log()
        return new google.auth.JWT(
            credentials.client_email,
            undefined,
            credentials.private_key,
            ["https://www.googleapis.com/auth/spreadsheets"]
        );
    }
    function toObject(headers: ReadonlyArray<string | null | undefined>, row: ReadonlyArray<string | null | undefined>): Record<string, string | null | undefined> {
        const data = {} as Record<string, string | null | undefined>
        for (const o in headers) {
            const h = headers[o]
            if (h == null) {
                data[o] = row[o]
                continue
            }
            data[h] = row[o]
        }
        return data
    }

    export async function getData() {
        const gClient = google.sheets({ version: 'v4', auth: await getAuth() })
        const data = await gClient.spreadsheets.get({ spreadsheetId: '1WJSVYUf-Ye1FnI4ivF3HYAKlb3U3P3BLz6zYunBGmUM', ranges: ['prog!A:E'], includeGridData: true });
        const sheet = data.data.sheets?.find((c) => c.properties?.sheetId === 876507446)
        const grid = sheet?.data?.[0]
        const rows = grid?.rowData?.map((i) => i.values?.map((j) => j.formattedValue)).filter(P.isDefined)
        if (rows == null) throw new Error("Failed to get data")
        const headers = rows[0]
        const rowsData = rows
            .slice(1)
            .map((r) => toObject(headers, r))
            .map((q) => {
                return P.canFail(() => PartialLegislation.schema.parse(q))
            })
            .filter(P.isNot(P.isError))
            .map((q) => {
                const legislationId = getLegislationId(q)
                if (legislationId == null) return
                return {
                    ...q,
                    legislationId: legislationId
                }
            })
            .filter(P.isDefined)


        return IX.from(rowsData).map(async (row) => {
            const votes = await VotesParsing.getVoting(row.legislationId)
            return {
                ...row,
                votes
            }
        }).toArray()
    }
}



LegislationSheeet.getData().then(
    (q) => {
        Jet.writeAsync(fromRoot("./raw.json"), q)
    }
)

