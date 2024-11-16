import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const students = [
    {
        "sid": 1001,
        "firstname": "Sofía",
        "lastname": "García",
        "dni": 30567890,
        "email": "sofia.garcia@example.com"
    },
    {
        "sid": 1002,
        "firstname": "Mateo",
        "lastname": "Fernández",
        "dni": 31234567,
        "email": "mateo.fernandez@example.com"
    },
    {
        "sid": 1003,
        "firstname": "Valentina",
        "lastname": "Rodríguez",
        "dni": 32098765,
        "email": "valentina.rodriguez@example.com"
    },
    {
        "sid": 1004,
        "firstname": "Tomas",
        "lastname": "López",
        "dni": 33012345,
        "email": "tomas.lopez@example.com"
    },
    {
        "sid": 1005,
        "firstname": "Camila",
        "lastname": "González",
        "dni": 33567890,
        "email": "camila.gonzalez@example.com"
    },
    {
        "sid": 1006,
        "firstname": "Lucas",
        "lastname": "Martínez",
        "dni": 34012345,
        "email": "lucas.martinez@example.com"
    },
    {
        "sid": 1007,
        "firstname": "Florencia",
        "lastname": "Pérez",
        "dni": 34567891,
        "email": "florencia.perez@example.com"
    },
    {
        "sid": 1008,
        "firstname": "Juan",
        "lastname": "Díaz",
        "dni": 35012345,
        "email": "juan.diaz@example.com"
    },
    {
        "sid": 1009,
        "firstname": "Isabella",
        "lastname": "Müller",
        "dni": 35567892,
        "email": "isabella.muller@example.com"
    },
    {
        "sid": 1010,
        "firstname": "Diego",
        "lastname": "Cruz",
        "dni": 36012345,
        "email": "diego.cruz@example.com"
    },
    {
        "sid": 1011,
        "firstname": "Lara",
        "lastname": "Sánchez",
        "dni": 36567893,
        "email": "lara.sanchez@example.com"
    },
    {
        "sid": 1012,
        "firstname": "Nicolás",
        "lastname": "Ramírez",
        "dni": 37012345,
        "email": "nicolas.ramirez@example.com"
    },
    {
        "sid": 1013,
        "firstname": "Mía",
        "lastname": "Torres",
        "dni": 37567894,
        "email": "mia.torres@example.com"
    },
    {
        "sid": 1014,
        "firstname": "Samuel",
        "lastname": "Gutiérrez",
        "dni": 38012345,
        "email": "samuel.gutierrez@example.com"
    },
    {
        "sid": 1015,
        "firstname": "Emma",
        "lastname": "Bermúdez",
        "dni": 38567895,
        "email": "emma.bermudez@example.com"
    },
    {
        "sid": 1016,
        "firstname": "Joaquín",
        "lastname": "Salazar",
        "dni": 39012345,
        "email": "joaquin.salazar@example.com"
    },
    {
        "sid": 1017,
        "firstname": "Santiago",
        "lastname": "Núñez",
        "dni": 39567896,
        "email": "santiago.nunez@example.com"
    },
    {
        "sid": 1018,
        "firstname": "Valeria",
        "lastname": "Hernández",
        "dni": 40012345,
        "email": "valeria.hernandez@example.com"
    },
    {
        "sid": 1019,
        "firstname": "Gabriel",
        "lastname": "Mendoza",
        "dni": 40567897,
        "email": "gabriel.mendoza@example.com"
    },
    {
        "sid": 1020,
        "firstname": "Rocío",
        "lastname": "Vargas",
        "dni": 41012345,
        "email": "rocio.vargas@example.com"
    },
    {
        "sid": 1021,
        "firstname": "Luca",
        "lastname": "Ríos",
        "dni": 41567898,
        "email": "luca.rios@example.com"
    },
    {
        "sid": 1022,
        "firstname": "Zoe",
        "lastname": "Sosa",
        "dni": 42012345,
        "email": "zoe.sosa@example.com"
    },
    {
        "sid": 1023,
        "firstname": "Agustín",
        "lastname": "Gómez",
        "dni": 42567899,
        "email": "agustin.gomez@example.com"
    },
    {
        "sid": 1024,
        "firstname": "Ariana",
        "lastname": "Jímenez",
        "dni": 43012345,
        "email": "ariana.jimenez@example.com"
    },
    {
        "sid": 1025,
        "firstname": "Emilio",
        "lastname": "Cano",
        "dni": 43567800,
        "email": "emilio.cano@example.com"
    },
    {
        "sid": 1026,
        "firstname": "Victoria",
        "lastname": "Salas",
        "dni": 44012345,
        "email": "victoria.salas@example.com"
    },
    {
        "sid": 1027,
        "firstname": "Matías",
        "lastname": "Ponce",
        "dni": 44567801,
        "email": "matias.ponce@example.com"
    },
    {
        "sid": 1028,
        "firstname": "Valentín",
        "lastname": "Maldonado",
        "dni": 45012345,
        "email": "valentin.maldonado@example.com"
    },
    {
        "sid": 1029,
        "firstname": "Milagros",
        "lastname": "Aguirre",
        "dni": 45567802,
        "email": "milagros.aguirre@example.com"
    },
    {
        "sid": 1030,
        "firstname": "Jazmín",
        "lastname": "Cardozo",
        "dni": 46012345,
        "email": "jazmin.cardozo@example.com"
    },
    {
        "sid": 1031,
        "firstname": "Benjamín",
        "lastname": "Ortega",
        "dni": 46567803,
        "email": "benjamin.ortega@example.com"
    },
    {
        "sid": 1032,
        "firstname": "Luciana",
        "lastname": "Barrios",
        "dni": 47012345,
        "email": "luciana.barrios@example.com"
    },
    {
        "sid": 1033,
        "firstname": "Julián",
        "lastname": "Ramos",
        "dni": 47567804,
        "email": "julian.ramos@example.com"
    },
    {
        "sid": 1040,
        "firstname": "Cecilia",
        "lastname": "Vega",
        "dni": 48000000,
        "email": "cecilia.vega@example.com"
    }
]

