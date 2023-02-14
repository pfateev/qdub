import * as React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Requeue.css";
import "./Button.css";
import "./Logo.css";
import dog from "../assets/dog.png";
// import speechBubble from "./assets/speechBubble.svg";
// import logo from "./assets/logo.svg";

const Requeue = () => {
  const [firstName] = useState('');
  const [lastName] = useState('');
  const [isTA] = useState(false);

  const navigate = useNavigate();

  const routeChangeRequeue = async () => {
    const path = '/student-view';
    navigate(path);
  };

  const routeChangeExit = async () => {
    const path = '/';
    navigate(path);
  };

  const getData = async () => {
    const response = await fetch('/enqueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        isTA: isTA
      }),
    });
    const responseData = await response.json();

    // error handling goes here
    console.log(responseData);
  };

  return (
    <div className="view">
      <div className="header">
        {/* <img className="logo" src={logo} /> */}
        <span className="headerMsg">Hopefully you were helped!</span>
      </div>

      <div className="imageSet">
          {/* <span className="speechMsg">Please Wait!</span> */}
          <img className="dog" src={dog} alt="cute dog" />
      </div>

      <div className="buttons" >
        <button className="button" type="submit" onClick={getData}>Requeue</button>
        <button className="button" type="submit" onClick={routeChangeExit}>Exit</button>
      </div>
    </div>
  );
};
export default Requeue;