import { useState, useEffect } from 'react';
import "./QueueView.css"
import "./GeneralStyle.css"
import dog from "../assets/waitDog.png";
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
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
  Box,
  useToast
} from '@chakra-ui/react'

const StudentView = (
  { netId,
    selectedCourse,
    isTa,
    numberOfPeople,
    estimatedWait,
    setEstimatedWait,
    setNumberOfPeople }) => {

  const [show, setShow] = useState(false);
  const [questionList, setQuestionList] = useState([]);
	const [queueStatus, setQueueStatus] = useState([]);
	const toast = useToast();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/student-help`;
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
      console.log(isTa);
      setNumberOfPeople(responseData.numberOfPeople);
      setEstimatedWait(responseData.estimatedWait);

    };
    // check if head of queue and reroute to student-help
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
      console.log(responseData.questions);
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

  useEffect(() => {
    if (numberOfPeople < 1) {
      routeChange();
    }
  }, [numberOfPeople]);

  // TODO: step out function
  // make API call to /student/stepOut
  // if ok: setShow(true)
  // otherwise
  // Error Toast


	const stepOut = async () => {
		const response = await fetch('http://localhost:3001/student/stepOut', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseID: selectedCourse,
        studentPosition: numberOfPeople,
      })
    });

		try {
      if (response.ok) {
				setShow(true);
			} else {
        const responseData = await response.json();
        console.log(responseData);
				toast({
					title: 'Unable to step out',
          description: responseData.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
				});
      }
    } catch (error) {
      console.error(error);
    }
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
  // console.log(questions)

  return (
    <div className="webpage" id="queueView">
      <div className="header">
        <p className="peopleAheadDesc" style={{ 'marginBottom': '2rem' }}>
          {numberOfPeople} people ahead of you
        </p>
        <p className="estimate">
          We estimate a wait time of {estimatedWait} minutes
        </p>
      </div>

      <div className="imageSet">
        <img className="dog" src={dog} alt="cute dog" />
      </div>

      <Accordion fontFamily='Sans-Serif' allowToggle mt='5%' mb='5%' borderTopWidth='1px' borderBottomWidth='1px' borderColor='RGBA(0, 0, 0, 0.16)'>
        <AccordionItem>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='center' color='rgba(56, 56, 56, 0.8)' fontWeight='bold'>
                View All Questions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          <AccordionPanel pb={4}>
          <TableContainer>
              <Table variant='simple' size='md'>
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

      <button className="button" onClick={stepOut}>Stepping out</button>

      <Modal
        title="You are out of queue!"
        isQueue={true}
        isLogin={false}
        onStepIn={() => setShow(false)}
        show={show}
      >
        <p>Press "Step in" to go back</p>
      </Modal>

    </div>
  );
};
export default StudentView;