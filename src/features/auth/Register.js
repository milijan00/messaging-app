import React from "react";
import {Link} from "react-router-dom";
import {authActions, regDataSelector, registerUser,registrationErrorsSelector } from "./authSlice";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {countryStateSelector, getCountries, countriesSelector} from "../country/countrySlice";
import {cityStateSelector, getCities, citiesSelector} from "../city/citySlice";
import Error from "../../core/Error";
import Validation from "../../core/validation";


export default function Register(props){
    const {firstname, lastname, email, password, passwordAgain, idCity, idCountry} = useSelector(regDataSelector);
    const dispatch = useDispatch();
    const countryState = useSelector(countryStateSelector);
    const countries = useSelector(countriesSelector);
    const cities = useSelector(citiesSelector);
    const errors = useSelector(registrationErrorsSelector);

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

    const validate = ()=>{
        Validation.reset();
        dispatch(authActions.onResetRegErrors());
        if(!Validation.validFirstname(firstname)){
            dispatch(authActions.onAppendRegError({key: "firstname" , value : Validation.errorMessages.firstname}));
        }
        

        if(!Validation.validLastname(lastname)){
            dispatch(authActions.onAppendRegError({key: "lastname" , value : Validation.errorMessages.lastname}));
        }

        if(!Validation.validEmail(email)){
            dispatch(authActions.onAppendRegError({key: "email" , value : Validation.errorMessages.email}));
        }

        if(!Validation.validPassword(password)){
            dispatch(authActions.onAppendRegError({key: "password" , value : Validation.errorMessages.password}));
        }

        if(!Validation.validPasswordAgain(passwordAgain)){
            dispatch(authActions.onAppendRegError({key: "passwordAgain" , value : Validation.errorMessages.password}));
        }

        if(!Validation.validCountry(idCountry)){
            dispatch(authActions.onAppendRegError({key: "country" , value : Validation.errorMessages.country}));
        }

        if(!Validation.validCity(idCity)){
            dispatch(authActions.onAppendRegError({key: "city" , value : Validation.errorMessages.city}));
        }

        if(!password || !passwordAgain || password != passwordAgain){
            dispatch(authActions.onAppendRegError({key: "passwordAgain" , value : "Both passwords must be equal."}));
        } 

    };

    const onSubmit = ()=>{
        try{
            validate();

            if(Validation.result.valid()){
                dispatch(registerUser({
                    firstname,
                    lastname,
                    email,
                    password,
                    passwordAgain,
                    idCity
                })).unwrap();
                dispatch(authActions.clearForm());
                dispatch(authActions.onResetRegErrors());
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
                            {errors.firstname && <Error message={errors.firstname}/>} 
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="text" className="form-control" placeholder="Lastname name" value={lastname} onChange={(e) => dispatch(authActions.onLastnameChange(e.target.value))}/>
                            {errors.lastname && <Error message={errors.lastname}/>} 
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e)=> dispatch(authActions.onRegEmailChange(e.target.value))}/>
                            {errors.email && <Error message={errors.email}/>} 
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=> dispatch(authActions.onRegPasswordChange(e.target.value))}/>
                            {errors.password && <Error message={errors.password}/>} 
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Password again" value={passwordAgain} onChange={(e)=> dispatch(authActions.onRegPasswordAgainChange(e.target.value))}/>
                            {errors.passwordAgain && <Error message={errors.passwordAgain}/>} 
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
                            {errors.country && <Error message={errors.country}/>} 
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
                            {errors.city && <Error message={errors.city}/>} 
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
