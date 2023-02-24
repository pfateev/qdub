import React, { useState } from 'react';
import circles from "../assets/circles.png";
import { useNavigate } from 'react-router-dom'
import "./StudentCourse.css";
import "./Button.css";
import "./Logo.css";
import { Select, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

export const StudentCourse = ({ netID, studentCourses, setSelectedCourse }) => {
  const [question, setQuestion] = useState('');
  const [questionTime, setQuestionTime] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const toast = useToast();
  // TODO input validation:
  // const isError = question === '';

  // navigation route
  let navigate = useNavigate();
  const routeChangeStudent = () => {
    let path = `/student-view`;
    navigate(path);
  }

  // toast for when queue not active
  const Toast = () => {
    toast({
      title: 'Queue not yet active.',
      description: "Please try again.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }

  // Enqueue student
  const enqueue = async () => {
    // console.log({course: selectedValue, question: question});
    const response = await fetch('http://localhost:3001/queue/enqueue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedValue,
        studentID: netID,
        question: question,
        // TODO: this default value needs to turned into a proper variable
        questionTime: 5
      })
    });

    const responseData = await response.json();

    // change this to if (not active)
    // not sure how backend will validate this
    if (selectedValue === 403) {
      Toast();
      return;
    }

    //TODO: waiting on backend route to be finished
    console.log(responseData);

    setSelectedCourse(selectedValue);
    routeChangeStudent();
  };

  // to put the courses in a list format to display in drop down
  const options = studentCourses.map((course) =>
    <option value={course} key={course}>
      {course}
    </option>)

  return (
    <div className="registration">
      <img className="logo" src={circles} alt="top left circles" />
      <FormControl width='33%'>
        <FormLabel>
          <Heading>Enqueue</Heading>
        </FormLabel>
        <Select value={selectedValue} placeholder='Choose a course:' onChange={e => setSelectedValue(parseInt(e.target.value))}>
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