import React from 'react';
import './App.css';
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import { Route, Routes } from 'react-router-dom';
import Home from "./features/home/Home";
          
function App() {
  return (
      <>
      <Header/>
      <section className="container mx-auto py-4 vh90">
        <Routes>
          <Route path="/" element={<Home/>}/> 
        </Routes> 
      </section>
      <Footer/>
      </>
  );
}

export default App;
