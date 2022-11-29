import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { emailSelector, passwordSelector, authActions, authenticate } from "./authSlice";
import { Link } from "react-router-dom";
// import { statusSelector, errorSelector } from "./authSlice";

export default function Login(props){
	const dispatch = useDispatch();
	const email = useSelector(emailSelector);
	const password = useSelector(passwordSelector);
	// const status = useSelector(statusSelector);
	// const error  =useSelector(errorSelector);

	const onSubmit = ()  =>{
			// validation
			try{
				if(email && password){
					dispatch(authenticate({email, password})).unwrap();
				}
			}catch(err){
				console.error(err);
			}

		}

	


	return (
		<section className="row">
			<article className="col-12">
				<h1>Sign in</h1>
			</article>
			<article>
				<form method="POST" action="#" name="loginForm" onSubmit={(e)=>{ e.preventDefault(); onSubmit();}}>
					<section className="row">
						<article className="col-12 mb-3">
							<input className="form-control" placeholder="Enter email" type="email" value={email} onChange={(e)=> dispatch(authActions.onChangeEmail(e.target.value))} />
						</article>
						<article className="col-12 mb-3">
							<input className="form-control" placeholder="Enter password" type="password" value={password} onChange={(e)=> dispatch(authActions.onChangePassword(e.target.value))}/>
						</article>
						<article className="col-12 mb-3">
							<input className="btn btn-green" value="Submit"  type="submit" />
						</article>
					</section>
					<article>
						<p>If you don't  have an account you can make one here <Link to="/register" className="btn btn-link">here</Link></p>
					</article>
				</form>
			</article>
		</section>
	);
};