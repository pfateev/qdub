import { useState, useEffect } from 'react';
import "./QueueView.css"
import "./GeneralStyle.css"
import dog from "../assets/waitDog.png";
import Modal from './Modal';

const StudentView = (
  { netId,
    selectedCourse,
    isTa,
    numberOfPeople,
    estimatedWait,
    setEstimatedWait,
    setNumberOfPeople }) => {

  const [show, setShow] = useState(false);

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
    };
    // Call the function immediately and then schedule it to be called every 10 seconds
    fetchQuestions();
    const intervalId = setInterval(() => {
      fetchQuestions();
    }, 750);

    // Return a cleanup function that clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // TODO: step out function
  // make API call to /student/stepOut
  // if ok: setShow(true)
  // otherwise
  // Error Toast 
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