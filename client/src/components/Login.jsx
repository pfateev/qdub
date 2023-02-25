import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./GeneralStyle.css"
import circles from "../assets/circles.png";
import Modal from './Modal';
import { Input, FormControl, FormErrorMessage } from '@chakra-ui/react';

export const Login = ({ setNetId, setStudentCourses, setTaCourses, setIsTa }) => {
  const [inputID, setInputID] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  // navigation routes
  let navigate = useNavigate();
  const routeChangeTa = () => {
    setIsTa(true)
    let path = `/ta-courses`;
    navigate(path);
  }
  const routeChangeStudent = () => {

    let path = `/student-courses`;
    navigate(path);
  }

  // for checking input
  const handleInputChange = (event) => {
    setInputID(event.target.value);
    // clear the error message when the input changes
    setError('');
  };

  // MAIN onclick event
  const getData = async () => {
    // some validation, checks if the input field is empty
    if (!inputID) {
      setError('Please enter your NetID.');
      return;
    }

    // get back end response
    const response = await fetch('http://localhost:3001/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputID: inputID
      })
    });
    try {
      /* i dont think this try/catch has the intended functionality 
        for some reason response.ok is true even when bad request (invalid netID)
      */
      if(response.ok){
        const responseData = await response.json();
        console.log(responseData);
        const { netID, taCourses, studentCourses } = responseData;
        setStudentCourses(studentCourses);
        setTaCourses(taCourses);
        setNetId(netID);
        if (taCourses.size === 0) {
          routeChangeStudent()
        } else {
          setShow(true);
        }
      }
    } catch (error) {
      // how do we want to handle this for the user?
      // banner that asks them to try again?
      console.log("test");
      console.log(error);
    }

    // if (responseData.message === 'NetID does not exist') {
    //   setError('Invalid netID');
    //   return;
    // }
  };

  return (
    <div>
      <img className="logo" src={circles} alt="top left circles" />
      <div className="webpage">
        <h1 className="title">Login</h1>
        <p className="description">
          Please enter you NetID below to sign up!
        </p>
        <FormControl
          fontFamily='Sans-Serif'
          isInvalid={!!error}
          width='33%'
          marginBottom='10%'
        >
          <Input
            focusBorderColor='#918fe1'
            background='white'
            type='text'
            value={inputID}
            placeholder='Enter your NetID'
            onChange={handleInputChange}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Modal
          title="Hi TA!"
          isQueue={false}
          isLogin={true}
          onClose={() => setShow(false)}
          onConfirmTa={() => routeChangeTa()}
          onConfirmStudent={() => routeChangeStudent()}
          show={show}
        >
          <p>Are you signing in as...?</p>
        </Modal>
        <button className="button" type="submit"
          onClick={getData}>
          Submit!
        </button>
      </div>
    </div>
  );
}
export default Login;