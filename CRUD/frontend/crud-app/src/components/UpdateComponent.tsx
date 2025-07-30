import { useEffect, useState, type ChangeEventHandler, type FormEventHandler } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch, rootState } from "../store/store"
import { updatePersonaThunk } from "../store/persona/personaThunks"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { Persona } from "../types"

import { Form, Button, Alert } from "react-bootstrap"
import { Header } from "./Header"


export const UpdateComponent: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()
    const { error, loading, personas } = useSelector((state: rootState) => state.persona)
    const [updatePersona, setUpdatePersona] = useState<Persona>({
        email: '',
        id: 0,
        isActive: false,
        name: '',
        username: ''
    })

    useEffect(() => {
        if (!id)
            return
        const persona = personas.find(persona => persona.id === Number(id))

        if (!persona)
            return
        setUpdatePersona(persona)

    }, [])

    const handleOnchangeData: ChangeEventHandler<HTMLInputElement> = (e) => {
        const id = e.target.id
        const value = e.target.value

        setUpdatePersona(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        dispatch(updatePersonaThunk(updatePersona))
        navigate('/')
    }

    return (
        <div className="container-fluid">
            <Header text="Update User Form"/>
            <Form onSubmit={handleOnSubmit}>
                <input type="hidden" value={updatePersona.id} />
                <Form.Group className="m-2">
                    <Form.Label htmlFor="name">Name: </Form.Label>
                    <Form.Control type="text" id="name" value={updatePersona.name} onChange={handleOnchangeData} />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label htmlFor="email">Email: </Form.Label>
                    <Form.Control type="text" id="email" value={updatePersona.email} onChange={handleOnchangeData} />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label htmlFor="username">Username: </Form.Label>
                    <Form.Control type="text" id="username" value={updatePersona.username} onChange={handleOnchangeData} />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label htmlFor="isActive">Is active: </Form.Label>
                    <Form.Control type="checkbox" id="isActive" checked={updatePersona.isActive} onChange={handleOnchangeData} />
                </Form.Group>

                <div className="row m-2">
                    <Button variant="outline-primary" type="submit">Save Changes</Button>
                </div>
                {loading && <span>Loading...</span>}
                {error && <Alert variant="danger">{error}</Alert>}
            </Form>
        </div>

    )
}