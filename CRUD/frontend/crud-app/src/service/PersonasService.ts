import type { Response } from "../types"
import type { Persona, PersonaForm } from "../types"
import { URLBASE } from "../constants"


export const create = async (data: PersonaForm) : Promise<Response> => {

    try {
        const response = await fetch(`${URLBASE}/create`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    
        const returnData = await response.json() as Persona
        return {data: returnData, success: response.ok} as Response
    } catch {
        return {data: [], success: false}
    }
}

export const getAll = async () : Promise<Response> => {
    const response = await fetch(`${URLBASE}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const personas = await response.json() as Array<Persona>
    return {
        data: personas,
        success: response.ok
    }
}

export const update = async (persona: Persona): Promise<Response> => {

    try{
        const response = await fetch(`${URLBASE}/update/${persona.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(persona)
        })
    
        const data = await response.json() as Persona
        return {
            data: data, 
            success: response.ok
        } as Response
    }catch {
        return {data: [], success: false}
    }

}

export const deletePersona = async (persona: Persona) : Promise<Response> => {

    const response = await fetch(`${URLBASE}/delete/${persona.id}`, {
        method: "DELETE", 
    })

    return {
        data: persona,
        success: response.status == 204
    }
}

export const getPersona = async (id: number) : Promise<Response> => {

    const response = await fetch(`${URLBASE}/${id}`)
    const data  = await response.json() as Persona
    return {
        data: data, 
        success: response.ok
    } as Response
}