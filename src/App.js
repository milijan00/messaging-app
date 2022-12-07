import React from 'react';
import './App.css';
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import Login from './features/auth/Login';
import { Route, Routes } from 'react-router-dom';
import Home from "./features/home/Home";
import Register from "./features/auth/Register";
import Inbox from "./features/inbox/Inbox";          

function App() {
  return (
      <>
      <Header/>
      <section className="container mx-auto  vh90">
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/signin" element={<Login/>}/> 
          <Route path="/register" element={<Register/>}/> 
          <Route path='/inbox/:id' element={<Inbox/>}/> 
        </Routes> 
      </section>
      <Footer/>
      </>
  );
}

export default App;

/*import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
*/
