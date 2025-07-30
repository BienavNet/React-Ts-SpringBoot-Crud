import { createAsyncThunk } from "@reduxjs/toolkit";
import { create, deletePersona, getAll, getPersona, update } from '../../service/PersonasService.ts'
import type { PersonaForm, Persona, Response } from "../../types.ts";

export const getAllPersonasThunk = createAsyncThunk(
    'persona/getAll',
    async () => {
        return await getAll()
    }
)

export const createPersonaThunk = createAsyncThunk<Response, PersonaForm>(
    'persona/create',
    async (data, { rejectWithValue}) => {
        try{
            const personas = await create(data)
            return personas
        } catch {
            return rejectWithValue("No se pudo guardar el usuario.")
        }
    }
)

export const updatePersonaThunk = createAsyncThunk<Response, Persona>(
    'persona/update',
    async (data, {rejectWithValue}) => {
        try{
            if (!data)
                return rejectWithValue("Los datos enviados no son validos.")
            const persona = await update(data)
            return persona
        }catch {
            return rejectWithValue("No se pudo actualizar los datos.")
        }
    }
)

export const deletePersonaThunk = createAsyncThunk<Response, Persona>(
    'persona/delete',
    async (persona, {rejectWithValue}) => {
        if (!persona)
            return rejectWithValue("No se pudieron eliminar los datos.")
        const response = await deletePersona(persona)
        return response
    }
)

export const getPersonaThunk = createAsyncThunk<Response, number>(
    'persona/get',
    async (id, {rejectWithValue}) => {
        if (!id)
            return rejectWithValue("Error al obtener la persona.")
        const persona =  await getPersona(id)
        return persona

    }
)