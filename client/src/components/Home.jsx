import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import {Route, useNavigate} from 'react-router-dom'
import "./Login.css";
import "./Button.css";
import circles from "../assets/circles.png";
import dog from "../assets/dog.png";

export const Home = () => {

  // navigation route
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }

  return (
    <div className="registration">
      <img className="logo" src={circles} alt="top left circles" />
      <span className="title">Q'Dub</span>
      <span className="description">
        Welcome!
      </span>

      <img className="dog" src={dog} alt="cute dog" />

      <button className="button" onClick={() => routeChange()}>
        Start!
      </button>
    </div>
  );
}
export default Home;