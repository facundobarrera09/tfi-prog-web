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
import Joi from "joi"
import { careerAddStudentsSchema } from "../../../../models/schemas/studentAddCareer"

interface HomeProps {
    params: Promise<{
        id: number
    }>
}

const emptyErrorMessage = "Se debe seleccionar al menos un estudiante"
const dateExceedsTodayErrorMessage = "La fecha no puede exceder la actual"

const Home: React.FC<HomeProps> = ({ params }) => {
    const [career, setCareer] = useState<Required<Career> | null>(null)
    const [enroledStudentsTableComponents, setEnroledStudentsTableComponents] = useState<React.ReactNode[]>([])

    const [showEnrolmentConfirmationPopup, setShowEnrolmentConfirmationPopup] = useState(false)
    const [enrolmentInfoComponents, setEnrolmentInfoComponents] = useState<React.ReactNode>([])

    const [showCareerNotFoundPopup, setShowCareerNotFoundPopup] = useState(false)

    const [studentToDelete, setStudentToDelete] = useState<Pick<Student, 'id' | 'sid' | 'firstname' | 'lastname'> | null>(null)
    const [showStudentDeleteConfirmation, setShowStudentDeleteConfirmation] = useState(false)
    const [showStudentDeletedPopup, setShowStudentDeletedPopup] = useState(false)

    const [showEnrolmentForm, setShowEnrolmentForm] = useState(false)

    const [newStudents, setNewStudents] = useState<Student[]>([])
    const [newStudentsComponents, setNewStudentsComponents] = useState<React.ReactNode[]>([])
    const [enrolmentDate, setEnrolmentDate] = useState<Date>(new Date())
    
    const [newStudentsError, setNewStudentsError] = useState<string | null>(null)
    const [enrolmentDateError, setEnrolmentDateError] = useState<string | null>(null)
    const [generalError, setGeneralError] = useState<string | null>(null)

    const fetchData = async () => {
        const result = await careersService.getCareer((await params).id)

        if (result.success) {
            setCareer(result.data.career)
        }
        else {
            setShowCareerNotFoundPopup(true)
        }
    }

    // CHANGE
    const handleInscriptionSubmition: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        
        const setErrors = (errors: Joi.ValidationError) => {
            errors.details.forEach(error => {
                switch(error.path[0]) {
                    case 'students':
                        switch(error.type) {
                            case 'array.min':
                                setNewStudentsError(emptyErrorMessage)
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
        
        const validationResult = careerAddStudentsSchema.validate({ enrolmentDate, students: newStudents }, { stripUnknown: true, abortEarly: false })
        
        if (validationResult.error) {
            setErrors(validationResult.error)
            return
        }

        if (!career || newStudents.length < 1)
            return

        const results = await Promise.all(
            newStudents.map(async (student) => {
                const response = await studentsService.careers.addCareer(student.id, career.id, enrolmentDate)
                return {
                    data: {
                        student,
                        career,
                        enrolmentDate
                    },
                    status: response.success ? 'Inscripción realizada' :
                            response.data?.error ? (
                                response.data.error.includes('already enroled') ? 'El estudiante ya esta inscripto en esta carrera' : 
                                'No se encontró la carrera'
                            ) : null
                }
            }
        ))

        const resultComponents = results.map(result => {
            return (
                <li key={result.data.student.sid}>&raquo; {result.data.student.sid} - {result.data.student.firstname} {result.data.student.lastname}: {result.status}</li>
            )
        })

        setEnrolmentInfoComponents(resultComponents)
        setShowEnrolmentConfirmationPopup(true)
        setShowEnrolmentForm(false);
        setNewStudents([])

        // setGeneralError(response.data?.error ? (response.data.error.includes('already enroled') ? 'El estudiante ya esta inscripto en esta carrera' : 'No se encontró la carrera') : null)
        // setTimeout(() => { setGeneralError(null) }, 5000)
    }
    // CHANGE

    const handleDeleteStudent = async () => {
        if (!career || !studentToDelete) {
            return
        }

        const response = await studentsService.careers.deleteCareer(studentToDelete.id, career.id)

        if (response.success) {
            setShowStudentDeletedPopup(true)
        }

        fetchData()
    }
    
    const updateStudentsTableComponents = (careers: StudentHasCareer[]) => {
        const newTableComponents = [
            <Row key={-1}>
                <HeadCell>Legajo</HeadCell>
                <HeadCell>Nombre</HeadCell>
                <HeadCell>Apellido</HeadCell>
                <HeadCell>Fecha de ingreso</HeadCell>
                <HeadCell>Acciones</HeadCell>
            </Row>
        ]
        
        newTableComponents.push(...careers.map((studentHasCareer, key) => {
            // console.log(studentHasCareer)
            if (!studentHasCareer.student) throw new Error('studentHasCareer is missing students information')
            
            return (
                <Row key={key}>
                    <Cell>{studentHasCareer.student.sid}</Cell>
                    <Cell>{studentHasCareer.student.firstname}</Cell>
                    <Cell>{studentHasCareer.student.lastname}</Cell>
                    <Cell>{studentHasCareer.enrolmentDate.toLocaleDateString()}</Cell>
                    <Cell>
                        <div className="flex gap-2">
                            <Button name="Eliminar inscripción" 
                                onClick={() => {
                                    if (studentHasCareer.student) {
                                        setStudentToDelete(studentHasCareer.student)
                                        setShowStudentDeleteConfirmation(true)
                                    }
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
                    <Cell span={4}>{'No se encontraron estudiantes inscriptos'}</Cell>
                </Row>
            )
        }

        setEnroledStudentsTableComponents(newTableComponents)
    }

    const updateNewStudentsComponents = (students: Student[]) => {
        const components: React.ReactNode[] = []

        students.forEach((student, index) => {
            components.push(
                <li className="flex gap-2 items-center" key={student.dni}>
                    <span>&raquo; {student.sid} - {student.firstname} {student.lastname}</span>
                    <Button name="Borrar" onClick={() => {setNewStudents(newStudents.filter(enlistedStudent => enlistedStudent.id !== student.id))}} />
                </li>
            )
        })

        if (components.length === 0) {
            components.push(<span key={1}>Sin estudiantes</span>)
        }

        setNewStudentsComponents(components)
    }

    useEffect(() => {
        updateNewStudentsComponents(newStudents)
    }, [newStudents])

    useEffect(() => {
        if (career) {
            updateStudentsTableComponents(career.students)
        }
    }, [career])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="relative flex-1 min-w-fit">
            <Header title={career ? `Vista de carrera: ${career.name}` : `Vista de carrera`} button={<Button name="Atras" href="/careers" />}/>

            <Overlay active={showCareerNotFoundPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">No se ha podido encontrar la carrera</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Volver a pagina anterior" color="darkturquoise" href="/careers" />
                        </div>
                    </div>
                </div>
            </Overlay>

            <Overlay active={showEnrolmentConfirmationPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        {/* <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">Resultados de la inscripción</span>
                        </div> */}
                        <Header title="Resultados de la inscripción" />
                        <div>
                            <ul>
                                {enrolmentInfoComponents}
                            </ul>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Aceptar" color="darkturquoise" onClick={() => { setShowEnrolmentConfirmationPopup(false); fetchData() }} />
                        </div>
                    </div>
                </div>
            </Overlay>

            <Overlay active={showStudentDeleteConfirmation}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex items-center text-xl">
                            <span >¿Está seguro de que desea desinscribir a&nbsp;</span>
                            <span className="font-bold">{`${studentToDelete?.firstname} ${studentToDelete?.lastname}` || 'alumno'}</span>
                            <span >&nbsp;de&nbsp;</span>
                            <span className="font-bold">{career?.name || 'carrera'}</span>
                            <span>?</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Eliminar" onClick={() => { handleDeleteStudent(); setShowStudentDeleteConfirmation(false) }} />
                            <Button name="Cancelar" color="darkturquoise" onClick={() => { setShowStudentDeleteConfirmation(false) }} />
                        </div>
                    </div>
                </div>
            </Overlay>

            <Overlay active={showStudentDeletedPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">Se ha eliminado la inscripción con éxito</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Listo" color="darkturquoise" onClick={() => { setShowStudentDeletedPopup(false) }} />
                        </div>
                    </div>
                </div>
            </Overlay>

            <main className="flex flex-col p-5 gap-4">
                <div className="shadow-card rounded-sm" hidden={!showEnrolmentForm}>
                    <Header title="Inscripción" size="xl" button={<Button name="Cancelar" onClick={() => { setShowEnrolmentForm(false) }}/>} />
                    
                    <form className="grid grid-cols-2 gap-4 px-3 py-2" onSubmit={handleInscriptionSubmition}>
                        <label htmlFor="students">Estudiantes:</label>
                        <div className="flex flex-col gap-2">
                            <ol className="flex flex-col gap-2">
                                {newStudentsComponents}
                            </ol>
                            <FilterSelect
                                id="students" clearAfterSelection placeholder="Buscar por legajo, nombre, o apellido..."
                                onChange={() => { setNewStudentsError(null) }}

                                setSelected={(selection) => {
                                    if (selection === null) { return }
                                    setNewStudentsError(null);
                                    setNewStudents([...newStudents, selection])
                                }}

                                getOptions={async (value) => {
                                    const response = await studentsService.getStudents(value, 1, 5)
                                    return response.success ? response.data.students
                                        .filter(student => !newStudents.find(enlistedStudent => enlistedStudent.id === student.id))
                                        .filter(student => !career?.students.find(enroledStudent => enroledStudent.student.id === student.id))
                                        .map(student => {
                                                return {
                                                    ...student,
                                                    toString: () => { return `${student.sid} - ${student.firstname} ${student.lastname}` }
                                                }
                                            }) : []
                                }}
                            />
                            <label htmlFor="students" className={`${newStudentsError ? "visible": "invisible"} text-start text-customred`} id="students-error">{newStudentsError}</label>
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
                    <Header title="Estudiantes inscriptos" size="xl" button={<Button name="Inscribir" color="darkturquoise" onClick={() => { setShowEnrolmentForm(true) }} />} />
                    <div className="px-3 py-2">
                        <Table>
                            {enroledStudentsTableComponents}
                        </Table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home