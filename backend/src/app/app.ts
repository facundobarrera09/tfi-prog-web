import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import apiDocs from './controllers/apiDocs.ts'
import studentsRouter from './controllers/students/index.ts'
import careersRouter from './controllers/careers/index.ts'

// @ts-ignore
// Allow for BigInt JSON serialization
BigInt.prototype["toJSON"] = function () { 
    return this.toString() + "n"
}

const app = express()

app.use(express.json({
    reviver: (key: string, value: any) => {
        if (String(value).match(/^\d+n$/)) {
            return BigInt(value.replace(/n/, ''))
        }

        return value
    }
}))

app.use(cors({
    origin: function (origin: any, callback: any) {
        callback(null, [
            'http://localhost:3000',
            'http://172.22.0.52:3000'
        ])
    },
    credentials: true
}))

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(apiDocs))

app.use('/api/students', studentsRouter)
app.use('/api/careers', careersRouter)

export default app