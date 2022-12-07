import React from "react";
import { useParams, Navigate } from "react-router-dom";

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
        <section className="row">
            <article className="col-5 bg-light py-3" >
            </article>
            <article className="col-7 py-3">
            </article>
        </section>
    );
}
