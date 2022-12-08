import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";

import token from "../../core/token";

export default function Inbox(){
    const {id} = useParams();
    console.log(token.get().id == id);
    if(token.get().id != id){
        return (
             <Navigate to="/signin" /> 
        );
    }
    return (
        <section className="row my-2">
            <article className="col-5 bg-light py-3" >
            </article>
            <ChatRoom/>
        </section>
    );
}
