import { configureStore } from "@reduxjs/toolkit"
import digimonSlice from "./features/slice/digimonSlice"

export const store = configureStore({
    reducer: {
        digimon: digimonSlice,
    },
})
