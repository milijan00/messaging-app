import React from 'react';
import { Link } from "react-router-dom";
export default function Home() {
  return (
      <section className="">
          <article>
            <h3>We provide secured messaging. It is encrypted end-to-end. </h3>
          </article>
          <article>
            <h3>In order to communicate with others you need to have an account. You can create one very easily <Link to="/registration" className="btn btn-green">here</Link></h3>
          </article>
      </section>
					
  );
}

