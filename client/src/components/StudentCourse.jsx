import React, { useState } from 'react';
import circles from "../assets/circles.png";
import { useNavigate } from 'react-router-dom'
import "./StudentCourse.css";
import "./GeneralStyle.css"
import {
  Select,
  Input,
  FormControl,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, } from '@chakra-ui/react';

export const StudentCourse = ({ netID, studentCourses, setSelectedCourse }) => {
  const [question, setQuestion] = useState('');
  const [questionTime, setQuestionTime] = useState('1');
  const [selectedValue, setSelectedValue] = useState('');
  const toast = useToast();
  const format = (val) => val + `min`
  const parse = (val) => val.replace(/min/, '')

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
    <div>
      <img className="logo" src={circles} alt="top left circles" />
      <div className="webpage">
        <h1 className="title">Queue</h1>
        <p className="description">
          Select a course you want to queue up for!
        </p>
        <FormControl
          fontFamily='Sans-Serif'
          width='33%'
          marginBottom='10%'
        >
          <Select
            value={selectedValue}
            placeholder='Choose a course:'
            onChange={e => setSelectedValue(parseInt(e.target.value))}
          >
            {options}
          </Select>
          <Input
            type='text'
            placeholder='What do you need help with?'
            onChange={e => setQuestion(e.target.value)}
          >
          </Input>
          <NumberInput
            min={1}
            max={20}
            onChange={(valueString) => setQuestionTime(parse(valueString))}
            value={format(questionTime)}
            size='md'
            maxW={24}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <button className="button" type="submit"
          onClick={enqueue}>
          Queue up!
        </button>
      </div>
    </div>
  );
}
export default StudentCourse;