import Deletable from "./Deletable"

export default class Student extends Deletable {
    id: number
    sid: number
    firstname: string
    lastname: string
    dni: number
    email: string

    constructor(id: number, sid: number, firstname: string, lastname: string, dni: number, email: string) {
        super()
        this.id = id
        this.sid = sid
        this.firstname = firstname
        this.lastname = lastname
        this.dni = dni
        this.email = email
        this.deleted = false
    }

    toJson() {
        const {deleted, deteledAt, ...rest} = this
        return rest
    }
}