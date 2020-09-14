import { Jet, P } from "../../sheets/deps"
import { fromRoot } from "../../root"
// import { AsyncIterable } from "ix"
import { extname } from 'path'

const ColorThiev = require('colorthief')


async function getFiles() {
    const partiesFolder = "../../frontend/public/images/parties"
    const files = await Jet.listAsync(fromRoot(partiesFolder))
    console.log(files)
    const result = await Promise.all(
        files?.map(async (img) => {
            const color = await ColorThiev.getColor(fromRoot(partiesFolder, img))
            return {
                logo: img,
                color: `rgb(${(color as [number, number, number]).join(",")})`
            }
        }) || []
    )

    await Jet.writeAsync(fromRoot("../../frontend/public/data/color-data.json"), P.indexBy(result, (q) => q.logo.replace(extname(q.logo), '')))
    console.log(result)
    return

}


getFiles()