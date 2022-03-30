import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    solicitudes:undefined,
    actividades:undefined,
    cobros:undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSolicitudes(initialState,action) {
            initialState.solicitudes = action.payload;
        },
        setActividades(initialState,action) {
            initialState.actividades = action.payload;
        },
        setCobros(initialState,action) {
            initialState.cobros = action.payload;
        }
  }})

export default userSlice.reducer