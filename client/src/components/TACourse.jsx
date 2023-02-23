import React, { useState, useEffect } from 'react';
import circles from "../assets/circles.png";
import {useNavigate} from 'react-router-dom'
import "./TACourse.css";
import "./Button.css";
import "./Logo.css";
import { Select, FormControl, FormLabel, Heading, Button } from '@chakra-ui/react';

export const TACourse = ( { netID, taCourses, setSelectedCourse } ) => {
  const [selectedValue, setSelectedValue] = useState('');

  // navigation route
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/ta-view`;
    navigate(path);
  }

  // Start Queue
  const startQueue = async () => {
    //TODO replace url later
    const response = await fetch('http://localhost:3001/queue/enqueue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedValue,
        studentID: netID,
      })
    });

      const responseData = await response.json();

      //TODO: waiting on backend route to be finished
      console.log(responseData);

      setSelectedCourse(selectedValue);
      routeChange();

      // console.log(responseData);
  };

  // to put the courses in a list format to display in drop down
  const options = taCourses.map(course =>
    <option value={course}>
      {course}
    </option>)

  return (
    <div className="registration">
      <img className="logo" src={circles} alt="top left circles" />
      <FormControl width='33%'>
        <FormLabel>
          <Heading>Start a Queue</Heading>
        </FormLabel>
        <Select value={selectedValue} placeholder='Choose a course:' onChange={e => setSelectedValue(parseInt(e.target.value))}>
          {options}
        </Select>
      </FormControl>
      <button className="button" type="submit"
        onClick={startQueue}>
        Start!
      </button>
    </div>
  );
}
export default TACourse;