"use client"

import { ReactNode, useEffect, useState } from "react"

interface PaginatorProps {
    count: number
    page: number
    pageSize: number
    disabled?: boolean
    
    setPageSize(value: number): void
    setPage(page: number): void
}

const Paginator: React.FC<PaginatorProps> = ({ count, page, pageSize, setPageSize, setPage, disabled = false }) => {
    const [buttonComponents, setButtonComponents] = useState<ReactNode[]>([])

    const paginatorPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    function paginatorNextPage() {
        if (page < Math.ceil(count/pageSize)) {
            setPage(page + 1)
        }
    }

    const updateButtons = () => {
        const newButtonComponents = []

        newButtonComponents.push(
            <button
                key={-1}
                className="w-7 h-7  bg-slate-200 text-center enabled:cursor-pointer disabled:text-slate-400"
                disabled={page <= 1}
                onClick={paginatorPreviousPage}
            >
                {'<'}
            </button>
        )
        
        const range = 2
        const pages = count/pageSize !== 0 ? Math.ceil(count/pageSize) : 1

        const lowerLimit = (page - range <= 0 || (-2*range + pages) <= 1) ? 1 :
                 (page + range <= pages) ? (page - range) :
                 (-2*range + pages)
    
        const upperLimit = (page + range >= pages || (2*range + 1) >= pages) ? pages :
                    (page - range > 0) ? (page + range) :
                    (2*range + 1)

        for (let x = lowerLimit; x <= upperLimit; x++) {
            newButtonComponents.push(
                <button 
                    key={x}
                    className={(x !== page ?
                        'w-7 h-7  bg-slate-200 text-center cursor-pointer' :
                        'w-7 h-7  bg-lime-500 text-white text-center cursor-pointer'
                    )}
                    onClick={() =>{
                        if (x !== page) {
                            setPage(x)
                        }
                    }}
                >
                    {x}
                </button>
            )
        }

        newButtonComponents.push(
            <button
                key={upperLimit + 1}
                className="w-7 h-7 bg-slate-200 text-center enabled:cursor-pointer disabled:text-slate-400"
                disabled={page >= pages}
                onClick={paginatorNextPage}
            >
                {'>'}
            </button>
        )

        setButtonComponents(newButtonComponents)
    }

    useEffect(() => {
        updateButtons()
    }, [page, pageSize, count])

    useEffect(() => {
        updateButtons()
    }, [])

    return (
        <div className="relative w-full mt-2 flex justify-end">
            {
                disabled ?
                    <div className="absolute left-0 top-0 w-full h-full z-10 bg-[rgba(255,0,0,0.5)]"></div> :
                    null
            }
            
            <form className="w-fit flex">
                <label htmlFor="items-per-page" className="mr-1">Ítems por página: </label>
                <select
                    id="items-per-page"
                    className="px-1 py-0.5 border border-solid border-slate-500 rounded-sm"
                    onChange={(e) => { setPageSize(Number(e.currentTarget.value)) }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </form>

            <div className="flex ml-2" id="students-paginator">
                {buttonComponents}
            </div>
        </div>
    )
}

export default Paginator