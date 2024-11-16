import { Career, PrismaClient } from "@prisma/client"
import { bigintToNumber } from "../../utils/bigintToNumber"

const prisma = new PrismaClient()

const getCareers = async (criteria: string = "", currentPage: number = 1, pageSize: number = 5) => {
    // console.log('criteria', criteria, 'currentPage', currentPage, 'pageSize', pageSize)

    const countResult = (await prisma.$queryRaw<{ count: bigint }[]>`
            SELECT COUNT(s.id)
            FROM "Career" AS s
            WHERE
                (
                    translate(lower(concat(s.id, ' ', s.name)), 'áéíóúü', 'aeiouu')
                    LIKE
                    translate(lower(${'%' + criteria + '%'}), 'áéíóúü', 'aeiouu')
                )
                AND s.deleted = false
        `)[0].count

    const count = bigintToNumber(countResult)

    const maxPage = Math.ceil(count / pageSize) === 0 ? 1 : Math.ceil(count / pageSize)

    const onlyCareers = await prisma.$queryRaw<Pick<Career, 'id' | 'name' | 'accredited'>[]>`
            SELECT s.id, s.name, s.accredited
            FROM "Career" AS s
            WHERE
                (
                    translate(lower(concat(s.id, ' ', s.name)), 'áéíóúü', 'aeiouu')
                    LIKE
                    translate(lower(${'%' + criteria + '%'}), 'áéíóúü', 'aeiouu')
                )
                AND s.deleted = false
            ORDER BY s.id ASC
            LIMIT ${pageSize}
            OFFSET ${((currentPage <= maxPage ? currentPage : maxPage) - 1) * pageSize}
        `

    const careers = await Promise.all(onlyCareers.map(async (career) => {
        return {
            ...career,
            levels: await prisma.level.findMany({ where: { careerId: career.id, deleted: false }, select: { name: true } })
        }
    }))

    return {
        careers: careers || [],
        count: count || 0
    }
}

export default getCareers