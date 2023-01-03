import React from "react";
import "./chatRoom.css";
import { useSelector, useDispatch } from "react-redux";
import { messagesSelector, followerFullNameSelector, inboxActions, messageSelector, receiverIdSelector } from "./inboxSlice";
import token from "../../core/token";
import { createMessage, getMessages } from "./inboxThunk";
import Message from "./Message";
// import { useParams } from "react-router-dom";


export default function ChatRoom(props){
	const dispatch = useDispatch();
	const messages  = useSelector(messagesSelector);
	const receiverId = useSelector(receiverIdSelector);
	const message = useSelector(messageSelector);
	const followerFullName  = useSelector(followerFullNameSelector);

	const submit = ()=>{
		if(message){
			// idSender idReceiver content
			const data = {
				idSender : token.get().id,
				idReceiver : receiverId ,
				content : message
			};
			dispatch(createMessage(data)).unwrap();
			dispatch(inboxActions.onClearForm());

			dispatch(getMessages({sender : data.idSender, receiver : data.idReceiver}));
		}
	};
	return (
            <section className="col-7 px-0" id="messages">
				{followerFullName && 
				<article className="green-backcolor text-white p-1">
					<h3>{followerFullName}</h3>
				</article>
				}
				<section  className=" p-2" id="messages-collection">
					{messages.map((el, index)=>{
						const justification = token.get().id == el.senderId ? "justify-content-end" : "justify-content-start";
						return (
							<Message justification={justification} content={el.content} id={el.id}  key={index}/>
						);
					})}
				</section>
				{
					followerFullName &&

				
				<section>
					<form method="POST" action="#" name="createMessageForm" onSubmit={(e)=> {e.preventDefault(); submit();}}>
						<section className="row mb-2">
							<article className="col-10">
								<input type="text" className="form-control" placeholder="Type something." value={message}  onChange={(e)=> dispatch(inboxActions.onMessageChanged(e.target.value))} />
							</article>
							<article className="col-2">
								<input type="submit" value="Send" className="btn btn-green"/>
							</article>
						</section>
					</form>
				</section>
				}

            </section>
	);
}