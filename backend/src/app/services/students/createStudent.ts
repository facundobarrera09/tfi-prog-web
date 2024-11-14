import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createStudent = async (firstname: string, lastname: string, dni: bigint, email: string) => {
    const student = {
        sid: ((await prisma.student.findFirst({ orderBy: { sid: 'desc' } }))?.sid || 990n) + 10n,
        firstname,
        lastname,
        dni,
        email
    }

    const studentWithSameEmail = await prisma.student.findFirst({ where: { email, deleted: false } })
    const studentWithSameDni = await prisma.student.findFirst({ where: { dni, deleted: false } })

    if (!(studentWithSameDni || studentWithSameEmail)) {
        return await prisma.student.create({ select: { sid: true, firstname: true, lastname: true, dni: true, email: true }, data: student })
    }
}

export default createStudent