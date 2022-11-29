import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    countries : [],
    state : "idle",
    error : ""
};

const url = "http://localhost:8888/countries";
export const getCountries = createAsyncThunk("country/get", async()=>{
    try{
        var result = await axios.get(url); 
        return result.data;
    }
    catch(err){
        return err.message;
    }
});

const slice = createSlice({
    name : "country",
    initialState,
    extraReducers(builder){
       builder.addCase(getCountries.pending, (state, action)=>{
            state.status = "loading";
       })
        .addCase(getCountries.fulfilled, (state, action) =>{
            state.status = "succeeded";
            state.countries = action.payload;
        })
        .addCase(getCountries.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        }); 
    } 
});

export const countryReducer = slice.reducer;
export const countryStateSelector = state=> state.country.state;
export const countriesSelector = state => state.country.countries;
