import { resolve } from 'path'

export function fromRoot(...paths: string[]): string {
    return resolve(__dirname, "../", ...paths)
}