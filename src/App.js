import React from 'react';
import './App.css';
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import Login from './features/auth/Login';
import { Route, Routes } from 'react-router-dom';
import Home from "./features/home/Home";
import Register from "./features/auth/Register";
          
function App() {
  return (
      <>
      <Header/>
      <section className="container mx-auto py-4 vh90">
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/signin" element={<Login/>}/> 
          <Route path="/register" element={<Register/>}/> 
        </Routes> 
      </section>
      <Footer/>
      </>
  );
}

export default App;
