import { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import {useNavigate} from 'react-router-dom'
import "./RegistrationForm.css";
import "./Button.css";
import "./Logo.css";
import * as api from "../api/index.js"

export const RegistrationForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTA, setIsTA] = useState(false);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/student-view`; 
    navigate(path);
  }

  const getData = async () => {
    const response = await fetch('/formtest', {
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
    routeChange();
    const responseData = await response.json();

    // error handling goes here

    console.log(responseData);
  };

  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
      <span className="title">Queue prototype</span>
      <span className="description">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <label>
        First Name: <input class="input" value={firstName} placeholder="Enter your first name" onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name: <input class="input" value={lastName} placeholder="Enter your last name" onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        <input class="checkBox" type="checkbox" onChange={() => setIsTA(!isTA)} /> Are you a TA?
      </label>
      <button class="button" type="submit"
        onClick={() => getData()}>
        Sign up!
      </button>
    </div>
  );
}