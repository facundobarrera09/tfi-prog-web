'use client';

import React, { ChangeEventHandler, useEffect, useState } from "react";

interface FilterSelectProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    clearAfterSelection?: boolean
    setSelected(newSelection: any): void
    getOptions(value: string): Promise<any[]>
}

const FilterSelect: React.FC<FilterSelectProps> = ({ id, placeholder = "", clearAfterSelection = false, getOptions, setSelected, ...props }) => {
    const [options, setOptions] = useState<any[]>([])
    const [optionsComponents, setOptionsComponents] = useState<React.ReactNode[]>([])

    const [criteria, setCriteria] = useState("")
    const [selection, setSelection] = useState<any | null>(null)

    const [searching, setSearching] = useState(false)
    const [inputHovered, setInputHovered] = useState(false)
    const [optionsHovered, setOptionsHovered] = useState(false)

    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | undefined>(undefined)

    const fetchData = async (searchCriteria: string = criteria) => {
        if (searchCriteria !== "") {
            setOptions(await getOptions(searchCriteria.trimEnd().trimStart()))
        }
    }

    const debounce = (value: string) => {
        setSearching(true)

        clearTimeout(debounceTimeout)
        setDebounceTimeout(setTimeout(() => { fetchData(value); setSearching(false) }, 500))
    }

    const updateOptionComponents = (options: any[]) => {
        const components: React.ReactNode[] = []
    
        options.forEach((option) => {
            components.push(
                <div
                    key={option.toString()}
                    className="py-2 px-4 [&:not(:last-child)]:border-b border-solid border-slate-300 hover:bg-slate-300 cursor-pointer"
                    onClick={(e) => { setOptionsHovered(false); setSelection(option); }}
                >
                    {option.toString()}
                </div>
            )
        })

        // console.log('length', components.length, 'criteria', criteria, 'searching', searching)
        if (components.length === 0 && criteria !== "") {
            components.push(
                <div
                    key={10000}
                    className="py-2 px-4 [&:not(:last-child)]:border-b border-solid border-slate-300"
                >
                    {searching ? 'Buscando...' : 'No se encontraron resultados'}
                </div>
            )
        }

        setOptionsComponents(components)
    }

    useEffect(() => {
        updateOptionComponents([])
    }, [criteria])

    useEffect(() => {
        updateOptionComponents(options)
    }, [options])

    useEffect(() => {
        if (selection) {
            setSelected(selection)
            if (clearAfterSelection) {
                setCriteria("")
            }
            else {
                setCriteria(selection.toString())
            }
        }
    }, [selection])

    return (
        <div className={'relative flex border border-solid border-light-border'}
        >
            <input
                {...props}
                className="w-full px-2 py-0.5 border border-solid border-slate-500 rounded-sm" 
                type="text" value={criteria}
                autoComplete="off" placeholder={placeholder}

                onInput={(e) => { setSelection(null); setSelected(null); setCriteria(e.currentTarget.value); debounce(e.currentTarget.value) }}
                onFocus={() => { setInputHovered(true) }}
                onBlur={() => { setInputHovered(false) }}
            />
            <div 
                className="absolute left-0 top-full w-full z-10 bg-white border border-solid border-slate-500 shadow-md" hidden={!(inputHovered || optionsHovered) || selection}
                onMouseEnter={() => { setOptionsHovered(true) }}
                onMouseLeave={() => { setOptionsHovered(false) }}
            >
                {optionsComponents}
            </div>
        </div>
    )
}

export default FilterSelect
