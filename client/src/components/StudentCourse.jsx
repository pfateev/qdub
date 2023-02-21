import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom'
import "./StudentCourse.css";
import "./Button.css";
import "./Logo.css";
import { Select, Input, FormControl, FormLabel, Heading, Button } from '@chakra-ui/react';

export const StudentCourse = (props) => {
  // const [courseList, setCourseList] = useState([{ 'code': '', 'name': '' }]);
  // const [courseInfo, setCourseInfo] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const isError = question === '';

  const { netID, studentCourses, setSelectedCourse } = props;

  // navigation route
  let navigate = useNavigate();
  const routeChangeStudent = () => {
    let path = `/student-view`;
    navigate(path);
  }

  // To get course list upon page load

  const enqueue = async () => {
    console.log({course: selectedValue, question: question});
    // const response = await fetch('/queue/enqueue', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     netID: netID
    //   })
    // });

    // const responseData = await response.json();
    
    // setCourseList(responseData.courses);

    // console.log(responseData);
  };

  // useEffect(() => {
  //   console.log(studentCourses);
  // }, [studentCourses]);


  // MAIN onclick event
  // const getData = async () => {
  //   const response = await fetch('/enqueue', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       studentID: studentID,
  //       question: question,
  //       courseInfo: courseInfo
  //     }),
  //   });

  //   routeChangeStudent();

  //   const responseData = await response.json();
  //   setStudentID(responseData.studentID);
  // };

  // const handleSelect = (e) => {
  //   setSelectedCourse(e.target.value);
  // }

  // to put the courses in a list format to display in drop down
  const options = studentCourses.map((course) =>
    <option value={course} key={course}>
      {course}
    </option>)

  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
      <label>
      </label>
      <FormControl width='33%'>
        <FormLabel>
          <Heading>Enqueue</Heading>
        </FormLabel>
        <Select value={selectedValue} placeholder='Choose a course:' onChange={e => setSelectedValue(e.target.value)}>
          {options}
        </Select>
        <Input
          type='text'
          placeholder='What do you need help with?'
          onChange={e => setQuestion(e.target.value)}
        >
        </Input>
      </FormControl>
      <button className="button" type="submit"
        onClick={enqueue}>
        Queue up!
      </button>
    </div>
  );
}
export default StudentCourse;