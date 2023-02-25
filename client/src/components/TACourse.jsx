import React, { useState } from 'react';
import circles from "../assets/circles.png";
import {useNavigate} from 'react-router-dom'
import "./GeneralStyle.css"
import { Select,
         Tabs,
         TabList,
         TabPanels,
         Tab,
         TabPanel,
          Input } from '@chakra-ui/react'

export const TACourse = ({ netID, taCourses, setSelectedCourse }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [value, setValue] = useState('');
  console.log(value);
  //sumbmission notification
  function handleSubmit(event) {
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
  //Send notification
  const notify = async () => {
    // console.log('A name was submitted: ' + this.state.value);
    console.log('this is your value: ' + value);

    const response = await fetch('http://localhost:3001/student/notify', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedValue,
        message: value,
      })
    });

    const responseData = await response.json();
    if (responseData.status == true) {
      alert("message sent");
    }
    //TODO: waiting on backend route to be finished
    console.log(responseData);

  }
  // Start Queue
  const startQueue = async () => {
    //TODO replace url later
    const response = await fetch('http://localhost:3001/queue/activate', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedValue,
        studentID: netID,
      })
    });
    try {
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSelectedCourse(selectedValue);
        routeChange();
      }

    } catch (error) {
      console.error(error);
    }
  };

  // to put the courses in a list format to display in drop down
  const options = [];
  // const parsedCourses = JSON.parse(taCourses);
  Object.keys(taCourses).forEach(key => {
    // console.log(`${key}: ${obj[key]}`);
    options.push(
      <option value={key} key={key}>
        {"CSE" + key + " – " + taCourses[key]}
      </option>
    );
  });

  return (
    <div>
      <img className="logo" src={circles} alt="top left circles" />
      <div className="webpage">
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1rem'>
            <Tab>Activate</Tab>
            <Tab>Notify</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <h1 className="title">Start a Queue</h1>
              <Select
                background='white'
                value={selectedValue}
                placeholder='Choose a course:'
                onChange={e => setSelectedValue(parseInt(e.target.value))}
              >
                {options}
              </Select>
              <button className="button" type="submit" onClick={startQueue}>
                Start!
              </button>
            </TabPanel>

            <TabPanel>
              <h1 className="title">Make Anouncement</h1>
              <Select
                background='white'
                value={selectedValue}
                placeholder='Choose a course:'
                onChange={e => setSelectedValue(parseInt(e.target.value))}
              >
                {options}
              </Select>
              <Input
                type='text'
                placeholder='Message'
                background='white'
                size='md'
                onChange={(e)=> setValue(e.currentTarget.value)} />
              <button className="button" type="submit"
                onClick={notify}>
                Notify!
              </button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
export default TACourse;