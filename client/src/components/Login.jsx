import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import { Route, useNavigate } from 'react-router-dom'
import "./Login.css";
import "./Button.css";
import circles from "../assets/circles.png";
import Modal from './Modal';
import { TestModal } from './TestModal';
import { useDisclosure } from '@chakra-ui/react';

export const Login = (props) => {
  const [inputID, setInputID] = useState('');
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // navigation route
  let navigate = useNavigate();
  const routeChangeTa = () => {
    let path = `/ta-courses`;
    navigate(path);
  }
  const routeChangeStudent = () => {
    let path = `/student-courses`;
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
      })
    });
    // const responseData = await submitForm(
    //   JSON.stringify({ inputID: inputID }), "/students", "POST");
    const responseData = await response.json();

    // later this will need to be validated
    console.log(responseData);
    // props.setNetID(inputID);
    // props.setIsTa(responseData.isTa);
    // props.setEstimatedWait(responseData.estimatedWait);
    // props.setNumberOfPeople(responseData.numberOfPeople);
    // error handling goes here
    // if (responseData.isTA) {
    //   if(responseData.nextStudent == null) {
    //     props.setNextStudent("");
    //   } else {
    //     props.setNextStudent(responseData.nextStudent.name);
    //   }
    //   // routeChangeTA();
    //   setShow(true);
    // } else {
    //   routeChangeStudent();
    // }
    const { netID, taCourses, studentCourses } = responseData;
    const { setNetID, setStudentCourses, setTaCourses } = props;
    setStudentCourses(studentCourses);
    setTaCourses(taCourses);
    setNetID(netID);
    if (taCourses.length === 0) {
      routeChangeStudent()
    } else {
      // setShow(true);
      onOpen();
    }
  };

  return (
    <div className="registration">
      <img className="logo" src={circles} alt="top left circles" />
      <span className="title">Queue prototype</span>
      <span className="description">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <label>
        NetID: <input className="input" value={inputID} placeholder="Enter your NetID" onChange={e => setInputID(e.target.value)} />
      </label>

      {/* <button onClick={() => setShow(true)}>Show Modal</button> */}
      {/* <Modal title="Hi TA" onClose={() => setShow(false)} onConfirm={() => routeChangeTa()} show={show}>
        <p>Are you....?</p>
      </Modal> */}
      <button className="button" type="submit"
        onClick={getData}>
        Login up!
      </button>

      <TestModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <p>Are you....?</p>
      </TestModal>
    </div>
  );
}
export default Login;