const careers = [
    { name: "Ingeniería Informática", accredited: true },
    { name: "Medicina", accredited: true },
    { name: "Derecho", accredited: true },
    { name: "Arquitectura", accredited: false },
    { name: "Psicología", accredited: true },
    { name: "Biología", accredited: true },
    { name: "Ingeniería Civil", accredited: true },
    { name: "Química", accredited: false },
    { name: "Filosofía", accredited: false },
    { name: "Veterinaria", accredited: true },
    { name: "Marketing", accredited: true },
    { name: "Diseño Gráfico", accredited: false }
]

const levels: { name: string, careerId: number }[] = []

careers.forEach((c, index) => {
    const numNiveles = Math.floor(Math.random() * 2) + 4
  
    for (let i = 1; i <= numNiveles; i++) {
        levels.push({ name: `Nivel ${i}`, careerId: index + 1 })
    }
});

const studentHasCareer = [
    { "studentId": 1, "careerId": 8, "enrolmentDate": "2022-05-15T08:30:00Z" },
    { "studentId": 2, "careerId": 5, "enrolmentDate": "2023-03-10T09:45:00Z" },
    { "studentId": 3, "careerId": 6, "enrolmentDate": "2022-08-25T14:00:00Z" },
    { "studentId": 5, "careerId": 1, "enrolmentDate": "2023-07-01T10:20:00Z" },
    { "studentId": 7, "careerId": 4, "enrolmentDate": "2022-12-12T11:30:00Z" },
    { "studentId": 8, "careerId": 6, "enrolmentDate": "2023-01-17T13:00:00Z" },
    { "studentId": 10, "careerId": 3, "enrolmentDate": "2022-09-18T16:30:00Z" },
    { "studentId": 12, "careerId": 3, "enrolmentDate": "2023-05-22T08:00:00Z" },
    { "studentId": 13, "careerId": 5, "enrolmentDate": "2023-02-10T07:45:00Z" },
    { "studentId": 14, "careerId": 10, "enrolmentDate": "2022-11-03T12:15:00Z" },
    { "studentId": 15, "careerId": 9, "enrolmentDate": "2023-04-20T15:00:00Z" },
    { "studentId": 17, "careerId": 10, "enrolmentDate": "2022-10-11T10:00:00Z" },
    { "studentId": 18, "careerId": 8, "enrolmentDate": "2023-06-30T12:30:00Z" },
    { "studentId": 19, "careerId": 2, "enrolmentDate": "2023-09-07T09:15:00Z" },
    { "studentId": 21, "careerId": 9, "enrolmentDate": "2022-06-18T14:45:00Z" },
    { "studentId": 23, "careerId": 7, "enrolmentDate": "2023-01-25T11:00:00Z" },
    { "studentId": 26, "careerId": 7, "enrolmentDate": "2022-07-15T10:45:00Z" },
    { "studentId": 29, "careerId": 11, "enrolmentDate": "2022-12-20T08:10:00Z" },
    { "studentId": 30, "careerId": 4, "enrolmentDate": "2023-08-05T13:25:00Z" },
    { "studentId": 34, "careerId": 12, "enrolmentDate": "2022-04-08T17:30:00Z" }
] 

const main = async () => {
    console.log('Starting seeder')
    
    await prisma.student.createMany({
        skipDuplicates: true,
        data: students
    })

    await prisma.career.createMany({
        skipDuplicates: true,
        data: careers
    })

    await prisma.level.createMany({
        skipDuplicates: true,
        data: levels
    })

    await prisma.studentHasCareer.createMany({
        skipDuplicates: true,
        data: studentHasCareer
    })

    console.log('Database seeded')
}

main()