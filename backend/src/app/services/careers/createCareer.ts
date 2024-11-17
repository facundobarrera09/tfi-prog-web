import { Prisma, PrismaClient } from "@prisma/client"
import { CreateLevel } from "../../models/level"

const prisma = new PrismaClient()

const createCareer = async (name: string, accredited: boolean, levels: CreateLevel[]) => {
    // console.log('creating career', {
    //     name,
    //     accredited,
    //     levels
    // })

    const sameNameCareer = await prisma.$queryRaw<{ id: number }[]>`
        SELECT c.id
        FROM "Career" c
        WHERE 
        (
            translate(lower(${name}), 'áéíóúü', 'aeiouu') = translate(lower(c.name), 'áéíóúü', 'aeiouu')
            AND 
            c.deleted = false
        )
    `

    if (sameNameCareer.length === 1) return null

    return await prisma.career.create({
        select: {
            name: true,
            accredited: true,
            levels: {
                select: {
                    name: true
                }
            }
        },
        data: {
            name,
            accredited,
            levels: {
                createMany: {
                    data: levels
                }
            }
        }
    })


}

export default createCareer