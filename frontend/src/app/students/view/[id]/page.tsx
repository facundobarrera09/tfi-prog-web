"use client"

import { use, useEffect, useState } from "react"
import Header from "../../../../components/Header"
import Button from "../../../../components/shared/button/button"
import { Cell, HeadCell, Row, Table } from "../../../../components/shared/table/Table"
import studentsService from "../../../../services/students"
import Overlay from "../../../../components/shared/Overlay"

interface HomeProps {
    params: Promise<{
        id: number
    }>
}

const Home: React.FC<HomeProps> = ({ params }) => {
    const [student, setStudent] = useState<Required<Student> | null>(null)
    const [careersTableComponents, setCareersTableComponents] = useState<React.ReactNode[]>([])

    const [showStudentNotFoundPopup, setShowStudentNotFoundPopup] = useState(false)

    const fetchData = async () => {
        const result = await studentsService.getStudent((await params).id)

        if (result.success) {
            setStudent(result.data.student)
        }
        else {
            setShowStudentNotFoundPopup(true)
        }
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
            console.log(studentHasCareer)
            return (
                <Row key={key}>
                    <Cell>{studentHasCareer.career.id}</Cell>
                    <Cell>{studentHasCareer.career.name}</Cell>
                    <Cell>{studentHasCareer.enrolmentDate.toLocaleDateString()}</Cell>
                    <Cell>
                        <div className="flex gap-2">
                            <Button color="darkturquoise" href={`/careers/view/${studentHasCareer.career.id}`} name="Ver" />
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
            <Header title={`Vista de estudiante`} button={<Button name="Atras" href="/students" />}/>

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

            <main className="p-5">
                <div className="shadow-card rounded-sm">
                    <Header title="Carreras" size="xl" button={<Button name="Inscribir" color="darkturquoise" />} />
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