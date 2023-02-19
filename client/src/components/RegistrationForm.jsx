import { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import {useNavigate} from 'react-router-dom'
import "./RegistrationForm.css";
import "./Button.css";
import "./Logo.css";
import * as api from "../api/index.js"

export const RegistrationForm = ( {setStudentID} ) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTA, setIsTA] = useState(false);
  const studentID = useState(0);

  // navigation route
  let navigate = useNavigate(); 
  const routeChangeTA = () => { 
    let path = `/ta-view`; 
    navigate(path);
  }
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
        firstName: firstName,
        lastName: lastName,
        isTA: isTA
      }),
    });

    if (isTA) {
      routeChangeTA();
    } else {
      routeChangeStudent();
    }

    const responseData = await response.json();
    setStudentID(responseData.studentID);
    // error handling goes here

  };

