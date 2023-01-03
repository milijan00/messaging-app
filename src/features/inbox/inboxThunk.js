import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import token from "../../core/token";

const url = "http://localhost:8888/";
const config = {
  headers:{
      Authorization: "Bearer " + localStorage.getItem("access")
  }
};

export const getFollowers = createAsyncThunk("inbox/getfollowers", async()=>{
    try{

        let result = await axios.get(url + "followers/" + token.get().id, config);
        return result.data;
    }
    catch(err){
       console.log(err);
    }
});

export const getMessages = createAsyncThunk("inbox/getmessages", async(data)=>{
    try{
        let result = await axios.get(url + "messages/"+ data.sender + "/" + data.receiver, config);
        return result.data;
    }
    catch(err){
       console.log(err);
    }
});

export const createMessage = createAsyncThunk("inbox/createmessage", async(data)=>{
    try{
        let result = await axios.post(url + "messages/", data, config);
        return result.data;
    }
    catch(err){
       console.log(err);
    }
})

export const fetchFollowers = createAsyncThunk("inbox/fetchFollowers", async (id)=>{
    try{
        let result = await axios.get(url + "followers/" +  id, config);
        return result.data;
    }
    catch(err){
       console.log(err);
    }
});

export const deleteMessage = createAsyncThunk("inbox/deletemessage", async (id)=>{
    try{
        let result = await axios.delete(url + "messages/" +  id, config);
        return result.data;
    }
    catch(err){
       console.log(err);
    }
})

