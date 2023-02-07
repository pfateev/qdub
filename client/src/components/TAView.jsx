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

export const TAView = () => {

  const [studentName, setstudentName] = React.useState('');
  const [studentID, setstudentID] = React.useState('');
  const [queueSize, setqueueSize] = React.useState('');

  const finished = async () => {
    const response = await fetch('/dequeue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentID: studentID,
        studentName: studentName,
        queueSize: queueSize
      }),

    });

    const responseData = await response.json();
    // error handling goes here
    console.log(responseData);

    console.log(studentID);
    console.log(studentName);
    console.log(queueSize);
  };

  return (
    <div className="view">
      <div className="header">
          <span className="heyTA">
            Hey TA! You’re doing great! The next person you should help is
          </span>
          <span className="studentName">
            {studentName}
          </span>
          <span className="peopleDesc">
            The number of people in queue are
          </span>
          <span className="peopleNum">
            {queueSize}
          </span>
      </div>

      <div className="center">
        {/* <img className="shape" src={shape} /> */}
        {/* the question that the current student has  */}
        {/* <Input className="input-instance-1" {...propsData.input} /> */}
        <button className="button" type="finished"
          onClick={() => finished()} >Next Student!</button>
      </div>
    </div>
  );
};

export default TAView;