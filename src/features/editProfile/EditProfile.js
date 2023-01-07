import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { firstnameSelector, lastnameSelector, emailSelector, passwordSelector, editProfileActions, statusFetchUserDataSelector, errorFetchUserDataSelector} from "./editProfileSlice";
import { useEffect } from "react";
import { fetchUserData, updateUser } from "./editProfileThunk";
import token from "../../core/token";
import Validation from "../../core/validation";
export default function  EditProfile(props){
	const form = {
		firstname : useSelector(firstnameSelector),
		lastname : useSelector(lastnameSelector),
		email : useSelector(emailSelector),
		password : useSelector(passwordSelector)
	};
	const statusFetchUserData = useSelector(statusFetchUserDataSelector);
	const errorFetchUserData = useSelector(errorFetchUserDataSelector);
	const dispatch = useDispatch();
    useEffect(()=>{
        if(statusFetchUserData === "idle"){
            dispatch(fetchUserData(token.get().id));
        }
    }, [statusFetchUserData, dispatch]); 


	const onSubmit = function (e){
		try{
			e.preventDefault();
			Validation.reset();

			Validation.validFirstname(form.firstname);

            Validation.validEmail(form.email);

            if(form.password){
				Validation.validPassword(form.password)
            }
			
            if(!Validation.result.valid()){
				alert("Validation failed");
				return;
            }

			const data = {
				firstname : form.firstname,
				lastname : form.lastname,
				email : form.email
			};
			dispatch(updateUser({id : token.get().id, form : data})).unwrap();
			alert("UserUpdated!");
		}catch(error){
			console.error(error);
		}
	};
	return (
		<>
		<article>
			<h3>Edit profile</h3>
		</article>
		<article>
			<form method="POST" action="#" name="editProfileForm" onSubmit={(e)=>onSubmit(e)}>
				<section className="row">
					<article className="col-12 mb-3">
						<input 
						type="text"
						className="form-control"
						placeholder="firstname"
						onChange={(e)=>dispatch(editProfileActions.onFirstnameChange(e.target.value))} value={form.firstname}
						/>
					</article>
					<article className="col-12 mb-3">
						<input 
						type="text"
						className="form-control"
						placeholder="lastname"
						onChange={(e)=>dispatch(editProfileActions.onLastnameChange(e.target.value))}
						value={form.lastname}
						 />
					</article>
					<article className="col-12 mb-3">
						<input 
						type="text"
						className="form-control"
						placeholder="email"
						onChange={(e)=>dispatch(editProfileActions.onEmailChange(e.target.value))}
						value={form.email}
						/>
					</article>
					<article className="col-12 mb-3">
						<input 
						type="text"
						className="form-control"
						placeholder="password"
						onChange={(e)=>dispatch(editProfileActions.onPasswordChange(e.target.value))}
						value={form.password}
						/>
					</article>
					<article className="col-12 mb-3 text-end">
						<input type="submit" className="btn btn-green" value="Edit"/>
					</article>
				</section>
			</form>
		</article>
		</>
	);
}