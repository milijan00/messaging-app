import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
    cities : [],
    state : "idle",
    error : ""
};

const url = "http://localhost:8888/cities";
export const getCities = createAsyncThunk("city/get", async(id)=>{
    try{
        var result = await axios.get(url + "/" + id); 
        return result.data;
    }
    catch(err){
        return err.message;
    }
});

const slice = createSlice({
    name : "city",
    initialState,
    extraReducers(builder){
       builder.addCase(getCities.pending, (state, action)=>{
            state.status = "loading";
       })
        .addCase(getCities.fulfilled, (state, action) =>{
            state.status = "succeeded";
            state.cities = action.payload;
        })
        .addCase(getCities.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        }); 
    } 
});

export const cityReducer = slice.reducer;
export const cityStateSelector = state=> state.city.state;
export const citiesSelector = state => state.city.cities;

