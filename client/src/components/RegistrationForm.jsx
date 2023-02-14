import { useState } from 'react';
import logo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom'
import "./RegistrationForm.css";
import "./Button.css";
import "./Logo.css";

export const RegistrationForm = (props) => {
  const [inputID, setInputID] = useState('');
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
    const response = await fetch('http://localhost:3001/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputID: inputID
      }),
    });
    // const responseData = await submitForm(
    //   JSON.stringify({ inputID: inputID }), "/students", "POST");
    const responseData = await response.json();

    // later this will need to be validated
    console.log(responseData);
    props.setNetID(inputID);
    props.setIsTa(responseData.isTA);
    props.setEstimatedWait(responseData.estimatedWait);
    props.setNumberOfPeople(responseData.numberOfPeople);
    // error handling goes here
    if (responseData.isTA) {
      props.setNextStudent(responseData.nextStudent.name);
      routeChangeTA();
    } else {
      routeChangeStudent();
    }
  };


  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
      <span className="title">Queue prototype</span>
      <span className="description">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <label>
        netID: <input className="input" value={inputID} placeholder="Enter your netID" onChange={e => setInputID(e.target.value)} />
      </label>
      <button className="button" type="submit"
        onClick={getData}>
        Sign up!
      </button>
    </div>
  );
}