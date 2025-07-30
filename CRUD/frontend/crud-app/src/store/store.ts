import { configureStore } from "@reduxjs/toolkit";
import reducer from "./persona/personaSlice";

const store = configureStore({
    reducer: {
        persona: reducer
    },
})

export type rootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store