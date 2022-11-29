import React from "react";

export default function Register(props){
    return (
        <section>
            <article>
                <h3>Create a new account</h3>
            </article>
            <article>
                <form method="POST" action="#" name="registerForm" >
                    <section className="row">
                        <article className="col-12 mb-3">
                            <input type="text" className="form-control" placeholder="First name"/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="text" className="form-control" placeholder="Lastname name"/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="email" className="form-control" placeholder="Email"/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Password"/>
                        </article> 
                        <article className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Password again"/>
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
        </section>
    );
}
