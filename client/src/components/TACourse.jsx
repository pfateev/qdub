import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import {useNavigate} from 'react-router-dom'
import "./TACourse.css";
import "./Button.css";
import "./Logo.css";
import * as api from "../api/index.js"

export const TACourse = ( {setStudentID} ) => {
  const [courses, setCourses] = useState({});
  const studentID = useState(0);

  // navigation route
  let navigate = useNavigate();
  const routeChangeStudent = () => {
    let path = `/ta-view`;
    navigate(path);
  }

  // To get course list upon page load
  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch('/formtest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const responseData = await response.json();

      setCourses(responseData.courses);

      // console.log(responseData);
    };
    getCourses();
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);


  // MAIN onclick event
  const getData = async () => {
    const response = await fetch('/enqueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentID: studentID,
        courses: courses
      }),
    });

    routeChangeStudent();

    const responseData = await response.json();
    setStudentID(responseData.studentID);
    // error handling goes here

  };

  // to put the courses in a list format to display in drop down
  const options = Object.keys(courses).map(course =>
    <option value={course}>
      {course + "-" + courses[course]}
    </option>)

  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
      <span className="title">TA Course</span>
      <span className="description">
        Choose a class to start a queue for
      </span>
      <label>
        Choose a Course:
        <select id="course" value={courses} onChange={e => setCourses(e.target.value)}>
          <option value="">Select Course</option>
          {options}
        </select>
      </label>
      <form>
      </form>
      <button className="button" type="submit"
        onClick={() => getData()}>
        Confirm!
      </button>
    </div>
  );
}
export default TACourse;