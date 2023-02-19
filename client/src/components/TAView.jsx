import * as React from "react";
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

export const TAView = (props) => {

  async function finished() {
    const response = await fetch('http://localhost:3001/queue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isTA: true
      }),
    });
    
    const responseData = await response.json();
    console.log(responseData);
    if(responseData.nextStudent == null) {
      props.setNextStudent("");
    } else {
      props.setNextStudent(responseData.nextStudent.name);
    }
    props.setNumberOfPeople(responseData.numberOfPeople);
  };

  return (
    <div className="view">
      <div className="TAheader">
        {props.numberOfPeople > 0 ?
          <span className="yesPeople">
            Hey TA! You’re doing great! The next person you should help is 
            <span className="studentName">
              {props.nextStudent}
            </span>
            <span className="peopleDesc">
              The number of people in queue are 
            </span>
            <span className="peopleNum">
              {props.numberOfPeople}
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