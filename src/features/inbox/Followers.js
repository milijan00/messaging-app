import React from "react";
import { useSelector } from "react-redux";
import { followersSelector } from "./inboxSlice";
export default function Followers(props){
	const followers = useSelector(followersSelector);

	return (

            <section className="col-5 bg-light py-3" >
				<article  className="green-backcolor text-white p-2">
					<h3>Contacts</h3>	
				</article>
				{followers.map((el, index)=>{
					return (
						<article key={index} className="w-100 p-2  green-backcolor text-white contact pointer">
							<h3 >{el.firstname} {el.lastname}</h3>
						</article>
					);
				})}
            </section>
	);
}