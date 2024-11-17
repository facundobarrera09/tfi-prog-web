"use client"

import { FormEventHandler, use, useEffect, useState } from "react"
import Header from "../../../../components/Header"
import Button from "../../../../components/shared/button/button"
import { Cell, HeadCell, Row, Table } from "../../../../components/shared/table/Table"
import studentsService from "../../../../services/students"
import Overlay from "../../../../components/shared/Overlay"
import FilterSelect from "../../../../components/shared/forms/FilterSelect"
import careersService from "../../../../services/careers"
import moment from "moment"
import { studentAddCareerSchema } from "../../../../models/schemas/studentAddCareer"
import Joi from "joi"

interface HomeProps {
    params: Promise<{
        id: number
    }>
}

const emptyErrorMessage = "Este campo no puede estar vacio"
const dateExceedsTodayErrorMessage = "La fecha no puede exceder la actual"

const Home: React.FC<HomeProps> = ({ params }) => {
    const [student, setStudent] = useState<Required<Student> | null>(null)
    const [careersTableComponents, setCareersTableComponents] = useState<React.ReactNode[]>([])
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)

    const [showStudentNotFoundPopup, setShowStudentNotFoundPopup] = useState(false)
    const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] = useState(false)

    const [showAddStudentHasCareer, setShowAddStudentHasCareer] = useState(false)
    const [newCareer, setNewCareer] = useState<Career | null>(null)
    const [enrolmentDate, setEnrolmentDate] = useState<Date>(new Date())

    const [newCareerError, setNewCareerError] = useState<string | null>(null)
    const [enrolmentDateError, setEnrolmentDateError] = useState<string | null>(null)
    const [generalError, setGeneralError] = useState<string | null>(null)

    const fetchData = async () => {
        const result = await studentsService.getStudent((await params).id)

        if (result.success) {
            setStudent(result.data.student)
        }
        else {
            setShowStudentNotFoundPopup(true)
        }
    }

    const handleInscriptionSubmition: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const setErrors = (errors: Joi.ValidationError) => {
            errors.details.forEach(error => {
                // console.log(error)
                switch(error.path[0]) {
                    case 'career': 
                        switch(error.type) {
                            case 'any.required':
                                setNewCareerError(emptyErrorMessage)
                                break
                        }
                        break
                    case 'enrolmentDate':
                        switch(error.type) {
                            case 'date.max':
                                setEnrolmentDateError(dateExceedsTodayErrorMessage)
                                break
                        }
                        break
                }
            })
        }

        const validationResult = studentAddCareerSchema.validate({ enrolmentDate, career: { id: newCareer?.id } }, { stripUnknown: true, abortEarly: false })

        if (validationResult.error) {
            setErrors(validationResult.error)
            return
        }

        if (!student || !newCareer)
            return
        
        const response = await studentsService.careers.addCareer(student.id, newCareer.id, enrolmentDate)

        if (response.success) {
            setShowConfirmationPopup(true)
        }
        else {
            setGeneralError(response.data?.error ? (response.data.error.includes('already enroled') ? 'El estudiante ya esta inscripto en esta carrera' : 'No se encontró la carrera') : null)
            setTimeout(() => { setGeneralError(null) }, 5000)
            console.log(response.data)
        }
    }

    const handleRemoveCareer = async (careerId: number) => {
        if (!student || !careerId) {
            return
        }

        const response = await studentsService.careers.deleteCareer(student.id, careerId)

        if (response.success) {
            setShowDeleteConfirmationPopup(true)
        }

        fetchData()
    }
    
    const updateCareerTableComponents = (careers: StudentHasCareer[]) => {
        const newTableComponents = [
            <Row key={-1}>
                <HeadCell>Código</HeadCell>
                <HeadCell>Nombre</HeadCell>
                <HeadCell>Fecha de inscripción</HeadCell>
                <HeadCell>Acciones</HeadCell>
            </Row>
        ]
        
        newTableComponents.push(...careers.map((studentHasCareer, key) => {
            // console.log(studentHasCareer)
            return (
                <Row key={key}>
                    <Cell>{studentHasCareer.career.id}</Cell>
                    <Cell>{studentHasCareer.career.name}</Cell>
                    <Cell>{studentHasCareer.enrolmentDate.toLocaleDateString()}</Cell>
                    <Cell>
                        <div className="flex gap-2">
                            <Button name="Eliminar inscripción" 
                                onClick={() => {
                                    handleRemoveCareer(studentHasCareer.career.id)
                                }}
                            />
                        </div>
                    </Cell>
                </Row>
            )
        }))

        if (newTableComponents.length === 1) {
            newTableComponents.push(
                <Row key={1}>
                    <Cell span={4}>{'No se encontraron carreras'}</Cell>
                </Row>
            )
        }

        setCareersTableComponents(newTableComponents)
    }

    useEffect(() => {
        if (student) {
            updateCareerTableComponents(student.careers)
        }
    }, [student])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="relative flex-1 min-w-fit">
            <Header title={student ? `Vista de estudiante: ${student.firstname} ${student.lastname}` : `Vista de estudiante`} button={<Button name="Atras" href="/students" />}/>

            <Overlay active={showStudentNotFoundPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">No se ha podido encontrar al estudiante</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Volver a pagina anterior" color="darkturquoise" href="/students" />
                        </div>
                    </div>
                </div>
            </Overlay>

            <Overlay active={showConfirmationPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">Se ha inscripto al estudiante con éxito</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Aceptar" color="darkturquoise" onClick={() => { setShowConfirmationPopup(false); setShowAddStudentHasCareer(false); fetchData() }} />
                        </div>
                    </div>
                </div>
            </Overlay>

            <Overlay active={showDeleteConfirmationPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">Se ha eliminado la inscripción con éxito</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Listo" color="darkturquoise" onClick={() => { setShowDeleteConfirmationPopup(false) }} />
                        </div>
                    </div>
                </div>
            </Overlay>

            <main className="flex flex-col p-5 gap-4">
                <div className="shadow-card rounded-sm" hidden={!showAddStudentHasCareer}>
                    <Header title="Inscripción" size="xl" button={<Button name="Cancelar" onClick={() => { setShowAddStudentHasCareer(false) }}/>} />
                    <form className="grid grid-cols-2 gap-4 px-3 py-2" onSubmit={handleInscriptionSubmition}>
                        <label htmlFor="career">Carrera:</label>
                        <div>
                            <FilterSelect
                                id="career"
                                setSelected={(selection) => { setNewCareerError(null); setNewCareer(selection) }} 
                                getOptions={async (value) => {
                                    const response = await careersService.getCareers(value, 1, 5)
                                    return response.success ? response.data.careers.map(career => {
                                            return {
                                                ...career,
                                                toString: () => { return career.name }
                                            }
                                        }) : []
                                }}
                            />
                            <label htmlFor="career" className={`${newCareerError ? "visible": "invisible"} text-start text-customred`} id="dni-error">{newCareerError}</label>
                        </div>

                        <label htmlFor="enrolmentDate">Fecha de inscripción</label>
                        <div>
                            <input
                                className="w-full px-2 py-0.5 border border-solid border-slate-500 rounded-sm" 
                                type="date" id="enrolmentDate"
                                value={enrolmentDate.toISOString().substring(0,10)}
                                onChange={(e) => { setEnrolmentDateError(null); setEnrolmentDate(moment(e.currentTarget.value, "YYYY-MM-DD").toDate()) }}
                            />
                            <label htmlFor="enrolmentDate" className={`${enrolmentDateError ? "visible": "invisible"} text-start text-customred`} id="enrolmentDate-error">{enrolmentDateError}</label>
                        </div>

                        <span className={`${generalError ? "visible": "invisible"} text-start text-customred`}>{generalError}</span>
                        <span></span>

                        <Button name="Inscribir" color="darkturquoise" type="submit" />
                    </form>
                </div>

                <div className="shadow-card rounded-sm">
                    <Header title="Carreras" size="xl" button={<Button name="Inscribir" color="darkturquoise" onClick={() => { setShowAddStudentHasCareer(true) }} />} />
                    <div className="px-3 py-2">
                        <Table>
                            {careersTableComponents}
                        </Table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home