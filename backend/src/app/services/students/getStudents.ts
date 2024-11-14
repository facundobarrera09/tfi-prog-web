import { PrismaClient, Student } from "@prisma/client"
import { bigintToNumber } from "../../utils/bigintToNumber"

const prisma = new PrismaClient()

const getStudents = async (criteria: string = "", currentPage: number = 1, pageSize: number = 5) => {
    const countResult = (await prisma.$queryRaw<{ count: bigint }[]>`
            SELECT COUNT(s.id)
            FROM "Student" AS s
            WHERE
                (
                    translate(lower(concat(s.sid, ' ', s.firstname, ' ', s.lastname)), 'áéíóúü', 'aeiouu')
                    LIKE
                    translate(lower(${'%' + criteria + '%'}), 'áéíóúü', 'aeiouu')
                )
                AND s.deleted = false
        `)[0].count

    const count = bigintToNumber(countResult)

    const maxPage = Math.ceil(count / pageSize) === 0 ? 1 : Math.ceil(count / pageSize)

    const students = await prisma.$queryRaw<Pick<Student, 'id' | 'sid' | 'firstname' | 'lastname' | 'dni' | 'email'>[]>`
            SELECT s.id, s.sid, s.firstname, s.lastname, s.dni, s.email
            FROM "Student" AS s
            WHERE
                (
                    translate(lower(concat(s.sid, ' ', s.firstname, ' ', s.lastname)), 'áéíóúü', 'aeiouu')
                    LIKE
                    translate(lower(${'%' + criteria + '%'}), 'áéíóúü', 'aeiouu')
                )
                AND s.deleted = false
            ORDER BY s.sid ASC
            LIMIT ${pageSize}
            OFFSET ${((currentPage <= maxPage ? currentPage : maxPage) - 1) * pageSize}
        `
    return {
        students: students || [],
        count: count || 0
    }
}

export default getStudents