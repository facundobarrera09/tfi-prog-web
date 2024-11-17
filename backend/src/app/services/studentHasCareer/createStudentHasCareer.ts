import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

const prisma = new PrismaClient()

const createStudentHasCareer = async (studentId: number, careerId: number, enrolmentDate: Date) => {
    const studentHasCareer = await prisma.studentHasCareer.findFirst({
        where: {
            studentId,
            careerId,
            deleted: false
        }
    })

    if (studentHasCareer) {
        return true
    }
    
    try {
        const result = await prisma.studentHasCareer.create({
            select: {
                studentId: true,
                careerId: true,
                enrolmentDate: true
            },
            data: {
                studentId,
                careerId,
                enrolmentDate
            }
        })

        if (result) {
            return result
        }
    }
    catch(e) {
        if (e instanceof PrismaClientKnownRequestError) {
            return false
        }
        else {
            throw e
        }
    }
}

export default createStudentHasCareer