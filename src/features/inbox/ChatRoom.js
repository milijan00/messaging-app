import React from "react";
import "./chatRoom.css";
import { useSelector } from "react-redux";
import { messagesSelector } from "./inboxSlice";
import token from "../../core/token";


export default function ChatRoom(props){
	const messages  = useSelector(messagesSelector);
	return (
            <section className="col-7 px-0" id="messages">
				<article className="green-backcolor text-white p-1">
					<h3>Pera Peric</h3>
				</article>
				<section  className=" p-2" id="messages-collection">
					{messages.map((el, index)=>{
						const justification = token.get().id == el.senderId ? "justify-content-end" : "justify-content-start";
						return (
							<div className={'d-flex mb-2  ' + justification} key={index}>
								<article className="p-2   green-backcolor" >
									<p className="m-0 text-white">{el.content}</p>
								</article>
							</div>
						);
					})}
				</section>
				<section>
					<form method="POST" action="#" name="createMessageForm">
						<section className="row mb-2">
							<article className="col-10">
								<input type="text" className="form-control" placeholder="Type something."/>
							</article>
							<article className="col-2">
								<input type="submit" value="Send" className="btn btn-green"/>
							</article>
						</section>
					</form>
				</section>
            </section>
	);
}