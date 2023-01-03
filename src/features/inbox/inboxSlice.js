import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getFollowers, getMessages, createMessage, fetchFollowers, deleteMessage} from "./inboxThunk";

const initialState = {
    fetchFollowersStatus : "idle",
    fetchFollowersError : "",
    followerFullName : "",
    followers : [
    ],
    messages : [
    ],
    message : "",
    senderId : 0,
    receiverId : 0,
    statusGetFollowers : "idle",
    errorGetFollowers : "",
    statusGetMessages : "idle",
    errorGetMessages : "",
    statusCreateMessage : "idle",
    errorCreateMessage : "",
    statusDeleteMessage : "idle",
    errorDeleteMessage : ""
};

const reducers = {
    onMessageChanged(state, action){
        state.message = action.payload;
    },
    onFollowerClicked(state, action){
        state.followerFullName = action.payload.firstname + " " + action.payload.lastname;
        state.receiverId = action.payload.id;
    },
    onClearForm(state){
        state.message = "";
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

    builder
    .addCase(fetchFollowers.pending, (state)=>{
        state.fetchFollowersStatus = "loading"    ;
    })
    .addCase(fetchFollowers.fulfilled, (state, action)=>{
        state.fetchFollowersStatus = "succeeded";
        state.followers = action.payload;
    })
    .addCase(fetchFollowers.rejected, (state, action)=>{
        state.fetchFollowersStatus = "failed";
        state.fetchFollowersError = action.error.message;
    });

    builder
    .addCase(deleteMessage.pending, (state)=>{
        state.statusDeleteMessage = "loading";
    })
    .addCase(deleteMessage.fulfilled, (state)=>{
        state.statusDeleteMessage = "succeeded";
    })
    .addCase(deleteMessage.rejected, (state, action)=>{
        state.statusDeleteMessage = "failed";
        state.errorDeleteMessage = action.error.message;
    })
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
export const receiverIdSelector = state => state.inbox.receiverId;
export const messagesSelector = state => state.inbox.messages;
export const messageSelector = state => state.inbox.message;
export const followersSelector = state => state.inbox.followers;
export const fetchFollowersStatusSelector = state => state.inbox.fetchFollowersStatus;
export const fetchFollowersErrorSelector = state => state.inbox.fetchFollowersError;
export const followerFullNameSelector = state => state.inbox.followerFullName;