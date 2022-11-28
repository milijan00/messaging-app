import React from "react";
import "./header.css";
import {useDispatch, useSelector} from 'react-redux';
import {fetch} from "./navigationAPI";
import { Link } from "react-router-dom";
import {useEffect} from "react";
export default function Header(props){
    const links = useSelector(state => state.nav.links);    
    const state = useSelector(state => state.nav.state);
    const error  = useSelector(state => state.nav.error);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(state === "idle"){
            dispatch(fetch());
        }
    }, [state, dispatch]); 
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
              </ul>
            </div>
          </div>
       </nav>
    );
};
