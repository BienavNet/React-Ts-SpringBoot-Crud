import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, rootState } from "../store/store"
import { useEffect } from "react"
import { getAllPersonasThunk, deletePersonaThunk } from "../store/persona/personaThunks"
import { Link, useNavigate } from "react-router-dom"


import { Table, Button } from "react-bootstrap"

import { Header } from "./Header"


export const ListComponent: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { error, loading, personas } = useSelector((state: rootState) => state.persona)
    const navigate = useNavigate()
    // const [action, setAction] = useState<Action>({
    //     name: '',
    //     persona: undefined,
    //     show: false
    // })

    useEffect(() => {
        dispatch(getAllPersonasThunk())
    }, [dispatch])


    const handleEdit = (id: number) => {
        navigate(`/update/${id}`)
    }
    const handleDelete = (id: number) => {
        const confirm = window.confirm("Really do you want to delete this user?")
        const personaToDelete = personas.find(persona => persona.id === id)

        if (!personaToDelete)
            return

        if (!confirm)
            return
        dispatch(deletePersonaThunk(personaToDelete))
    }



    return (

        <div className="container-fluid">
            <Header text="CRUD APP with React TS and SprinBoot" />
            <div className="row my-4">
                <div className="col-3">
                    <Button variant="dark">
                        <Link to='/register' style={{
                            color: "white",
                            textDecoration: "none"
                        }}>Register</Link>
                    </Button>
                </div>
            </div>
            <div className="row">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Is Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map(persona => (
                            <tr key={persona.id}>
                                <td><span>{persona.name}</span></td>
                                <td><span>{persona.email}</span></td>
                                <td><span>{persona.username}</span></td>
                                <td><input type="checkbox" name="isActive" checked={persona.isActive} /></td>
                                <td className="row m-0">
                                    <div className="col">
                                        <Button variant="outline-primary" id="update" onClick={() => handleEdit(persona.id)}>Edit</Button>
                                    </div>
                                    <div className="col">
                                        <Button variant="outline-danger" id="delete" onClick={() => handleDelete(persona.id)}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>

            <div className="row d-flex justify-content-center align-items-center">
                {loading && <span>Loading...</span>}
                {error && <span>{error}</span>}
                {personas.length === 0 && <span>There no anything to show here.</span>}
                {/* {action.show && action.name === 'update' && action.persona && <UpdateComponent persona={action.persona} />} */}
            </div>



        </div>
    )
}