"use client"

import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/shared/button/button"
import Overlay from "../../components/shared/Overlay"
import { Cell, HeadCell, Row, Table } from "../../components/shared/table/Table"
import SearchBar from "../../components/shared/table/SearchBar"
import Paginator from "../../components/shared/table/Paginator"
import careersService from "../../services/careers"
import notify from "../../services/notifications"

const Home = () => {
    const [pageLoading, setPageLoading] = useState(false)

    const [showDeleteCareerPopup, setShowDeleteCareerPopup] = useState(false)
    const [careerToDelete, setCareerToDelete] = useState<Career | null>(null)

    const [count, setCount] = useState<number>(0)
    const [careers, setCareers] = useState<Career[]>([])
    const [tableComponents, setTableComponents] = useState<React.ReactNode[]>([])

    const [searchCriteria, setSearchCriteria] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const fetchData = async (search: string = searchCriteria, page: number = currentPage, size: number = pageSize, callback?: Function) => {
        // console.log('search', search, ', page', page, ', pageSize', size)

        const response = await careersService.getCareers(search, page, size)

        if (response.success) {
            setCount(response.data.count)
            setCareers(response.data.careers)
            
            if (callback) callback()
            return
        }

        setCount(0)
        setCareers([])
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

    const handleCareerDelete = async () => {
        if (!careerToDelete) return

        setShowDeleteCareerPopup(false)
        setPageLoading(true)

        careersService.deleteCareer(careerToDelete.id)
            .then((response) => {
                setPageLoading(false)
                fetchData()

                if (response.success) {
                    notify.success("La carrera fue eliminada con éxito")
                    return
                }

                if (response.status) {
                    if (response.status !== 400) return
                }
                
                notify.error(`Error al eliminar la carrera: No existe`)
            })
            .catch((e) => {
                console.log('error!', e)
            })
    }

    const updateTableComponents = (careers: Career[]) => {
        const newTableComponents = [
            <Row key={-1}>
                <HeadCell>Código</HeadCell>
                <HeadCell>Nombre</HeadCell>
                <HeadCell>Niveles</HeadCell>
                <HeadCell>Acreditada</HeadCell>
            </Row>
        ]
        
        newTableComponents.push(...careers.map((career, key) => {
            return (
                <Row key={key}>
                    <Cell>{career.id}</Cell>
                    <Cell>{career.name}</Cell>
                    <Cell>{career.levels.length}</Cell>
                    <Cell>{career.accredited ? 'Sí' : 'No'}</Cell>
                    <Cell>
                        <div className="flex gap-3">
                            <Button name="Estudiantes" color="darkturquoise" href={`/careers/view/${career.id}`} />
                            <Button color="customred" href="#" name="Borrar" 
                                onClick={() => { setCareerToDelete(career); setShowDeleteCareerPopup(true) }}
                            />
                        </div>
                    </Cell>
                </Row>
            )
        }))

        if (newTableComponents.length === 1) {
            newTableComponents.push(
                <Row key={1}>
                    <Cell span={4}>{pageLoading ? 'Cargando...' : 'No se encontraron carreras'}</Cell>
                </Row>
            )
        }

        setTableComponents(newTableComponents)
    }

    useEffect(() => {
        updateTableComponents(careers)
    }, [careers])

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
            <Header title="Carreras" button={<Button color="darkturquoise" href="/careers/add" name="Agregar" />}/>

            <Overlay active={showDeleteCareerPopup}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">¿Estás seguro de que deseas eliminar esta carrera?</span>
                            <span className="text-xl">{`${careerToDelete?.id} - ${careerToDelete?.name}`}</span>
                        </div>
                        <div className="flex gap-3">
                            <Button name="Eliminar" color="customred" onClick={() => handleCareerDelete() } />
                            <Button name="Cancelar" color="darkturquoise" onClick={() => { setShowDeleteCareerPopup(false) }} />
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