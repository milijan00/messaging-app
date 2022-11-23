import React from 'react';
import './App.css';
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import { Route, Routes } from 'react-router-dom';

        /*<Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/registration" element={<Palettes />}/> 
          </Routes> 
          */
function App() {
  return (
      <>
      <Header/>
      { /*include Routing code once  Home component is written.*/}
      <Footer/>
      </>
  );
}

export default App;
