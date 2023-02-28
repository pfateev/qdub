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
  TableCaption,
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
  }, numberOfPeople);

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
  // questionList.forEach(element => {
  //   // console.log(`${key}: ${obj[key]}`);
  //   questions.push(
  //     <Tr>
  //       <Td>placeholder name</Td>
  //       <Td>{element}</Td>
  //     </Tr>
  //   );
  // });
  // console.log(questions)

  return (
    <div className="webpage" id="queueView">
      <div className="header">
        <span className="peopleAheadDesc">
          {numberOfPeople} people ahead of you
        </span>
        <span className="estimate">
          We estimate a wait time of {estimatedWait} minutes
        </span>
      </div>

      <div className="imageSet">
        <img className="dog" src={dog} alt="cute dog" />
      </div>

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='center'>
                View All Questions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          <TableContainer>
              <Table variant='simple'>
                <TableCaption>List of questions from students currently waiting in queue</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Question</Th>
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

      <button className="button" onClick={() => setShow(true)}>Stepping out!</button>

      <Modal
        title="You are out of queue!"
        isQueue={true}
        isLogin={false}
        onStepIn={() => setShow(false)}
        show={show}
      >
        <p>Press "Step in!" to go back</p>
      </Modal>

    </div>
  );
};
export default StudentView;