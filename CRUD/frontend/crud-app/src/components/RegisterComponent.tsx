import { useState, type ChangeEventHandler, type FormEventHandler } from "react"
import type { PersonaForm } from "../types"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import type { AppDispatch, rootState } from "../store/store"
import { createPersonaThunk } from "../store/persona/personaThunks"
import { useNavigate } from "react-router-dom"

import { Button, Form } from "react-bootstrap"

import { Header } from "./Header"



export const RegisterComponent: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: rootState) => state.persona)
    const navigate = useNavigate()

    const [formData, setFormData] = useState<PersonaForm>({
        name: '',
        username: '',
        email: ''
    })

    const handleFormDataOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value, id } = event.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        console.log(loading, error)
        dispatch(createPersonaThunk(formData))
        setFormData({ email: "", name: "", username: "" })
        navigate('/')
    }




    return (
        <div className="container-fluid">
            <Header text="Register User Form"/>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group className="m-2">
                    <Form.Label htmlFor="name">Name: </Form.Label>
                    <Form.Control type="text" id="name" value={formData.name} onChange={handleFormDataOnChange} />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label htmlFor="email">Email: </Form.Label>
                    <Form.Control type="text" id="email" value={formData.email} onChange={handleFormDataOnChange} />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label htmlFor="username">Username: </Form.Label>
                    <Form.Control type="text" id="username" value={formData.username} onChange={handleFormDataOnChange} />
                </Form.Group>

                <div className="row m-3">
                    <Button variant="outline-info" type="submit">Create</Button>
                </div>

            </Form>

        </div>
    )
}