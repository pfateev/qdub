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
  Textarea,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react'

export const TACourse = ({ netId, taCourses, setSelectedCourse }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const toast = useToast();

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

  const handleInputChange = (event) => {
    setSelectedValue(event.target.value);
    setError('');
    setError2('');
  }

  const handleInputChange2 = (event) => {
    setMessage(event.target.value);
    setError3('');
  }

  // Send notification
  const notify = async () => {
    if (selectedValue === '') {
      setError2('Please select a class.');
      return;
    }
    if (message === '') {
      setError3('Please enter a message.');
      return;
    }
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
    if (selectedValue === '') {
      setError('Please select a class.');
      return;
    }

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
              <FormControl
                isInvalid={!!error}
                marginBottom='10%'
              >
                  <h1 className="title">Start Queue</h1>
                  <div style={{ 'maxWidth': '75%' }}>
                    <p className="description" style={{ 'text-align': 'left' }}>
                      Hosting office hour for:
                    </p>
                    <Select
                      mt = '1rem'
                      focusBorderColor='#918fe1'
                      background='white'
                      value={selectedValue}
                      placeholder='Choose a course:'
                      onChange={handleInputChange}
                    >
                      {options}
                    </Select>
                    <FormErrorMessage>{error}</FormErrorMessage>
                  </div>
                </FormControl>
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
                <FormControl
                  isInvalid={!!error2}
                  marginBottom='1rem'
                >
                  <Select
                    focusBorderColor='#918fe1'
                    background='white'
                    value={selectedValue}
                    placeholder='Choose a course:'
                    onChange={handleInputChange}
                  >
                    {options}
                  </Select>
                  <FormErrorMessage>{error2}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!error3}
                  marginBottom='10%'
                >
                  <p className="description" style={{ 'text-align': 'left' }}>
                    Write a message:
                  </p>
                  <Textarea
                    focusBorderColor='#918fe1'
                    minH='7rem'
                    type='text'
                    placeholder='Examples: &#13;&#10; "I&apos;m running 5 min late!" &#13;&#10; "Office hour has been moved to Tuesday."'
                    background='white'
                    onChange={handleInputChange2}
                  />
                  <FormErrorMessage>{error3}</FormErrorMessage>
                </FormControl>
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