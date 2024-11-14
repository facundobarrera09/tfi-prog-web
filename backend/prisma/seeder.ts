import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const students = [
    {
        "id": 1,
        "sid": 1001,
        "firstname": "Sofía",
        "lastname": "García",
        "dni": 30567890,
        "email": "sofia.garcia@example.com"
    },
    {
        "id": 2,
        "sid": 1002,
        "firstname": "Mateo",
        "lastname": "Fernández",
        "dni": 31234567,
        "email": "mateo.fernandez@example.com"
    },
    {
        "id": 3,
        "sid": 1003,
        "firstname": "Valentina",
        "lastname": "Rodríguez",
        "dni": 32098765,
        "email": "valentina.rodriguez@example.com"
    },
    {
        "id": 4,
        "sid": 1004,
        "firstname": "Tomas",
        "lastname": "López",
        "dni": 33012345,
        "email": "tomas.lopez@example.com"
    },
    {
        "id": 5,
        "sid": 1005,
        "firstname": "Camila",
        "lastname": "González",
        "dni": 33567890,
        "email": "camila.gonzalez@example.com"
    },
    {
        "id": 6,
        "sid": 1006,
        "firstname": "Lucas",
        "lastname": "Martínez",
        "dni": 34012345,
        "email": "lucas.martinez@example.com"
    },
    {
        "id": 7,
        "sid": 1007,
        "firstname": "Florencia",
        "lastname": "Pérez",
        "dni": 34567891,
        "email": "florencia.perez@example.com"
    },
    {
        "id": 8,
        "sid": 1008,
        "firstname": "Juan",
        "lastname": "Díaz",
        "dni": 35012345,
        "email": "juan.diaz@example.com"
    },
    {
        "id": 9,
        "sid": 1009,
        "firstname": "Isabella",
        "lastname": "Müller",
        "dni": 35567892,
        "email": "isabella.muller@example.com"
    },
    {
        "id": 10,
        "sid": 1010,
        "firstname": "Diego",
        "lastname": "Cruz",
        "dni": 36012345,
        "email": "diego.cruz@example.com"
    },
    {
        "id": 11,
        "sid": 1011,
        "firstname": "Lara",
        "lastname": "Sánchez",
        "dni": 36567893,
        "email": "lara.sanchez@example.com"
    },
    {
        "id": 12,
        "sid": 1012,
        "firstname": "Nicolás",
        "lastname": "Ramírez",
        "dni": 37012345,
        "email": "nicolas.ramirez@example.com"
    },
    {
        "id": 13,
        "sid": 1013,
        "firstname": "Mía",
        "lastname": "Torres",
        "dni": 37567894,
        "email": "mia.torres@example.com"
    },
    {
        "id": 14,
        "sid": 1014,
        "firstname": "Samuel",
        "lastname": "Gutiérrez",
        "dni": 38012345,
        "email": "samuel.gutierrez@example.com"
    },
    {
        "id": 15,
        "sid": 1015,
        "firstname": "Emma",
        "lastname": "Bermúdez",
        "dni": 38567895,
        "email": "emma.bermudez@example.com"
    },
    {
        "id": 16,
        "sid": 1016,
        "firstname": "Joaquín",
        "lastname": "Salazar",
        "dni": 39012345,
        "email": "joaquin.salazar@example.com"
    },
    {
        "id": 17,
        "sid": 1017,
        "firstname": "Santiago",
        "lastname": "Núñez",
        "dni": 39567896,
        "email": "santiago.nunez@example.com"
    },
    {
        "id": 18,
        "sid": 1018,
        "firstname": "Valeria",
        "lastname": "Hernández",
        "dni": 40012345,
        "email": "valeria.hernandez@example.com"
    },
    {
        "id": 19,
        "sid": 1019,
        "firstname": "Gabriel",
        "lastname": "Mendoza",
        "dni": 40567897,
        "email": "gabriel.mendoza@example.com"
    },
    {
        "id": 20,
        "sid": 1020,
        "firstname": "Rocío",
        "lastname": "Vargas",
        "dni": 41012345,
        "email": "rocio.vargas@example.com"
    },
    {
        "id": 21,
        "sid": 1021,
        "firstname": "Luca",
        "lastname": "Ríos",
        "dni": 41567898,
        "email": "luca.rios@example.com"
    },
    {
        "id": 22,
        "sid": 1022,
        "firstname": "Zoe",
        "lastname": "Sosa",
        "dni": 42012345,
        "email": "zoe.sosa@example.com"
    },
    {
        "id": 23,
        "sid": 1023,
        "firstname": "Agustín",
        "lastname": "Gómez",
        "dni": 42567899,
        "email": "agustin.gomez@example.com"
    },
    {
        "id": 24,
        "sid": 1024,
        "firstname": "Ariana",
        "lastname": "Jímenez",
        "dni": 43012345,
        "email": "ariana.jimenez@example.com"
    },
    {
        "id": 25,
        "sid": 1025,
        "firstname": "Emilio",
        "lastname": "Cano",
        "dni": 43567800,
        "email": "emilio.cano@example.com"
    },
    {
        "id": 26,
        "sid": 1026,
        "firstname": "Victoria",
        "lastname": "Salas",
        "dni": 44012345,
        "email": "victoria.salas@example.com"
    },
    {
        "id": 27,
        "sid": 1027,
        "firstname": "Matías",
        "lastname": "Ponce",
        "dni": 44567801,
        "email": "matias.ponce@example.com"
    },
    {
        "id": 28,
        "sid": 1028,
        "firstname": "Valentín",
        "lastname": "Maldonado",
        "dni": 45012345,
        "email": "valentin.maldonado@example.com"
    },
    {
        "id": 29,
        "sid": 1029,
        "firstname": "Milagros",
        "lastname": "Aguirre",
        "dni": 45567802,
        "email": "milagros.aguirre@example.com"
    },
    {
        "id": 30,
        "sid": 1030,
        "firstname": "Jazmín",
        "lastname": "Cardozo",
        "dni": 46012345,
        "email": "jazmin.cardozo@example.com"
    },
    {
        "id": 31,
        "sid": 1031,
        "firstname": "Benjamín",
        "lastname": "Ortega",
        "dni": 46567803,
        "email": "benjamin.ortega@example.com"
    },
    {
        "id": 32,
        "sid": 1032,
        "firstname": "Luciana",
        "lastname": "Barrios",
        "dni": 47012345,
        "email": "luciana.barrios@example.com"
    },
    {
        "id": 33,
        "sid": 1033,
        "firstname": "Julián",
        "lastname": "Ramos",
        "dni": 47567804,
        "email": "julian.ramos@example.com"
    },
    {
        "id": 34,
        "sid": 1040,
        "firstname": "Cecilia",
        "lastname": "Vega",
        "dni": 48000000,
        "email": "cecilia.vega@example.com"
    }
]



const main = async () => {
    console.log('Starting seeder')
    
    const result = await prisma.student.createMany({
        skipDuplicates: true,
        data: students
    })

    console.log('Database seeded')
}

main()