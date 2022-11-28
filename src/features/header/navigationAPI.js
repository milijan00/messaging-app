import axios from "axios";

import {createAsyncThunk} from "@reduxjs/toolkit";

const url = "http://localhost:8888/navlinks";
export  const  fetch = createAsyncThunk("navigationSlice/fetch", async ()=>{
    try{
        const result =  await axios.get(url);
        return result.data;
    }
    catch(err){
    return err.message;
    }
})
