import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library"

const prisma = new PrismaClient()

const deleteCareer = async (id: number) => {
    try {
        await prisma.career.update(
            {
                where: { id, deleted: false },
                data: {
                    deleted: true,
                    levels: {
                        updateMany: {
                            where: { deleted: false },
                            data: { deleted: true }
                        }
                    },
                    students: {
                        updateMany: {
                            where: { deleted: false },
                            data: { deleted: true }
                        }
                    }
                }
            }
        )

        return true
    }
    catch (e) {
        if (e instanceof PrismaClientKnownRequestError && e.message.includes("required but not found")) {
            return false
        }

        throw e
    }
}

export default deleteCareer