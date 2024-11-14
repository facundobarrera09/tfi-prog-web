import Deletable from "./Deletable"

export default class Level extends Deletable {
    id: number
    name: string
    careerId: number

    constructor(id: number, name: string, careerId: number) {
        super()
        this.id = id
        this.name = name
        this.careerId = careerId
        this.deleted = false
    }

    toJson() {
        const {deleted, deteledAt, ...rest} = this
        return rest
    }
}