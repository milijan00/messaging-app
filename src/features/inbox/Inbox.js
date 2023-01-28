import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import Followers from "./Followers";
import token from "../../core/token";
import {inboxActions, previousUserIdSelector, statusStateResetedSelector, followersSelector, fetchFollowersErrorSelector, fetchFollowersStatusSelector} from "./inboxSlice"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFollowers } from "./inboxThunk";


export default function Inbox(){
    const dispatch = useDispatch();
	const status = useSelector(fetchFollowersStatusSelector);
	const error = useSelector(fetchFollowersErrorSelector);
    const followers = useSelector(followersSelector); 

    const {id} = useParams();
    useEffect(()=>{
        if(status == "idle") {
            dispatch(fetchFollowers(token.get().id));
        }
    });
    if(token.get().id != id){
        return (
             <Navigate to="/signin" /> 
        );
    }
    return (
        <section className="row my-2">
        <Followers followers={followers}/> 
        <ChatRoom/>
        </section>
    );
}
