import React, { useState } from 'react';
import circles from "../assets/circles.png";
import { useNavigate } from 'react-router-dom'
import "./GeneralStyle.css"
import {
  Select,
  Textarea,
  FormControl,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react';

export const StudentCourse = ({ netId, studentCourses, setSelectedCourse, setCurrQuestion, currQuestion }) => {
  const [question, setQuestion] = useState('');
  const [questionTime, setQuestionTime] = useState('5');
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const toast = useToast();
  const format = (val) => val + ` min`
  const parse = (val) => val.replace(/min/, '')

  // for checking input & input validation
  const handleInputChangeC = (event) => {
    setSelectedValue(event.target.value);
    // clear the error message when the input changes
    setError('');
  };
  const handleInputChangeQ = (event) => {
    setQuestion(event.target.value);
    // clear the error message when the input changes
    setError2('');
  };

  // navigation route
  let navigate = useNavigate();
  const routeChangeStudent = () => {
    let path = `/student-view`;
    navigate(path);
  }

  // toast for when queue not active
  const InactiveQueueToast = () => {
    toast({
      title: 'Queue not yet active.',
      description: "Please try again.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }

  // toast for message
  const messageToast = async () => {
    const response = await fetch(`http://localhost:3001/queue/questions/${selectedValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      if (response.ok) {
        const responseData = await response.json();
        toast({
          title: 'Message from TA',
          description: responseData.message,
          status: 'info',
          duration: null,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }


  // Enqueue student
  const enqueue = async () => {
    // validations
    if (selectedValue === '') {
      setError('Please select a class.');
      return;
    }
    if (question === '') {
      setError2('Please describe the problem your having.');
      return;
    }

    // call back end
    const response = await fetch('http://localhost:3001/queue/enqueue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedValue,
        studentID: netId,
        question: question,
        // TODO: this default value needs to turned into a proper variable
        questionTime: questionTime
      })
    });
    try {
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (!responseData.active) {
          InactiveQueueToast();
          console.log(responseData.message);
          if(responseData.message !== null){
            // TODO:
            messageToast();
          }
          return;
        }
        setSelectedCourse(selectedValue);
        currQuestion = question;
        setCurrQuestion(currQuestion);
        routeChangeStudent();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // to put the courses in a list format to display in drop down
  const options = [];
  Object.keys(studentCourses).forEach(key => {
    // console.log(`${key}: ${obj[key]}`);
    options.push(
      <option value={key} key={key}>
        {"CSE" + key + " – " + studentCourses[key]}
      </option>
    );
  });

  return (
    <div>
      <img className="logo" src={circles} alt="top left circles" />
      <div className="webpage">
        <h1 className="title" style={{ marginBottom: '4%' }}>Queue</h1>
        <FormControl
          fontFamily='Sans-Serif'
          width='30%'
          isInvalid={!!error}
        >
          <p className="description" style={{ 'text-align': 'left' }}>
            Queue up for:
          </p>
          <Select
            value={selectedValue}
            marginBottom='1rem'
            placeholder='Choose a course:'
            background='white'
            onChange={handleInputChangeC}
          >
            {options}
          </Select>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <FormControl
          fontFamily='Sans-Serif'
          width='30%'
          isInvalid={!!error2}
        >
          <p className="description" style={{ 'text-align': 'left' }}>
            Questions you have:
          </p>
          <Textarea
            value={question}
            type='text'
            minH='6rem'
            marginBottom='1rem'
            background='white'
            focusBorderColor='#918fe1'
            placeholder='Examples: &#13;&#10; "I&apos;m not sure what question 2 is asking" &#13;&#10; "I have a private question"'
            onChange={handleInputChangeQ}
          />
        <FormErrorMessage>{error2}</FormErrorMessage>
        </FormControl>
          <p className="description" style={{ 'text-align': 'left' }}>
            Estimated time needed:
          </p>
          <NumberInput
            align='left'
            background='white'
            step={5} defaultValue={15} min={5} max={20}
            onChange={(valueString) => setQuestionTime(parse(valueString))}
            value={format(questionTime)}
            size='md'
            maxW={36}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        <button className="button" type="submit"
          onClick={enqueue}>
          Queue up
        </button>
      </div>
    </div>
  );
}
export default StudentCourse;