import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    digimons: [],
    lastDigimons: [],
    typeSearch: 1,
    levelID: null,
    page: 1,
    isFetching: false,
}

export const digimonSlice = createSlice({
    name: "digimon",
    initialState,
    reducers: {
        setDigimons: (state, { payload }) => {
            state.digimons = payload
        },
        setChangeTypeSearch: (state, { payload }) => {
            state.levelID = payload.levelID
            state.typeSearch = payload.type
            state.digimons = []
            state.isFetching = true
            state.page = 1
        },
        setChangeByChangePage: (state) => {
            state.levelID = null
            state.typeSearch = 1
            state.digimons = []
            state.page = 1
        },
        setPage: (state) => {
            state.page += 1
        },
        setIsFetching: (state, { payload }) => {
            state.isFetching = payload
        },
        setLastDigimons: (state, { payload }) => {
            localStorage.setItem("lastdigimons", JSON.stringify(payload))
            state.lastDigimons = payload
        },
    },
})

export const {
    setDigimons,
    setChangeTypeSearch,
    setChangeByChangePage,
    setPage,
    setIsFetching,
    setLastDigimons,
} = digimonSlice.actions

export default digimonSlice.reducer
