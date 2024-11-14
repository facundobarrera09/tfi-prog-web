import Career from "../models/Career";

const careers: Career[] = [
    new Career(1, 'Ingeniería en sistemas de información', true),
    new Career(2, 'Ingeniería mecánica', true),
    new Career(3, 'Ingeniería electrónica', true),
    new Career(4, 'Adimistración de empresas', false),
    new Career(5, 'Lavaautos profesional', false),
    new Career(6, 'Licenciado en economía', true),
]

careers[2].delete()
careers[4].delete()

function getNextId() {
    return careers.length === 0 ? 1 :
        Math.max(...careers.map(career => career.id)) + 1
}

function findAll() {
    return careers
        .filter(career => !career.deleted)
}

function findById(id: number) {
    return findAll()
        .find(career => career.id === id)
}

function create(name: string, accredited: boolean) {
    const newCareer = new Career(getNextId(), name, accredited)

    if (!findAll().find(career => career.name === name)) {
        careers.push(newCareer)
        return newCareer
    }
}

const careersService = { findAll, findById, create }
export default careersService