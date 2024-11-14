import Deletable from "./Deletable"

export default class Career extends Deletable {
    id: number
    name: string
    accredited: boolean

    constructor(id: number, name: string, accredited: boolean) {
        super()
        this.id = id
        this.name = name,
        this.accredited = accredited
        this.deleted = false
    }

    toJson() {
        const {deleted, deteledAt, ...rest} = this
        return rest
    }
}