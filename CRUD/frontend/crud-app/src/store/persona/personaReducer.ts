import { type ActionReducerMapBuilder, type PayloadAction } from "@reduxjs/toolkit";
import type { Persona, PersonaState, Response } from "../../types";

import { createPersonaThunk, getAllPersonasThunk, updatePersonaThunk, deletePersonaThunk, getPersonaThunk } from "./personaThunks";

export const personaReducers = (builder: ActionReducerMapBuilder<PersonaState>) => {
    createPersonaReducer(builder)
    getAllPersonasReducer(builder)
    updatePersonaReducer(builder)
    getPersonaReducer(builder)
    deletePersonaReducer(builder)
}


const createPersonaReducer = (builder: ActionReducerMapBuilder<PersonaState>) => {
    builder
        .addCase(createPersonaThunk.pending, (state: PersonaState) => {
            state.loading = true
        })
        .addCase(createPersonaThunk.rejected, (state: PersonaState) => {
            state.loading = false
            state.error = "No se pudo registar el usuario."
        })
        .addCase(createPersonaThunk.fulfilled, (state: PersonaState, action: PayloadAction<Response>) => {
            state.loading = false
            if (Array.isArray(action.payload.data)) {
                state.personas = action.payload.data
                return
            }

            state.personas.push(action.payload?.data)
        })
}

const getAllPersonasReducer = (builder: ActionReducerMapBuilder<PersonaState>) => {
    builder
        .addCase(getAllPersonasThunk.pending, (state: PersonaState) => {
            state.loading = true
        })
        .addCase(getAllPersonasThunk.rejected, (state: PersonaState) => {
            state.loading = false
            state.error = "No se pudo obtener los registros desde la base de datos."
        })
        .addCase(getAllPersonasThunk.fulfilled, (state: PersonaState, action: PayloadAction<Response>) => {
            state.loading = false
            state.personas = action.payload.data as Array<Persona>
        })
}

const updatePersonaReducer = (builder: ActionReducerMapBuilder<PersonaState>) => {
    builder
        .addCase(updatePersonaThunk.pending, (state: PersonaState) => {
            state.loading = true
        })
        .addCase(updatePersonaThunk.rejected, (state: PersonaState) => {
            state.loading = false
            state.error = "No se pudo actualizar los datos."
        })
        .addCase(updatePersonaThunk.fulfilled, (state: PersonaState, action: PayloadAction<Response>) => {

            if (!action.payload.success)
                return

            const updatePersona = action.payload.data as Persona

            state.loading = false
            state.personas = state.personas.filter(persona =>  persona.id !== updatePersona.id)
            state.personas.push(updatePersona)

        })
}

const getPersonaReducer = (builder: ActionReducerMapBuilder<PersonaState>) => {
    builder
        .addCase(getPersonaThunk.pending, (state: PersonaState) => {
            state.loading = true
        })
        .addCase(getPersonaThunk.rejected, (state: PersonaState) => {
            state.loading = false
            state.error = "No se pudo obtener los datos de la persona."
        })
        .addCase(getPersonaThunk.fulfilled, (state: PersonaState, action: PayloadAction<Response>) => {
            state.loading = false
            state.personas = new Array<Persona>(action.payload.data as Persona)
        })
}

const deletePersonaReducer = (builder: ActionReducerMapBuilder<PersonaState>) => {
    builder
        .addCase(deletePersonaThunk.pending, (state: PersonaState) => {
            state.loading = true
        })
        .addCase(deletePersonaThunk.rejected, (state: PersonaState) => {
            state.loading = false
            state.error = "No se pudo eliminar los datos de la persona."
        })
        .addCase(deletePersonaThunk.fulfilled, (state: PersonaState, action: PayloadAction<Response>) => {
            state.loading = false
            const toDelete = action.payload.data as Persona
            state.personas = state.personas.filter(persona => persona.id !== toDelete.id)
        })
}