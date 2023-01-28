import React from "react";
import "./header.css";
import {useDispatch, useSelector} from 'react-redux';
import {fetch} from "./navigationAPI";
import { Link } from "react-router-dom";
import {useEffect} from "react";
import token from "../../core/token";
import { authActions, tokenSelector } from "../auth/authSlice";
import {redirect, Navigate} from "react-router-dom";

export default function Header(props){
    
    const authorized = useSelector(tokenSelector);
    const links = useSelector(state => state.nav.links);    
    const state = useSelector(state => state.nav.state);
    const error  = useSelector(state => state.nav.error);
    const statusUserLoggedOut = useSelector(state => state.nav.statusUserLoggedOut);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(state === "idle"){
            dispatch(fetch());
        }
    }, [state, dispatch]); 

    if(statusUserLoggedOut == "idle"){
        dispatch(authActions.onChangeUserLoggedOutStatus());
        return <Navigate to="/signin"/>;
    }
    return (
        <nav className="navbar navbar-expand-lg green-backcolor white-forecolor">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Messaging app</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                   {links.map((el, index)=>{
                        return (
                        <li className="nav-item" key={index}>
                          <Link className="nav-link" to={el.route}>{el.name}</Link>
                        </li>
                        );
                   })}
                   {authorized && 
  <li>
  <div className="dropdown">
  <button className="btn btn-green dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Profile 
  </button>
    <ul className="dropdown-menu">
    <li><Link className="dropdown-item text-secondary" to={'/inbox/' + token.get().id}>Inbox</Link></li>
    <li><Link className="dropdown-item text-secondary" to="/editprofile">Change profile</Link></li>
    <li><a className="dropdown-item text-secondary" href="#" onClick={(e)=>{e.preventDefault(); dispatch(authActions.logout())}}>Logout</a></li>
  </ul></div></li>}
              </ul>
            </div>
          </div>
       </nav>
    );
};
