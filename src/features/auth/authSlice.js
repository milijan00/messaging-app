import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	authenticated: false,
	accessToken : "",
	refreshToken : "",
	email : "",
	password : "",
	status : "idle",
	error :"" 
};

const url = "http://localhost:8888/auth";
export const authenticate = createAsyncThunk("auth/authenticate", async(data)=>{
	try{
		const result = await axios.post(url, data);
		return result.data;
	}catch(err){
		return err.message;
	}
});

const authSlice = createSlice({
	name : "auth",
	initialState,
	reducers : {
		onChangeEmail(state, action){
			state.email = action.payload;
		},
		onChangePassword(state, action){
			state.password = action.payload;
		}
	},
	extraReducers(builder){
		builder
		.addCase(authenticate.pending, (state, action)=>{
			state.status = "loading";
		})
		.addCase(authenticate.fulfilled, (state, action)=>{
			state.status ="succeeded";
			localStorage.setItem("access", action.payload.accessToken);
		})
		.addCase(authenticate.rejected, (state, action)=>{
			state.status ="failed";
			state.error = action.error.message;
		})
	}

}) ;

export const authReducer = authSlice.reducer;
export const emailSelector = state=> state.auth.email;
export const passwordSelector = state=> state.auth.password;
export const authActions = authSlice.actions;

export const statusSelector = state => state.auth.state;
export const errorSelector =  state=> state.auth.error;
