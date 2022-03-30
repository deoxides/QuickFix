import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    account:null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(initialState, action){
            initialState.account = action.payload;
        },
        logout(initialState){
            initialState.account = null;
        }
    },
  });
  export default authSlice.reducer



