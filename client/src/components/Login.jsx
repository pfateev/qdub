import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom'
import "./Login.css";
import "./Button.css";
import circles from "../assets/circles.png";
import Modal from './Modal';
import { TestModal } from './TestModal';
import { useDisclosure } from '@chakra-ui/react';
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

export const Login = ({ setNetId, setStudentCourses, setTaCourses }) => {
  const [inputID, setInputID] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // navigation routes
  let navigate = useNavigate();
  const routeChangeTa = () => {
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
      if(response.ok){
        const responseData = await response.json();
        const { netID, taCourses, studentCourses } = responseData;
        setStudentCourses(studentCourses);
        setTaCourses(taCourses);
        setNetId(netID);
        if (taCourses.length === 0) {
          routeChangeStudent()
        } else {
          setShow(true);
        }
      }
    } catch (error) {
      // how do we want to handle this for the user?
      // banner that asks them to try again?
      console.error(error);
    }

    // if (responseData.message === 'NetID does not exist') {
    //   setError('Invalid netID');
    //   return;
    // }
  };

  return (
    <div className="registration">
      <img className="logo" src={circles} alt="top left circles" />
      <span className="title">Queue prototype</span>
      <span className="description">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <FormControl isInvalid={!!error} width='33%'>
        <FormLabel>NetID:</FormLabel>
        <Input type="text" value={inputID} placeholder="Enter your NetID" onChange={handleInputChange} />
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
        <p>Are you....?</p>
      </Modal>
      <button className="button" type="submit"
        onClick={getData}>
        Login up!
      </button>
    </div>
  );
}
export default Login;