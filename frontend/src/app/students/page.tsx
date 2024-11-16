"use client"

import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/shared/button/button"
import { Cell, HeadCell, Row, Table } from "../../components/shared/table/Table"
import studentsService from "../../services/students"
import SearchBar from "../../components/shared/table/SearchBar"
import Paginator from "../../components/shared/table/Paginator"
import Overlay from "../../components/shared/Overlay"
import notify from "../../services/notifications"

const Home: React.FC = () => {
    const [pageLoading, setPageLoading] = useState(false)

    const [showDeleteStudentPopup, setShowDeleteStudentPopup] = useState(false)
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)

    const [count, setCount] = useState<number>(0)
    const [students, setStudents] = useState<Student[]>([])
    const [tableComponents, setTableComponents] = useState<React.ReactNode[]>([])

    const [searchCriteria, setSearchCriteria] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const fetchData = async (search: string = searchCriteria, page: number = currentPage, size: number = pageSize, callback?: Function) => {
        // console.log('search', search, ', page', page, ', pageSize', size)

        const serviceResponse = await studentsService.getStudents(search, page, size)

        if (serviceResponse.success) {
            setCount(serviceResponse.data.count)
            setStudents(serviceResponse.data.students)
            
            if (callback) callback()
            return
        }

        setCount(0)
        setStudents([])
    }

    const handlePageSizeChange = (value: number) => {
        setPageLoading(true)
        fetchData(
            searchCriteria, 1, value,
            () => {
                setPageSize(value)
                setCurrentPage(1)
            }
        ).then(() => {
            setPageLoading(false)
        })
    }
    
    const handlePageChange = (page: number) => {
        setPageLoading(true)
        fetchData(
            searchCriteria, page, pageSize,
            () => {
                setCurrentPage(page)
            }
        ).then(() => {
            setPageLoading(false)
        })
    }

    const handleSearchChange = (value: string) => {
        setPageLoading(true)
        fetchData(
            value, 1, pageSize,
            () => {
                setCurrentPage(1)
                setSearchCriteria(value)
            }
        ).then(() => {
            setPageLoading(false)
        })
    }

    const handleStudentDelete = async () => {
        if (!studentToDelete) return

        setShowDeleteStudentPopup(false)
        setPageLoading(true)

        studentsService.deleteStudent(studentToDelete.id)
            .then((response) => {
                setPageLoading(false)
                fetchData()

                if (response.success) {
                    notify.success("El estudiante fue eliminado con éxito")
                    return
                }

                if (response.status) {
                    if (response.status !== 400) return
                }
                
                notify.error(`Error al eliminar el estudiante: No existe`)
            })
            .catch((e) => {
                console.log('error!', e)
            })
    }

    const updateTableComponents = (students: Student[]) => {
        const newTableComponents = [
            <Row key={-1}>
                <HeadCell>Legajo</HeadCell>
                <HeadCell>Nombre</HeadCell>
                <HeadCell>Apellido</HeadCell>
                <HeadCell>Acciones</HeadCell>
            </Row>
        ]
        
        newTableComponents.push(...students.map((student, key) => {
            return (
                <Row key={key}>
                    <Cell>{student.sid}</Cell>
                    <Cell>{student.firstname}</Cell>
                    <Cell>{student.lastname}</Cell>
                    <Cell>
                        <div className="flex gap-2">
                            <Button color="darkturquoise" href={`/students/view/${student.id}`} name="Carreras" />
                            <Button color="customred" href="#" name="Borrar" 
                                onClick={() => { setStudentToDelete(student); setShowDeleteStudentPopup(true) }}
                            />
                        </div>
                    </Cell>
                </Row>
            )
        }))

        if (newTableComponents.length === 1) {
            newTableComponents.push(
                <Row key={1}>
                    <Cell span={4}>{pageLoading ? 'Cargando...' : 'No se encontraron alumnos'}</Cell>
                </Row>
            )
        }

        setTableComponents(newTableComponents)
    }

    useEffect(() => {
        updateTableComponents(students)
    }, [students])

    useEffect(() => {
        if (pageLoading) {
            updateTableComponents([])
        }
    }, [pageLoading])

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div className="relative flex-1 min-w-fit">
            <Header title="Alumnos" button={<Button color="darkturquoise" href="/students/add" name="Agregar"></Button>}/>

            <Overlay active={showDeleteStudentPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">¿Estás seguro de que deseas eliminar a este estudiante?</span>
                            <span className="text-xl">{`${studentToDelete?.sid} - ${studentToDelete?.lastname}, ${studentToDelete?.firstname}`}</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Eliminar" color="customred" onClick={() => handleStudentDelete() } />
                            <Button name="Cancelar" color="darkturquoise" onClick={() => { setShowDeleteStudentPopup(false) }} />
                        </div>
                    </div>
                </div>
            </Overlay>

            <main className="p-5">
                <SearchBar setSearchCriteria={handleSearchChange} />
                <Table>
                    {tableComponents}
                </Table>
                <Paginator 
                    page={currentPage} pageSize={pageSize} count={count}
                    setPage={handlePageChange} setPageSize={handlePageSizeChange} 
                />
            </main>
        </div>
    )
}

export default Home