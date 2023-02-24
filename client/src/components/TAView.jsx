import { useState, useEffect } from 'react';
import "./TAView.css";
import "./Button.css";
// import shape from "./assets/shape.svg";

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
  const [queueSize, setQueueSize] = useState();
  const [waitTime, setWaitTime] = useState();

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

  async function finished() {
    const response = await fetch('http://localhost:3001/queue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isTa: true
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.nextStudent == null) {
      setNextStudent("");
    } else {
      setNextStudent(responseData.nextStudent.name);
    }
    setNumberOfPeople(responseData.numberOfPeople);
  };

  return (
    <div className="view">
      <div className="taHeader">
        {numberOfPeople > 0 ?
          <span className="yesPeople">
            Hey TA! You’re doing great! The next person you should help is
            <span className="studentName">
              {nextStudent}
            </span>
            <span className="peopleDesc">
              The number of people in queue are
            </span>
            <span className="peopleNum">
              {numberOfPeople}
            </span>
          </span>
          :
          <span className="noPeople">
            Hey TA, great job! There are no more people in the queue 🥳
          </span>
        }
      </div>

      <div className="center">
        <button className="button" type="finished" onClick={finished}>
          Next Student!
        </button>
      </div>
    </div>
  );
};

export default TAView;