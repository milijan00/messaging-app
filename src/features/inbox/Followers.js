import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  inboxActions  } from "./inboxSlice";
import { useEffect } from "react";
import token from "../../core/token";
import {  getMessages } from "./inboxThunk";
export default function Followers(props){
	const dispatch = useDispatch();
    /*
	useEffect(() =>{
		if(status == "idle"){
			dispatch();
		}
	});
    */
	const fetchMessages = (data)=>{
		try{
			dispatch(getMessages(data)).unwrap();
		}catch(err){
			console.log(err);
		}
	};
	return (

            <section className="col-5 bg-light py-3" >
				<article  className="green-backcolor text-white p-2">
					<h3>Contacts</h3>	
				</article>
				{props.followers.map((el, index)=>{
					return (
						<article key={index} className="w-100 p-2  green-backcolor text-white contact pointer"  onClick={(e )=> {fetchMessages({sender : token.get().id, receiver : el.id}); dispatch(inboxActions.onFollowerClicked(el));}}>
							<h3 >{el.firstname} {el.lastname}</h3>
						</article>
					);
				})}
            </section>
	);
}
