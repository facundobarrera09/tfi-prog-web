export default abstract class Deletable {
    deleted: boolean = false
    deteledAt?: Date

    delete() {
        this.deleted = true
    }
}