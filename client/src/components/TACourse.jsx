import React, { useState, useEffect } from 'react';
import circles from "../assets/circles.png";
import {useNavigate} from 'react-router-dom'
import "./TACourse.css";
// import "./Button.css";
// import "./Logo.css";
import { Select, FormControl, FormLabel, Heading, Button } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react'

export const TACourse = ( { netID, taCourses, setSelectedCourse } ) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [value, setValue] = useState('');
  console.log(value);
  //sumbmission notification
  function handleSubmit(event) {
    // console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
    alert('this is your value: ' + value);
    setValue('');
  }
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
    <div>
      <img className="logo" src={circles} alt="top left circles" />
      <FormControl width='33%'>
        <FormLabel>
          <Heading>Start a Queue</Heading>
        </FormLabel>
        <Select value={selectedValue} placeholder='Choose a course:' onChange={e => setSelectedValue(parseInt(e.target.value))}>
          {options}
        </Select>
      </FormControl>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Activate</Tab>
          <Tab>Notify</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <button className="button" type="submit"
              onClick={startQueue}>
              Start!
            </button>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <Input placeholder='Message' size='md' onChange={(e)=> setValue(e.currentTarget.value)} />
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default TACourse;