import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getCareer = async (id: number) => {
    return await prisma.career.findUnique({
        where: {
            id,
            deleted: false
        },
        select: {
            id: true,
            name: true,
            accredited: true,
            levels: {
                select: { name: true }
            },
            students: {
                where: {
                    deleted: false
                },
                select: {
                    enrolmentDate: true,
                    student: {
                        select: {
                            id: true,
                            sid: true,
                            firstname: true,
                            lastname: true
                        }
                    },
                }
            }
        }
    })
}

export default getCareer