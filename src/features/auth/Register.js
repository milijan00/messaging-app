import React from "react";
import {Link} from "react-router-dom";
import {authActions, regDataSelector} from "./authSlice";
import {useSelector, useDispatch} from "react-redux";
export default function Register(props){
    const {firstname, lastname, email, password, passwordAgain, idCity, idCountry} = useSelector(regDataSelector);
    const dispatch = useDispatch();
    return (
        <section>
            <article>
                <h1>Create a new account</h1>
            </article>
            <article>
                <form method="POST" action="#" name="registerForm" >
                    <section className="row">
                        <article className="col-12 mb-3">
                            <input type="text" className="form-control" placeholder="First name" value={firstname} onChange={(e)=> dispatch(authActions.onFirstnameChange(e.target.value))}/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="text" className="form-control" placeholder="Lastname name" value={lastname} onChange={(e) => dispatch(authActions.onLastnameChange(e.target.value))}/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e)=> dispatch(authActions.onRegEmailChange(e.target.value))}/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=> dispatch(authActions.onRegPasswordChange(e.target.value))}/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Password again" value={passwordAgain} onChange={(e)=> dispatch(authActions.onRegPasswordAgainChange(e.target.value))}/>
                        </article> 
                        <article className="col-12 mb-3">
                            <select className="form-control" >
                                <option >Choose a country</option>
                            </select>
                        </article> 
                        <article className="col-12 mb-3">
                            <select className="form-control" >
                                <option >Choose a city</option>
                            </select>
                        </article> 
                        <article className="col-12 mb-3 text-end">
                            <input type="submit" className="btn btn-green" value="Done"/>
                        </article> 
                    </section>
                </form>
            </article>
            <article>
                <p>If You already have an account, sign in <Link to="/signin" className="btn btn-link">here</Link></p>
            </article>
        </section>
    );
}
