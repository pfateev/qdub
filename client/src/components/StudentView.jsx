import { useState, useEffect } from 'react';
import "./QueueView.css"
import "./GeneralStyle.css"
import dog from "../assets/waitDog.png";
import Modal from './Modal';

const StudentView = ({netId, selectedCourse, isTA}) => {
  const [queueSize, setQueueSize] = useState();
  const [waitTime, setWaitTime] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Define a function that makes the API call and updates the data state
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/queue/${selectedCourse}/${isTA}/${netId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseData = await response.json();
      setQueueSize(responseData.numberOfPeople);
      setWaitTime(responseData.estimatedWait);
    };

    // Call the function immediately and then schedule it to be called every 10 seconds
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 500);

    // Return a cleanup function that clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="webpage" id="queueView">
      <div className="header">
        <span className="peopleAheadDesc">
          {queueSize} people ahead of you
        </span>
        <span className="estimate">
          We estimate a wait time of {waitTime} minutes
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