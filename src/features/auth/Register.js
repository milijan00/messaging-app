import React from "react";
import {Link} from "react-router-dom";
import {authActions, regDataSelector, registerUser} from "./authSlice";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {countryStateSelector, getCountries, countriesSelector} from "../country/countrySlice";
import {cityStateSelector, getCities, citiesSelector} from "../city/citySlice";


export default function Register(props){
    const {firstname, lastname, email, password, passwordAgain, idCity, idCountry} = useSelector(regDataSelector);
    const dispatch = useDispatch();
    const countryState = useSelector(countryStateSelector);
    const countries = useSelector(countriesSelector);
    const cities = useSelector(citiesSelector);

    useEffect(()=>{
        if(countryState === "idle"){
            dispatch(getCountries());
        }
    }, [countryState, dispatch]); 

    const onCountryChange = (id)=>{
			try{
				if(countryState == "idle"){// validation
					dispatch(getCities(id)).unwrap();
				}
			}catch(err){
				console.error(err);
			}
    }
    const onSubmit = ()=>{
        try{
            if(1){// validation
                //dispatch(getCities(id)).unwrap();
                dispatch(registerUser({
                    firstname,
                    lastname,
                    email,
                    password,
                    passwordAgain,
                    idCity
                })).unwrap();
                dispatch(authActions.clearForm());
            }
        }catch(err){
            console.error(err);
        }
    };
    return (
        <section>
            <article>
                <h1>Create a new account</h1>
            </article>
            <article>
                <form method="POST" action="#" name="registerForm" onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
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
                            <select className="form-control" value={idCountry} onChange={(e)=>{dispatch(authActions.onCountryChange(e.target.value));  onCountryChange(e.target.value); }} >
                                <option value="0">Choose a country</option>
                                {countries.map((el, index)=>{
                                    return (
                                        <option value={el.id} key={index}>{el.name}</option>
                                    );
                                })}
                            </select>
                        </article> 
                        <article className="col-12 mb-3">
                            <select className="form-control"  value={idCity} onChange={(e)=> dispatch(authActions.onCityChange(e.target.value))}>
                                <option value="0">Choose a city</option>
                                {cities.map((el, index)=>{
                                    return (
                                        <option value={el.id} key={index}>{el.name}</option>
                                    );
                                })}
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
