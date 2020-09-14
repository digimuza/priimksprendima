export { Watch } from './rxjs';


export function toId(data: string) {
    return data.toLowerCase()
        .replace("–", '')
        .replace("-", '')
        .replace("„", '')
        .replace("„", '')
        .replace("“", '')
        .replaceAll("[^a-zA-Z0-9_-]", "")
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("_")
}

export function imageFolder(...p: string[]) {
    return `/images/${p.join("/")}`;
}