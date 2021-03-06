import { csvRead, jsonWrite } from "iterparse"
import { AsyncIterable } from "ix"
import { deepMergeRight } from "ts-prime"
import * as z from 'zod'


const mappings = {
    "Rinkimai": "rinkimai",
    "Rinkimų rūšis": "rinkimu_rusis",
    "Rinkimų data": "rinkimu_data",
    "Apygardos Nr.": "apygardos_nr",
    "Apygardos pavadinimas": "apygardos_pavadinimas",
    "Kandidatų sąrašo Nr.": "kadidatu_saraso_nr",
    "Kandidatų sąrašo pavadinimas": "kadidatu_saraso_pavadinimas",
    "Kandidato Nr. sąraše": "kandidato_nr",
    "Kandidato vardas": "firstName",
    "Kandidato pavardė": "lastName",
    "Kandidato lytis": "sex",
    "Kandidatą iškėlusi organizacija": "organization",
    "Ar išrinktas?": "ar_isrinktas",
    "Kiek kartų dalyvavo daugiamandatėje apygardoje": "kiek_kartu_dalyvavo_daugiamandateje",
    "Kiek kartų dalyvavo vienmandatėje apygardoje": "kiek_kartu_dalyvavo_viendmandateje",
    "Kiek kartų buvo išrinktas": "kiek_kartu_isrinktas",
    "Kada buvo išrinktas pirmą kartą": "ar_pirma_karta",
    "Kada buvo išrinktas paskutinį kartą": "kada_isrinktas_paskutini_karta",
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

export function toId(data: string) {
    return data.toLowerCase()
        .replace("–", '')
        .replace("-", '')
        .replace("„", '')
        .replace("„", '')
        .replace("“", '')
        .replace(/[^a-zA-Z0-9_-]/gm, "")
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("_")
}

AsyncIterable
    .from(csvRead<any>("./partyData.csv"))
    .map((q) => {
        let remap = {} as Record<string, string>
        for (const [original, newField] of Object.entries(mappings)) {
            remap[newField] = q[original]
        }
        return remap
    })
    .map((q) => {
        return schema.parse(q)
    })
    .groupBy((q)=>{
        return toId(`${q.firstName} ${q.lastName}`)
    })
    .map(async (q)=>{
        const items = await q.toArray()
        const dar = items.map((q)=>{
            let s = {} as typeof q
            for (const [key,val] of Object.entries(q)) {
                if (val) {
                    (s as any)[key] = val
                }
            }
            return  s
        })
        
        return deepMergeRight(dar[0], ...dar)
    })
    .map((w)=>{
        return w
    })
    .pipe(jsonWrite("./parsedPartyCsv.json"))
    .count()