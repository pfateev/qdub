import React, { useState } from 'react';
import circles from "../assets/circles.png";
import { useNavigate } from 'react-router-dom'
import "./GeneralStyle.css"
import {
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Textarea
} from '@chakra-ui/react'

export const TACourse = ({ netId, taCourses, setSelectedCourse }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();
  console.log(message);
  //sumbmission notification
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   alert('this is your value: ' + value);
  //   setValue('');
  // }
  // navigation route
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/ta-view`;
    navigate(path);
  }

  const verificationToast = () => {
    toast({
      title: 'Success',
      description: "Message was sent",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }
  //Send notification
  const notify = async () => {
    // console.log('A name was submitted: ' + this.state.value);
    console.log('this is your value: ' + message);

    const response = await fetch('http://localhost:3001/student/notify', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedValue,
        message: message,
      })
    });

    const responseData = await response.json();
    if (responseData.status === true) {
      verificationToast();
    }

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
        studentID: netId,
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
        <Tabs align='center' variant='enclosed'>
          <TabList border='none' color='RGBA(0, 0, 0, 0.26)'>
            <Tab
              fontFamily='Sans-Serif'
              fontWeight='bold'
              fontSize='1.125rem'
              _selected={{ color: '#918fe1', borderBottom: 'none', borderColor: '#918fe1'}}
              _hover={{ color: '#918fe1', borderBottom: 'none', borderColor: '#716fda' }}
              borderBottom='none'
              borderColor='RGBA(0, 0, 0, 0.16)'
              borderTopRadius='15px'
              borderWidth='2px'
              mr='1px'
            >
              Activate
            </Tab>
            <Tab
              fontFamily='Sans-Serif'
              fontWeight='bold'
              fontSize='1.125rem'
              _selected={{ color: '#918fe1', borderBottom: 'none', borderColor: '#918fe1' }}
              _hover={{ color: '#918fe1', borderBottom: 'none', borderColor: '#716fda' }}
              borderBottom='none' borderColor='RGBA(0, 0, 0, 0.16)'
              borderTopRadius='15px'
              borderWidth='2px'
              ml='1px'
            >
              Notify
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <h1 className="title">Start Queue</h1>
              <div style={{ 'maxWidth': '75%' }}>
                <p className="description" style={{ 'text-align': 'left' }}>
                  Hosting office hour for:
                </p>
                <Select
                  mt = '1rem'
                  marginBottom='20%'
                  focusBorderColor='#918fe1'
                  background='white'
                  value={selectedValue}
                  placeholder='Choose a course:'
                  onChange={e => setSelectedValue(parseInt(e.target.value))}
                >
                  {options}
                </Select>
              </div>
              <button className="button" type="submit" onClick={startQueue}>
                Start
              </button>
            </TabPanel>

            <TabPanel>
              <h1 className="title">Make Notification</h1>
              <div style={{ 'maxWidth': '75%' }}>
                <p className="description" style={{ 'text-align': 'left' }}>
                  Notify:
                </p>
                <Select
                  marginBottom='1rem'
                  focusBorderColor='#918fe1'
                  background='white'
                  value={selectedValue}
                  placeholder='Choose a course:'
                  onChange={e => setSelectedValue(parseInt(e.target.value))}
                >
                  {options}
                </Select>
                <p className="description" style={{ 'text-align': 'left' }}>
                  Write a message:
                </p>
                <Textarea
                  focusBorderColor='#918fe1'
                  marginBottom='8%'
                  minH='7rem'
                  type='text'
                  placeholder='Examples: &#13;&#10; "I&apos;m running 5 min late!" &#13;&#10; "Office hour has been moved to Tuesday."'
                  background='white'
                  onChange={(e) => setMessage(e.currentTarget.value)}
                />
              </div>

              <button className="button" type="submit"
                onClick={notify}>
                Notify
              </button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
export default TACourse;