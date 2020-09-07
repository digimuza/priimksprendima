import * as P from 'ts-prime'

export class LocalStorage<T> {
    constructor(public readonly key: string) { }
    set(data: T) {
        P.canFail(() => {
            const result = localStorage.setItem(this.key, JSON.stringify(data))
            if (result == null) return
        })
     }
    clear() { 
        P.canFail(() => {
            const result = localStorage.removeItem(this.key)
            if (result == null) return
        })
    }
    get(): T | undefined {
        const er = P.canFail(() => {
            const result = localStorage.getItem(this.key)
            if (result == null) return
            return JSON.parse(result)
        })
        if (P.isError(er)) {
            return 
        }
        return er as T
    }
}