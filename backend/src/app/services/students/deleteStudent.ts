import { PrismaClient } from "@prisma/client"
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library"

const prisma = new PrismaClient()

const deleteStudent = async (id: number) => {
    try {
        await prisma.student.update(
            {
                where: { id, deleted: false },
                data: {
                    deleted: true,
                    careers: {
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
        if (e instanceof PrismaClientUnknownRequestError && e.message.includes("required but not found")) {
            return false
        }

        throw e
    }
}

export default deleteStudent