import { createSlice } from '@reduxjs/toolkit';
import {fetch} from "./navigationAPI";

const initialState = {
    links : []
};

const slice = createSlice({
    name : "navigationSlice",
    initialState,
    reducers : {
        fetch        
    }
});

export const navReducer = slice.reducer;
export const navActions = slice.actions;
