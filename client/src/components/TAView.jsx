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

  // const [firstName, setFirstName] = React.useState('');
  // const [numInQueue, setNumInQueue] = React.useState('');
  // console.log(props);

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
    // passing the studentID of the TA
    // console.log(studentID);
    console.log(responseData);
    // setFirstName(responseData.studentName);
    // setNumInQueue(responseData.numberOfPeople);
  };

  return (
    <div className="view">
      <div className="header">
          <span className="heyTA">
            Hey TA! You’re doing great! The next person you should help is
          </span>
          <span className="studentName">
            {props.nextStudent}
          </span>
          <span className="peopleDesc">
            The number of people in queue are
          </span>
          <span className="peopleNum">
            {props.numberOfPeople}
          </span>
      </div>

      <div className="center">
        {/* <img className="shape" src={shape} /> */}
        {/* the question that the current student has  */}
        {/* <Input className="input-instance-1" {...propsData.input} /> */}
        <button className="button" type="finished"
          onClick={finished} >Next Student!</button>
      </div>
    </div>
  );
};

export default TAView;