import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8888/";
const config = {
  headers:{
      Authorization: "Bearer " + localStorage.getItem("access")
  }
};

export const fetchUserData = createAsyncThunk("editprofile/fetch", async(id)=>{
	try{
		const result = await axios.get(url + "users/" + id, config);
		return result.data;
	}	catch(err){
		console.error(err);
	}
})

export const updateUser = createAsyncThunk("editprofile/update", async(data)=>{
	try{
		await axios.put(url + "users/" + data.id, data.form, config);
	}	catch(err){
		console.error(err);
	}
})