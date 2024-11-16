"use client"

import Joi from "joi"
import { ButtonHTMLAttributes, FormEventHandler, MouseEventHandler, useEffect, useState } from "react"
import { formCareerSchema, validLevelNameRegex } from "../../../models/schemas/createCareer"
import Header from "../../../components/Header"
import Button from "../../../components/shared/button/button"
import Overlay from "../../../components/shared/Overlay"
import careersService from "../../../services/careers"

const emptyErrorMessage = "Este campo no puede estar vacio"
const nameErrorMessage = "Debe contener entre 2 y 100 caracteres, sin digitos o puntuaciones"
const noLevelsErrorMessage = "Debe existir al menos un nivel"
const tooManyLevelsErrorMessage = "No pueden haber mas de 10 niveles"
const levelNameErrorMessage = "Debe contener entre 1 y 25 caracteres, sin puntuaciones"
const levelAlreadyExistsErrorMessage = "Ya existe un nivel con ese nombre"

const Home: React.FC = () => {
    const [careerName, setCareerName] = useState("")
    const [accredited, setAccredited] = useState(false)

    const [levels, setLevels] = useState<Pick<Level, 'name'>[]>([])
    const [newLevelName, setNewLevelName] = useState("")
    const [levelComponents, setLevelComponents] = useState<React.ReactNode[]>([])

    const [careerNameError, setCareerNameError] = useState<string | null>(null)
    const [accreditedError, setAccreditedError] = useState<string | null>(null)
    const [levelError, setLevelError] = useState<string | null>(null)

    const [generalError, setGeneralError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)
    const [showConfirmationDisplay, setShowConfirmationDisplay] = useState(false)

    const setErrors = (error: Joi.ValidationError) => {
        error.details.forEach((error) => {
            // console.log(error)
            switch (error.path[0]) {
                case 'name':
                    if (error.type === 'string.empty') {
                        setCareerNameError(emptyErrorMessage)
                    }
                    else {
                        setCareerNameError(nameErrorMessage)
                    }
                    break
                case 'accredited':
                    if (error.type === 'string.empty') {
                        setAccreditedError(emptyErrorMessage)
                    }
                    else {
                        setAccreditedError("Verdadero o falso")
                    }
                    break
                case 'levels':
                    switch(error.type) {
                        case 'array.min':
                            setLevelError(noLevelsErrorMessage)
                            break
                        case 'array.max':
                            setLevelError(tooManyLevelsErrorMessage)
                            break
                        case 'array.unique':
                            setLevelError(levelAlreadyExistsErrorMessage)
                    }
                    break
            }
        })
    }

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        // console.log('creating career', newCareer)
        
        const validationResult = formCareerSchema.validate({ name: careerName, accredited, levels }, { abortEarly: false })

        if (validationResult.error)
            return setErrors(validationResult.error)

        setLoading(true)

        careersService.createCareer(careerName, accredited, levels)
            .then((response) => {
                setLoading(false)

                if (!response.success) {
                    // console.log('response', response)
                    if (response.data) {
                        if (response.data.error instanceof Joi.ValidationError)
                            setErrors(response.data.error)
                    }
                    else if (response.message) {
                        setGeneralError("Ya existe esta carrera")
                        setTimeout(() => { setGeneralError(null) }, 5000)
                    }
                    else {
                        throw new Error('unexpected')
                    }
                    return
                }

                setShowConfirmationDisplay(true)
            })
    }

    const handleAddLevel = () => {
        const newLevels = [...levels]

        if (newLevelName.match(/^[ ]*$/)) {
            setLevelError(emptyErrorMessage)
            return
        }
        if (!newLevelName.match(validLevelNameRegex)) {
            setLevelError(levelNameErrorMessage)
            return
        }

        if (!newLevels.find(level => level.name === newLevelName)) {
            newLevels.push({ name: newLevelName })
            setLevels(newLevels)
            setNewLevelName("")
        }
        else {
            setLevelError(levelAlreadyExistsErrorMessage)
        }
    }

    const handleDeleteLevel = (levelName: string) => {
        const levelsCopy = [...levels]
        // console.log('deleting', levelName, 'from', levelsCopy)

        const newLevels = levelsCopy.filter(level => level.name !== levelName)
        // console.log('result', newLevels)

        setLevels(newLevels)
    }

    useEffect(() => {
        // console.log('levels change', levels)
        const components: React.ReactNode[] = []

        levels.forEach((level, index) => {
            components.push(
                <li className="flex gap-2 items-center" key={level.name}>
                    <span>&raquo; {level.name}</span>
                    <Button name="Borrar" onClick={() => {handleDeleteLevel(level.name)}} />
                </li>
            )
        })

        if (levelComponents.length === 0) {
            components.push(<span key={1}>Sin niveles</span>)
        }

        setLevelComponents(components)
    }, [levels])

    return (
        <div className="relative flex-1 min-w-fit">
            <Header title="Agregar carrera" button={<Button color="customred" href="/careers" name="Atras" />}/>
            
            <Overlay active={loading} />
            <Overlay active={showConfirmationDisplay}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <span className="text-xl">Se creo la carrera con éxito!</span>
                        <Button name="Continuar" href="/careers" color="darkturquoise" />
                    </div>
                </div>
            </Overlay>

            <main className="relative p-5 m-5 shadow-card">
                <form className="grid grid-cols-2 gap-4" id="add-student-form" onSubmit={handleFormSubmit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && showConfirmationDisplay) {
                            e.preventDefault()
                            return
                        }
                    }}
                >

                    <label htmlFor="careerName">Nombre de la carrera:</label>
                    <div className="flex flex-col">
                        <input
                            autoComplete="off" 
                            id="careerName" type="text" className="px-1 border border-solid border-slate-500"
                            onChange={(e) => { setCareerNameError(null); setCareerName(e.currentTarget.value) }}
                            // onFocus={() => { setFirstnameError(null) }}
                        />
                        <label htmlFor="careerName" className={`${careerNameError ? "visible": "invisible"} text-start text-customred`} id="careerName-error">{careerNameError}</label>
                    </div>

                    <label htmlFor="accredited">Acreditada:</label>
                    <div className="flex flex-col justify-center">
                        <input
                            autoComplete="off" 
                            id="accredited" type="checkbox" className="w-fit px-1 border border-solid border-slate-500"
                            onChange={(e) => { setAccreditedError(null); setAccredited(e.currentTarget.checked) }} 
                            // onFocus={() => { setLastnameError(null) }}
                        />
                        <label htmlFor="accredited" className={`${accreditedError ? "visible": "invisible"} text-start text-customred`} id="accredited-error">{accreditedError}</label>
                    </div>

                    <label htmlFor="levels">Niveles:</label>
                    <div className="flex flex-col">
                        <ol className="flex flex-col gap-2">
                            {levelComponents}
                            <li className="flex gap-2" id="levels">
                                <input 
                                    type="text" className="border border-solid border-slate-500" 
                                    value={newLevelName} onChange={(e) => { setLevelError(null); setNewLevelName(e.currentTarget.value)}} 
                                />
                                <Button name="Añadir nivel" color="darkturquoise" onClick={handleAddLevel} />
                            </li>
                        </ol>
                        <label htmlFor="levels" className={`${levelError ? "visible": "invisible"} text-start text-customred`} id="levels-error">{levelError}</label>
                    </div>

                    <span className={`${generalError ? "visible": "invisible"} text-start text-customred`}>{generalError}</span>
                    <span></span>

                    <Button name="Agregar" color="darkturquoise" type="submit" />
                </form>
            </main>
        </div>
    )
}

export default Home