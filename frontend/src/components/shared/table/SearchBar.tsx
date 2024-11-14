"use client"

import { useState } from "react"

interface SearchBarProps {
    setSearchCriteria(value: string): void
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchCriteria }) => {
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | undefined>(undefined)

    const debounce = (value: string) => {
        clearTimeout(debounceTimeout)
        setDebounceTimeout(setTimeout(() => { setSearchCriteria(value) }, 500))
    }

    return (
        <search className="mb-2">
            <form action="" className="flex" id="students-search">
                <input
                    className="w-full px-2 py-0.5 border border-solid border-slate-500 rounded-sm" 
                    type="text"
                    placeholder="Buscar por legajo, nombre o apellido..."
                    onInput={(e) => { debounce(e.currentTarget.value) }}
                />
            </form>
        </search>
    )
}

export default SearchBar