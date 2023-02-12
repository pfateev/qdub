import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import {useNavigate} from 'react-router-dom'
import "./RegistrationForm.css";
import "./Button.css";
import "./Logo.css";
import * as api from "../api/index.js"

export const StudentCourse = ( {setStudentID} ) => {
  const [courseList, setCourseList] = useState([{'code':'', 'name':''}]);
  const [courseInfo, setCourseInfo] = useState('');
  const [question, setQuestion] = useState('');
  const studentID = useState(0);

  // navigation route
  let navigate = useNavigate();
  const routeChangeStudent = () => {
    let path = `/student-view`;
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
      setCourseList(responseData.courses);

      // console.log(responseData);
    };
    getCourses();
  }, []);

  useEffect(() => {
    console.log(courseList);
  }, [courseList]);


  // MAIN onclick event
  const getData = async () => {
    const response = await fetch('/enqueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentID: studentID,
        question: question,
        courseInfo: courseInfo
      }),
    });

    routeChangeStudent();

    const responseData = await response.json();
    setStudentID(responseData.studentID);
  };

  const handleSelect = (e) => {
    setCourseInfo(e.target.value);
  }

  console.log(courseList);
  // to put the courses in a list format to display in drop down
  const options = courseList.map((course) =>
    <option value={course.name}>
      {course.code + " - " + course.name}
    </option>)

  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
      <span className="title">Enqueue</span>
      <span className="description">
        Choose a class and question(s) you have
      </span>
      <label>
        Choose a Course:
        <select id="course" value={courseInfo} onChange={handleSelect}>
          {console.log(options)}
          <option value="Select a Course">Select a Course</option>
          {options}
        </select>
      </label>
      <form>
        <label>
          What do you need help with?
          <input type="text" id="course" value={question} onChange={e => setQuestion(e.target.value)}/>
        </label>
      </form>
      <button className="button" type="submit"
        onClick={() => getData()}>
        Queue up!
      </button>
    </div>
  );
}
export default StudentCourse;