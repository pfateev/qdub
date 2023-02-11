import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import {useNavigate} from 'react-router-dom'
import "./Login.css";
import "./Button.css";
import "./Logo.css";
import * as api from "../api/index.js"

export const Login = ( {setStudentID} ) => {
  const [NetID, setNetID] = useState('');
  const studentID = useState(0);

  // navigation route
  let navigate = useNavigate();
  const routeChangeStudent = () => {
    let path = `/student-view`;
    navigate(path);
  }

  // MAIN onclick event
  const getData = async () => {
    const response = await fetch('/enqueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentID: studentID,
        NetID: NetID,
      }),
    });

    routeChangeStudent();

    const responseData = await response.json();
    setStudentID(responseData.studentID);
    // error handling goes here

  };

  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
      <span className="title">Queue prototype</span>
      <span className="description">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <label>
        NetID: <input className="input" value={NetID} placeholder="Enter your NetID" onChange={e => setNetID(e.target.value)} />
      </label>
      <button className="button" type="submit"
        onClick={() => getData()}>
        Login up!
      </button>
    </div>
  );
}
export default Login;