import { createSlice } from "@reduxjs/toolkit";
import type { PersonaState } from "../../types";
import { personaReducers } from "./personaReducer"; 

const initialState: PersonaState = {
    personas: new Array(),
    loading: false,
    error: null
}

const personaSlice = createSlice({
    name: 'persona',
    initialState,
    reducers: {
    },
    extraReducers: personaReducers
})

export default personaSlice.reducer