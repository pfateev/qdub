import { useState, useEffect } from 'react';
import "./GeneralStyle.css"
import "./QueueView.css"
import dog from "../assets/goodDog.png";

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
    setNextStudent, setNumberOfPeople,
  }) => {
  const [currentQuestion, setCurrentQuestion] = useState();
  const [questionList, setQuestionList] = useState([]);

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
      setCurrentQuestion(responseData.question);
      setCurrentQuestion(responseData.question);
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
      setCurrentQuestion(responseData.question);
    }
    setNumberOfPeople(responseData.numberOfPeople);
  };

  async function deactivate() {
    const response = await fetch('http://localhost:3001/queue/activate', {
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
  };

  return (
    <div>
      {numberOfPeople > 0 ?
        <div className="webpage" id="queueView">
          <div className="header">
            <span className="peopleAheadDesc">
              You’re doing great!
              The next person you should help is {nextStudent}
              <span className="peopleAheadDesc">
                {numberOfPeople} people in queue
              </span>
            </span>
          </div>
          <button className="button" type="finished" onClick={finished}>
            Next Student!
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
            {/* reroute/api */}
            <button className="button" type="finished" onClick={deactivate}>
              End Queue!
            </button>
          </div>
        </div>
      }
    </div>
  );
}
export default TAView;