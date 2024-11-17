import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const deleteStudentHasCareer = async (studentId: number, careerId: number) => {
    const studentHasCareer = await prisma.studentHasCareer.findFirst({ where: { studentId, careerId, deleted: false } })

    if (!studentHasCareer || studentHasCareer?.deleted === true) {
        return false
    }

    const result = await prisma.studentHasCareer.update({
        where: {
            id: studentHasCareer.id
        },
        data: {
            deleted: true
        }
    })

    if (result.deleted === true) {
        return true
    }
    else {
        return false
    }
}

export default deleteStudentHasCareer