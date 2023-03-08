import { useState, useEffect } from 'react';
import "./GeneralStyle.css"
import "./QueueView.css"
import dog from "../assets/goodDog.png";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

/**
 *  Info need to GET from backend:
 *    - next student name
 *    - update # of people in the queue
 *  Info need to SEND to backend
 *    - Student has been helped, finished()
 */

export const TAView = (
  { netId, isTa, nextStudent,
    numberOfPeople, selectedCourse,
    setNextStudent, setNumberOfPeople
  }) => {
  const [currQuestion, setCurrQuestion] = useState();
  const [questionList, setQuestionList] = useState([]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }
  useEffect(() => {
    // Define a function that makes the API call and updates the data state

    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/queue/${selectedCourse}/${isTa}/${netId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseData = await response.json();
      console.log(responseData);
      setNumberOfPeople(responseData.numberOfPeople);
      setNextStudent(responseData.studentName);
      setCurrQuestion(responseData.question);
    };

    // Call the function immediately and then schedule it to be called every 10 seconds
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 500);

    // Return a cleanup function that clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Define a function that makes the API call and updates the data state
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:3001/queue/questions/${selectedCourse}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseData = await response.json();
      // responseData.questions holds question array
      setQuestionList(responseData.questions);
    };
    // Call the function immediately and then schedule it to be called every 10 seconds
    fetchQuestions();
    const intervalId = setInterval(() => {
      fetchQuestions();
    }, 750);

    // Return a cleanup function that clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);



  async function finished() {
    const response = await fetch('http://localhost:3001/queue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isTa: true,
        courseID: selectedCourse
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    // TODO: need student question from server
    if (responseData.nextStudent == null) {
      setNextStudent("");
    } else {
      setNextStudent(responseData.nextStudent.name);
      setCurrQuestion(responseData.question);
    }
    setNumberOfPeople(responseData.numberOfPeople);
  };

  async function deactivate() {
    const response = await fetch('http://localhost:3001/queue/deactivate', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedCourse
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    routeChange();
  };

  const questions = [];
  questionList.forEach(element => {
    // console.log(`${key}: ${obj[key]}`);
    questions.push(
      <Tr key={element.name}>
        <Td style={{ 'font-weight': '500', 'font-family': 'Sans-Serif', 'color': 'rgba(56, 56, 56, 0.8)', 'font-size' : '1rem' }}>{element.name}</Td>
        <Td style={{ 'font-weight': '500', 'font-family': 'Sans-Serif', 'color': 'rgba(56, 56, 56, 0.8)', 'font-size' : '1rem' }}>{element.question}</Td>
      </Tr>
    );
  });

  return (
    <div>
      {numberOfPeople > 0 ?
        <div className="webpage" id="queueView" >
          <div className="header">
            <p className="peopleAheadDesc" style={{ 'marginBottom': '2rem' }}>
              {numberOfPeople} people in queue
            </p>
            <p className="peopleAheadDesc">
              The next person you should help:
            </p>
            <p className="peopleAheadDesc" style={{ 'marginTop': '1rem', 'font-weight' : '900', 'font-size' : '3rem'}}>
              {nextStudent}
            </p>

          </div>

          <Box mt='5%' borderColor='RGBA(0, 0, 0, 0.16)'
              borderRadius='15px'
              borderWidth='2px'
              w='40%' minH='8rem'
              p='3rem'
              textAlign="center"
          >
            <p className="description">
              {currQuestion}
            </p>
          </Box>


          <Accordion fontFamily='Sans-Serif' allowToggle mt='5%' mb='5%' borderTopWidth='1px' borderBottomWidth='1px' borderColor='RGBA(0, 0, 0, 0.16)'>
            <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='center' color='rgba(56, 56, 56, 0.8)' fontWeight='bold'>
                    View All Questions
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              <AccordionPanel>
              <TableContainer>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th style={{ 'font-weight': 'bold', 'font-family': 'Sans-Serif', 'font-size': '1rem', 'color': 'rgba(56, 56, 56, 0.8)' }}>Name</Th>
                        <Th style={{ 'font-weight': 'bold', 'font-family': 'Sans-Serif', 'font-size': '1rem', 'color': 'rgba(56, 56, 56, 0.8)' }}>Question</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {questions}
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <button className="button" type="finished" onClick={finished}>
            Next Student
          </button>
        </div>
        :
        <div>
          <div className="webpage" id="queueView">
            <div className="header">
              <span className="noPeople">
                There are no more people in the queue 🥳
              </span>
            </div>
            <img className="dog" src={dog} alt="cute dog" />
            {/* //TODO: reroute view to login? when button clicked */}
            <button className="button" type="finished" onClick={deactivate}>
              End Queue
            </button>
          </div>
        </div>
      }
    </div>
  );
}
export default TAView;