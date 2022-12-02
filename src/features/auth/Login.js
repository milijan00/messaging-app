import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { emailSelector, passwordSelector, authActions, authenticate, loginErrorsSelector } from "./authSlice";
import { Link } from "react-router-dom";
import Error from "../../core/Error";
import Validation from "../../core/validation";

export default function Login(props){
	const dispatch = useDispatch();
	const email = useSelector(emailSelector);
	const password = useSelector(passwordSelector);
    const loginErrors = useSelector(loginErrorsSelector);

	const onSubmit = ()  =>{
        try{
            Validation.reset();
            
            if(!Validation.validEmail(email)){
                dispatch(authActions.onAppendLoginError({key: "email", value: Validation.errorMessages.email}));
            }

            if(!Validation.validPassword(password)){
                dispatch(authActions.onAppendLoginError({key: "password", value: Validation.errorMessages.password}));
            }

            if(Validation.result.valid()){
                dispatch(authenticate({email, password})).unwrap();
                dispatch(authActions.onResetLoginErrors());
            }
        }catch(err){
            console.error(err);
        }
	};

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
                            {loginErrors.email &&  <Error message={loginErrors.email}/>}
						</article>
						<article className="col-12 mb-3">
							<input className="form-control" placeholder="Enter password" type="password" value={password} onChange={(e)=> dispatch(authActions.onChangePassword(e.target.value))}/>
                            {loginErrors.password &&  <Error message={loginErrors.password}/>}
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
