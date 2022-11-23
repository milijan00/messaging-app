import React from "react";
import "./header.css";
import {useDispatch, useSelector} from '@reduxjs/toolkit';
import {navActions} from "./headerSlice";

export default function Header(props){
    return (
        <nav class="navbar navbar-expand-lg green-backcolor white-forecolor">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Messaging app</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Registration</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Help</a>
                </li>
              </ul>
            </div>
          </div>
       </nav>
    );
};
