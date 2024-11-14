import Level from "../models/Level";

const levels: Level[] = [
    new Level(1, '1er Año', 1),
    new Level(2, '2do Año', 1),
    new Level(3, '3er Año', 1),

    new Level(4, '1er Año', 2),
    new Level(5, '2do Año', 2),
    new Level(6, '3er Año', 2),

    new Level(7, '1er Año', 4),
    new Level(8, '2do Año', 4),
    new Level(9, '3er Año', 4),

    new Level(10, '1er Año', 3),
    new Level(11, '2do Año', 3),

    new Level(10, '1er Año', 5),
    new Level(11, '2do Año', 5),

    new Level(10, '1er Año', 6),
    new Level(11, '2do Año', 6),
]

levels[8].delete()

function getNextId() {
    return levels.length === 0 ? 1 :
        Math.max(...levels.map(career => career.id)) + 1
}

function findAll() {
    return levels.filter(level => !level.deleted)
}

function findById(id: number) {
    return findAll().find(level => level.id === id)
}

function findByCareerId(careerId: number) {
    return findAll().filter(level => level.careerId === careerId)
}

function create(name: string, careerId: number) {
    const newLevel = new Level(getNextId(), name, careerId)

    if (!findAll().find(level => level.name === name && level.careerId == careerId)) {
        levels.push(newLevel)
        return newLevel
    }
}

const levelsService = { findAll, findByCareerId, findById, create }
export default levelsService