import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getStudent = (id: number) => {
    return prisma.student.findUnique({
        where: {
            id,
            deleted: false
        },
        select: {
            id: true,
            sid: true,
            firstname: true,
            lastname: true,
            dni: true,
            email: true,
            careers: {
                select: {
                    enrolmentDate: true,
                    career: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })
}

export default getStudent