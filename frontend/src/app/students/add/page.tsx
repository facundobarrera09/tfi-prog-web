"use client"

import { FormEventHandler, useState } from "react"
import Header from "../../../components/Header"
import Button from "../../../components/shared/button/button"
import { formStudentsSchema } from "../../../models/schemas/createStudent"
import Overlay from "../../../components/shared/Overlay"
import Joi from "joi"
import studentsService from "../../../services/students"

const emptyErrorMessage = "Este campo no puede estar vacio"
const nameErrorMessage = "Debe contener entre 2 y 100 caracteres, sin digitos o puntuaciones"
const dniErrorMessage = "Debe contener un máximo de 10 digitos"
const dniLettersErrorMessage = "No debe contener letras"
const emailErrorMessage = "Este email no es válido"

const Home: React.FC = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [dni, setDni] = useState("")
    const [email, setEmail] = useState("")

    const [firstnameError, setFirstnameError] = useState<string | null>(null)
    const [lastnameError, setLastnameError] = useState<string | null>(null)
    const [dniError, setDniError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [generalError, setGeneralError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)
    const [showConfirmationDisplay, setShowConfirmationDisplay] = useState(false)

    const setErrors = (error: Joi.ValidationError) => {
        error.details.forEach((error) => {
            // console.log(error)
            switch (error.path[0]) {
                case 'firstname':
                    if (error.type == 'string.empty') {
                        setFirstnameError(emptyErrorMessage)
                    }
                    else {
                        setFirstnameError(nameErrorMessage)
                    }
                    break
                case 'lastname':
                    if (error.type == 'string.empty') {
                        setLastnameError(emptyErrorMessage)
                    }
                    else {
                        setLastnameError(nameErrorMessage)
                    }
                    break
                case 'dni':
                    switch (error.type) {
                        case 'string.empty':
                            setDniError(emptyErrorMessage)
                            break;
                        case 'string.pattern.base': 
                            setDniError(dniLettersErrorMessage)
                            break
                        default:
                            setDniError(dniErrorMessage)
                    }
                    break
                case 'email':
                    if (error.type == 'string.empty') {
                        setEmailError(emptyErrorMessage)
                    }
                    else {
                        setEmailError(emailErrorMessage)
                    }
                    break
            }
        })
    }

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const validationResult = formStudentsSchema.validate({ firstname, lastname, dni, email }, { abortEarly: false })

        if (validationResult.error)
            return setErrors(validationResult.error)

        setLoading(true)

        studentsService.createStudent(firstname, lastname, BigInt(dni), email)
            .then((response) => {
                setLoading(false)

                if (!response.success) {
                    // console.log('response', response)
                    if (response.data) {
                        if (response.data.error instanceof Joi.ValidationError)
                            setErrors(response.data.error)
                    }
                    else if (response.message) {
                        setGeneralError("Ya existe un estudiante con esos datos")
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

    return (
        <div className="relative flex-1 min-w-fit">
            <Header title="Agregar alumnos" button={<Button color="customred" href="/students" name="Atras"></Button>}/>
            
            <Overlay active={loading} />
            <Overlay active={showConfirmationDisplay}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-8 py-4 shadow-card rounded-sm">
                        <span className="text-xl">Se creo el estudiante con éxito!</span>
                        <Button name="Continuar" href="/students" color="darkturquoise" />
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

                    <label htmlFor="firstname">Nombre:</label>
                    <div className="flex flex-col">
                        <input
                            autoComplete="off" 
                            id="firstname" type="text" className="px-1 border border-solid border-slate-500"
                            onChange={(e) => { setFirstnameError(null); setFirstname(e.currentTarget.value) }}
                            // onFocus={() => { setFirstnameError(null) }}
                        />
                        <label htmlFor="firstname" className={`${firstnameError ? "visible": "invisible"} text-start text-customred`} id="firstname-error">{firstnameError}</label>
                    </div>

                    <label htmlFor="lastname">Apellido:</label>
                    <div className="flex flex-col">
                        <input
                            autoComplete="off" 
                            id="lastname" type="text" className="px-1 border border-solid border-slate-500"
                            onChange={(e) => { setLastnameError(null); setLastname(e.currentTarget.value) }} 
                            // onFocus={() => { setLastnameError(null) }}
                        />
                        <label htmlFor="lastname" className={`${lastnameError ? "visible": "invisible"} text-start text-customred`} id="lastname-error">{lastnameError}</label>
                    </div>

                    <label htmlFor="dni">DNI:</label>
                    <div className="flex flex-col">
                        <input
                            autoComplete="off" 
                            id="dni" type="text" className="px-1 border border-solid border-slate-500" 
                            onChange={(e) => { setDniError(null); setDni(e.currentTarget.value) }} 
                            // onFocus={() => { setDniError(null) }}
                        />
                        <label htmlFor="dni" className={`${dniError ? "visible": "invisible"} text-start text-customred`} id="dni-error">{dniError}</label>
                    </div>

                    <label htmlFor="email">Email:</label>
                    <div className="flex flex-col">
                        <input
                            autoComplete="off" 
                            id="email" type="text" className="px-1 border border-solid border-slate-500" 
                            onChange={(e) => { setEmailError(null); setEmail(e.currentTarget.value) }} 
                            // onFocus={() => { setEmailError(null) }}
                        />
                        <label htmlFor="email" className={`${emailError ? "visible": "invisible"} text-start text-customred`} id="email-error">{emailError}</label>
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