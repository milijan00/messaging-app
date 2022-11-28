import { createSlice } from '@reduxjs/toolkit';
import {fetch} from "./navigationAPI";

const initialState = {
    links : [],
    error : "",
    state :  "idle"
};

const slice = createSlice({
    name : "navigationSlice",
    initialState,
    reducers : {
    },
    extraReducers(builder){
        builder
        .addCase(fetch.pending, (state, action)=>{
            state.state = "loading";
        })
        .addCase(fetch.fulfilled, (state, action)=>{
            state.state="successed";
            state.links = action.payload;
        })
        .addCase(fetch.rejected, (state, action)=>{
            state.state="failed";
            state.error = action.error.message;
        });
    }
});

export const navReducer = slice.reducer;
export const navActions = slice.actions;
