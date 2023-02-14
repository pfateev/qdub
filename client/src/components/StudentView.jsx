import { useState } from 'react';
import "./StudentView.css";
import "./Button.css";
import "./Logo.css";
import "./TalkingDog.css";
import dog from "../assets/dog.png";

const StudentView = ({ netID, isTA }) => {
  const [queueSize, setQueueSize] = useState();
  const [waitTime, setWaitTime] = useState();

  async function update() {
    const response = await
      fetch(`http://localhost:3001/queue/403/${isTA}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }

      });

    const responseData = await response.json();
    // passing the studentID of the student
    // console.log(studentID);
    setQueueSize(responseData.numberOfPeople);
    setWaitTime(responseData.estimatedWait);
  };

  // update queue info on timed intervals
  update();
  // setInterval(update, 10000);

  return (
    <div className="view">
      <div className="header">
        {/* <img className="logo" src={logo} alt="top left circles" /> */}
        <span className="peopleAheadDesc">
          The number of people ahead of you
        </span>
        <div>
          <span className="peopleAheadNum">
            {queueSize}
          </span>
        </div>
        <span className="estimate">
          We estimate a wait time of
        </span>
        <span className="waitTime">
          {waitTime} minutes
        </span>
      </div>

      <div className="imageSet">
        <span className="speechMsg">Please Wait!</span>
        <img className="dog" src={dog} alt="cute dog" />
      </div>
      <button className="button" type="submit" >Leave Queue</button>
    </div>
  );
};
export default StudentView;