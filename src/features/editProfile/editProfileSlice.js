import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, updateUser } from "./editProfileThunk";
const initialState = {
	statusUpdateUser : "idle",
	errorUpdateUser : "",
	statusFetchUserData : "idle",
	errorFetchUserData : "",
	firstname : "",
	lastname : "",
	email : "",
	password : "",
};

const reducers = {
	onFirstnameChange(state, action){
		state.firstname = action.payload;
	},
	onLastnameChange(state, action){
		state.lastname = action.payload;
	},
	onEmailChange(state, action){
		state.email = action.payload;
	},
	onPasswordChange(state, action){
		state.password = action.payload;
	},
};
const slice = createSlice({
	name : "editprofile",
	initialState,
	reducers,
	extraReducers(builder){
		builder
		.addCase(fetchUserData.pending, (state)=>{
			state.statusFetchUserData = "loading";
		})
		.addCase(fetchUserData.fulfilled, (state,action)=>{
			state.statusFetchUserData = "succeeded";
			const user = action.payload[0];
			state.firstname = user.firstname;
			state.lastname = user.lastname;
			state.email = user.email;
			// state.password = user.password;
		})
		.addCase(fetchUserData.rejected, (state, action)=>{
			state.statusFetchUserData = "failed";
			state.errorFetchUserData = action.error.message;
		});

		builder
		.addCase(updateUser.pending, (state)=>{
			state.statusUpdateUser = "loading";
		})
		.addCase(updateUser.fulfilled, (state)=>{
			state.statusUpdateUser = "succeeded";
		})
		.addCase(updateUser.rejected, (state, action)=>{
			state.statusUpdateUser = "failed";
			state.errorUpdateUser = action.error.message;
		});
	}
});

export const  editProfileReducer = slice.reducer;
export const firstnameSelector = state => state.editProfile.firstname;
export const emailSelector = state => state.editProfile.email;
export const lastnameSelector = state => state.editProfile.lastname;
export const passwordSelector = state => state.editProfile.password;
export const statusFetchUserDataSelector = state => state.editProfile.statusFetchUserData;
export const errorFetchUserDataSelector = state => state.editProfile.errorFetchUserData;
export const editProfileActions = slice.actions;