import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { followersSelector, fetchFollowersErrorSelector, fetchFollowersStatusSelector, inboxActions  } from "./inboxSlice";
import { useEffect } from "react";
import { fetchFollowers, getMessages } from "./inboxThunk";
import token from "../../core/token";

export default function Followers(props){
	const followers = useSelector(followersSelector);
	const status = useSelector(fetchFollowersStatusSelector);
	const error = useSelector(fetchFollowersErrorSelector);
	const dispatch = useDispatch();
	useEffect(() =>{
		if(status == "idle"){
			dispatch(fetchFollowers(token.get().id));
		}
	});
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
				{followers.map((el, index)=>{
					return (
						<article key={index} className="w-100 p-2  green-backcolor text-white contact pointer"  onClick={(e )=> {fetchMessages({sender : token.get().id, receiver : el.id}); dispatch(inboxActions.onFollowerClicked(el));}}>
							<h3 >{el.firstname} {el.lastname}</h3>
						</article>
					);
				})}
            </section>
	);
}