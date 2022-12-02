import React from "react";

export default function Error(props){
    return (
        <div className="alert alert-danger">
            <p>{props.message}</p> 
        </div>
    );
}
