import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getFollowers, getMessages, createMessage} from "./inboxThunk";

const initialState = {
    followers : [],
    messages : [],
    message : "",
    senderId : 0,
    receiverId : 0,
    statusGetFollowers : "idle",
    errorGetFollowers : "",
    statusGetMessages : "idle",
    errorGetMessages : "",
    statusCreateMessage : "idle",
    errorCreateMessage : ""
};

const reducers = {
    onMessageChanged(state, action){
        state.message = action.payload;
    }
};

const extraReducers = (builder)=>{
   builder
    .addCase(getFollowers.pending, (state, action)=>{
        state.statusGetFollowers = "loading";
    })
    .addCase(getFollowers.fulfilled, (state, action)=>{
        state.statusGetFollowers = "succeeded";
        state.followers = action.payload;
    })
    .addCase(getFollowers.rejected, (state, action)=>{
        state.statusGetFollowers = "failed";
        state.errorGetFollowers = action.error.message;
    });

    builder
    .addCase(getMessages.pending, (state, action)=>{
        state.statusGetMessages = "loading";
    })
    .addCase(getMessages.fulfilled, (state, action)=>{
        state.statusGetMessages = "succeeded";
        state.messages = action.payload;
    })
    .addCase(getMessages.rejected, (state, action)=>{
        state.statusGetMessages = "failed";
        state.errorGetMessages = action.error.message;
    });
    
    builder
    .addCase(createMessage.pending, (state, action)=>{
        state.statusCreateMessage = "loading";
    })
    .addCase(createMessage.fulfilled, (state, action)=>{
        state.statusCreateMessage = "succeeded";
    })
    .addCase(createMessage.rejected, (state, action)=>{
        state.statusCreateMessage = "failed";
        state.errorCreateMessage = action.error.message;
    });
};

const slice = createSlice({
    name : "inbox",
    initialState,
    reducers,
    extraReducers
});

export const inboxActions  = slice.actions;
export const inboxReducer = slice.reducer;

//Selectors
export const messagesSelector = state => state.inbox.messages;
export const followersSelector = state => state.inbox.followers;
