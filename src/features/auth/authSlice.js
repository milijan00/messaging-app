import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    onCityChange,
    onCountryChange,
    onRegPasswordChange,
    onRegPasswordAgainChange,
    onRegEmailChange,
    onFirstnameChange,
    onLastnameChange
} from "./registrationActions";

const initialState = {
	authenticated: false,
	accessToken : "",
	refreshToken : "",
	email : "",
	password : "",
	status : "idle",
	error :"" ,
    registerStatus : "idle",
    registerError : "",
    registrationData : {
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        passwordAgain : "",
        idCountry : 0,
        idCity : 0
    }
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

export const registerUser = createAsyncThunk("auth/register", async(data)=>{
    try{
        const result =  await axios.post("http://localhost:8888/users/", data);
        return result.status;
    }
    catch(err){
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
		},
        onFirstnameChange,
        onLastnameChange,
        onRegEmailChange,
        onRegPasswordChange,
        onRegPasswordAgainChange,
        onCountryChange,
        onCityChange,
        clearForm(state){
            state.registrationData.firstname = "";
            state.registrationData.lastname = "";
            state.registrationData.email = "";
            state.registrationData.password = "";
            state.registrationData.passwordAgain = "";
            state.registrationData.idCountry = 0;
            state.registrationData.idCity = 0;
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
		});

        builder.addCase(registerUser.pending, (state, action)=>{
            state.registerStatus = "loading";

        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.registerStatus = "succeeded";

        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.registerStatus = "failed";
            state.registerError = action.error.message;
        });
	}

}) ;

export const authReducer = authSlice.reducer;
export const emailSelector = state=> state.auth.email;
export const passwordSelector = state=> state.auth.password;
export const authActions = authSlice.actions;

export const statusSelector = state => state.auth.state;
export const errorSelector =  state=> state.auth.error;
export const regDataSelector = state=> state.auth.registrationData;
