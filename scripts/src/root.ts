import {
    resolve
} from 'path'
const ROOT = __dirname
export function fromRoot(...paths: string[]) {
    return resolve(ROOT, ...paths)
}