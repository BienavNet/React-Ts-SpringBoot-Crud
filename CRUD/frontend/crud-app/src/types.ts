export interface Persona {
    id: number
    name: string
    email: string
    username: string
    isActive: boolean
}

export interface PersonaState {
    personas: Array<Persona>
    loading: boolean
    error: string | null
}

export interface Response {
    data: Persona | Array<Persona>
    success: boolean
}

export type PersonaForm = Omit<Persona, "id" | "isActive">