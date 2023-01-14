import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiverIdSelector } from "./inboxSlice";
import { deleteMessage, getMessages } from "./inboxThunk";
import token from "../../core/token";

export default function Message(props){
	const dispatch = useDispatch();
	const receiver = useSelector(receiverIdSelector);
	const sender = token.get().id;
	// console.log(sender, receiver);
	const deleteMessageHandler = ()=>{
		try{
			dispatch(deleteMessage(props.id)).unwrap();
			dispatch(getMessages({sender, receiver}));
		}
		catch(err){
			console.error(err);
		}
	}
	return (
		<div className={'d-flex mb-2 message ' + props.justification} >
			<article className="p-2   green-backcolor" >
				<p className="m-0 text-white">{props.content}</p>
			</article>
        {props.senderId == token.get().id && <article className="delete-message  " onClick={(e)=>deleteMessageHandler()}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
			</article>	}
		</div>
	);
}
