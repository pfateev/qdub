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

export const TACourse = ( { netID, taCourses, setSelectedCourse } ) => {
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
  };

  // to put the courses in a list format to display in drop down
  const options = taCourses.map(course =>
    <option value={course}>
      {course}
    </option>)

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
              <form onSubmit={handleSubmit}>
                <Input
                  type='text'
                  placeholder='Message'
                  background='white'
                  size='md'
                  onChange={(e)=> setValue(e.currentTarget.value)}
                />
              </form>
              {/* change onclick fucntion to send msg*/}
              <button className="button" type="submit" onClick={(startQueue)}>
                Send!
              </button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
export default TACourse;